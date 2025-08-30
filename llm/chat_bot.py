import requests, yaml, asyncio, os
from typing import Annotated, Any, Dict
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langchain_ollama.chat_models import ChatOllama
from langchain_community.agent_toolkits.openapi.toolkit import RequestsToolkit
from langchain_community.utilities.requests import TextRequestsWrapper
from langgraph.prebuilt import create_react_agent
from langchain_mcp_adapters.client import MultiServerMCPClient

# https://python.langchain.com/docs/integrations/tools/requests/#instantiation
# https://python.langchain.com/api_reference/langchain/chains/langchain.chains.api.base.APIChain.html#langchain.chains.api.base.APIChain
ALLOW_DANGEROUS_REQUEST = True

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm = ChatOllama(model='llama3.1', temperature=0)

toolkit = RequestsToolkit(
    requests_wrapper=TextRequestsWrapper(headers={}),
    allow_dangerous_requests=ALLOW_DANGEROUS_REQUEST,
)

client = MultiServerMCPClient(
    {
        'math': {
            'command': 'python',
            'args': [os.path.join(os.getcwd(), 'mcp_stdio.py')],
            'transport': 'stdio',
        },
        'weather': {
            'url': 'http://localhost:8000/mcp',
            'transport': 'streamable_http',
        }
    }
)

def _get_api_spec() -> str:
    '''
    Pull the api-docs from Swagger and add the endpoints the LLM will have access to
    '''
    endpoints = [
        '/api/category/products',
        '/api/products/bestSeller',
        f'/api/products/similar/{{name}}'
    ]
   
    try:
        response = requests.get('http://localhost:8080/v3/api-docs')
        if response.status_code == 200:
            api_docs = response.json()
            openapi_spec: Dict[str, Any] = {
                'openapi': api_docs['openapi'],
                'info': api_docs['info'],
                'servers': api_docs['servers'],
                'paths': {},
            }

            for endpoint in endpoints:
                openapi_spec['paths'][endpoint] = api_docs['paths'][endpoint]

            return yaml.dump(openapi_spec, sort_keys=False)
    except:
        return 'Server Error'

async def get_client_tools(): 
    try:
        return await client.get_tools()
    except:
        return []

api_spec = _get_api_spec()
tools = toolkit.get_tools()
client_tools = asyncio.run(get_client_tools())
system_message = f'''
You are a precise and helpful customer service assistant for an online shopping platform.
You have access **only** to the API documentation: {api_spec}.

### Your role:
- Determine which API function(s) should be called based on the user’s request.
- When an API call is needed, output ONLY the properly formatted JSON for the function call with arguments, following the OpenAPI specification. Do not describe the call in natural language.
- If the API response is available, translate it into clear, human-readable text for the customer.
- If no API endpoint can answer the request, politely state, 'I cannot help with this request. Is there something else I can help with?'.

### Tool Access:
- You have access to the math and weather tool
- For math tool, you can add or multiply two integer numbers
    - Example:
        - Add: 1 + 1, Answer: 2
        - Multiply: 2 x 3, Answer: 6
- For weather tool, the user asks about the location's 'weather', 'temperature':
    - Example:
        - User: What is the weather in Atlanta, Georgia?
        - Assistant: The weather is <use the weather tool to get the answer>
- If do not know answer, politely decline.

### Rules:
1. When the user asks a question always check if {api_spec} contains, "Server Error".
2. If {api_spec} contains "Server Error" or if the tool message contains "Error:", politely respond: 
    - 'There's technically difficultes retrieving the information. Sorry for the inconvenience.'
3. Always include the server URL prefix when constructing API calls.
4. Never invent or assume parameters beyond what is in the API spec.
5. Do not provide “pseudo” calls — only real, valid API requests.
6. For structured API results, summarize them simply for the user.
7. Be concise, friendly, and professional.

### Special case:  
- If the user asks for 'help', 'API details', or 'what can you do', give a friendly, concise summary of each available API endpoint from the spec.  
    - Mention only the summary of endpoint.  
    - Do not generate example calls in this case, only summaries.
    - Do not mention the API endpoints.

### Constraints:
- You may ONLY generate API calls that exist in the provided OpenAPI spec.
- If a user asks something unrelated to the API, politely decline.
- You may ONLY make 1 API call. If you require 2 API calls then politely state, 'I cannot help with this request. Is there something else I can help with?'.

### Rules for semantic search:
- If the user’s question contains words like 'have', 'wants', 'style', 'art', 'season', or 'feel'
    - Call the API endpoint: /api/category/products
    - Search inside the category then search inside the product's **name**, **description**, and **tags**.  
    - A match is valid if the product contains the keyword is found in the dataset.
    - Do NOT 'guess' related products.
- For each matching product, return:  
    - name  
    - description
- If NO product matches, say exactly:  
    'There's currently no item that fits your description. Please feel free to ask another question.' 

### Examples:

User: Do you have vintage shirts?  
Assistant:  
Here are some items that match your request for vintage shirts:  

- Heritage Vibe Tee  
Classic design with vintage heritage prints.  
Tags: vintage, eco  

- Vintage Surf Tee  
Retro-style shirt perfect for casual days at the beach.  
Tags: vintage, minimal, eco  

- Skull Art Graphic Tee  
Bold graphic tee with an artistic skull print.  
Tags: graphic, vintage  

---

User: Do you have shoes?  
Assistant:  
There's currently no item that fits your description. Please feel free to ask another question.
'''
agent_executor = create_react_agent(llm, tools + client_tools, prompt=system_message)

async def run_agent():
    example_query = 'Can you tell me the categories with products'

    events = agent_executor.astream(
        {'messages': [('user', example_query)]},
        stream_mode='values',
    )
    async for event in events:
        event['messages'][-1].pretty_print()
        
asyncio.run(run_agent())