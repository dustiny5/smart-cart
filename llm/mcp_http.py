from mcp.server.fastmcp import FastMCP
from dotenv import load_dotenv
import os, requests

load_dotenv()

mcp = FastMCP('Weather')

@mcp.tool()
async def get_weather(location: str) -> str:
    '''Get weather for location.'''
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&units=imperial&appid={os.getenv('OPEN_WEATHER_API_KEY')}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        temp = data['main']['temp']
        desc = data['weather'][0]['description']
        return f'The current weather in {location} is {temp}°F with {desc}.'
    else:
        return f'Sorry, I could not fetch data on {location}'

if __name__ == '__main__':
    mcp.run(transport='sse')