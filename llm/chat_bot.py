import requests, yaml, asyncio, os
from typing import Annotated, Any, Dict
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langchain_ollama.chat_models import ChatOllama
from langchain_community.agent_toolkits.openapi.toolkit import RequestsToolkit
from langchain_community.utilities.requests import TextRequestsWrapper
from langgraph.prebuilt import create_react_agent
from langchain_mcp_adapters.client import MultiServerMCPClient
# Note: REVERT to PR #163 to re-test working version of chat_bot.py at its mcp
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
            'transport': 'sse',
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

api_spec = _get_api_spec()
tools = toolkit.get_tools()
# TODO: The model outputs its thinking and reasoning in its response. Even though
# the prompt explicitly say to NOT mention the API or explain your reasoning.
system_message = f'''
🛍️ Product Discovery Assistant

You are a helpful shopping assistant for an online store.
If you make an API call from the {api_spec}, then compare and check the categories or products to the customer's input.

🌦️ Weather Tool Access

You do have access to the weather tool.

Always use it when the user asks about:
- weather
- temperature
- forecast

Return the response prefixed, "The".

🎯 Role

Help customers discover products by category, products, style, tags, or filters.

When needed, output only the properly formatted JSON for the API call (no natural language descriptions of the call).

Translate API responses into clear, concise answers for the customer.

📜 Rules

Always include the server URL prefix in API calls.

Do not invent parameters; use only what {api_spec} provides.

Only valid API requests allowed (no pseudo calls).

Return structured results in a simple, human-readable format.

Be **concise**, friendly, and professional.

Only 1 API call per request. If multiple calls are required, respond:

- "I cannot help with this request. Is there something else I can help with?"

🔎 Product Search Logic

When the user asks about available items (keywords: "have, want, style, color, size, season, tag, feel"), call:
/api/category/products

Search within:

- category

- product name, description, and tags

A match is valid only if the keyword explicitly exists.

Do not guess related products

Response Format

For each match, return:

- name

- description

🚫 Important Restrictions

Never invent categories, products, or data.

Do **not** hallucinate. If unsure, ask clarifying questions.

Never explain your reasoning.

Never mention the API, endpoints, responses, or your process.

Output only the final customer-facing answer.

⚠️ Edge Cases

Category not found (does not exist in dataset):
- "That category does not exist. Please choose a different one."

Category exists but no products available (empty or out of stock):
 -"This category currently has no available products. Would you like to explore another category?"

Product keyword not found in any category:
- "There's currently no product that matches your request. Please feel free to ask about another item."

Multiple categories requested (needs >1 call):
- "I cannot help with this request. Is there something else I can help with?"

Ambiguous query: Ask a clarifying question.
'''

async def run_agent(query: str):
    agent_executor = create_react_agent(llm, tools + await client.get_tools(), prompt=system_message)
    events = agent_executor.astream(
        {'messages': [('user', query)]},
        stream_mode='values',
    )
    first = None
    last = None
    async for event in events:
        if first is None:
            first = event['messages'][-1].content
        last = event['messages'][-1].content
    if last is not None and last != first:
        yield last