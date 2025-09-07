# Chat Bot

A helpful customer service assitant for an online shopping platform.

Leverage FastAPI with websocket to facilitate chat between the chat bot and the user.

## Dependency

- Langchain
- Langgraph
- FastAPI

## Small Language Model

- llama3.1

## Tools

- Access to the spring api-docs:
  - /api/category/products
  - /api/products/bestSeller
  - /api/products/similar/{name}

## Model Context Protocol(MCP)

- stdio - add & multiply tool
- http - weather tool

## Local Developement

```bash
cd llm
fastapi dev main.py
```

- After running fastapi, test the Chatbot on http://localhost:8000