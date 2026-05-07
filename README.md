# Weather MCP Server

A Model Context Protocol (MCP) server that gives Claude real-time weather superpowers using the OpenWeatherMap API.

## What can Claude do with this?
- Get current weather for any city in the world
- Get a 5-day forecast for any city

## Tools
| Tool | Description |
|------|-------------|
| `get_current_weather` | Returns temperature, humidity, wind speed and condition for a city |
| `get_forecast` | Returns a 5-day weather forecast for a city |

## How to run it

### 1. Clone the repo
git clone https://github.com/leash06/weather-mcp-server.git
cd weather-mcp-server

### 2. Install dependencies
npm install

### 3. Add your API key
Get a free key from openweathermap.org and replace YOUR_API_KEY_HERE in index.js

### 4. Connect to Claude Desktop
Add this to your claude_desktop_config.json:
{
  "mcpServers": {
    "weather-server": {
      "command": "node",
      "args": ["/path/to/weather-mcp-server/index.js"]
    }
  }
}

### 5. Restart Claude Desktop and ask:
"What's the weather in Algiers?"

## Built With
- Node.js
- MCP SDK by Anthropic
- OpenWeatherMap API

## Author
leash06 - github.com/leash06
