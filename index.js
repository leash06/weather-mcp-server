import fetch from 'node-fetch';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
//env
import 'dotenv/config';
const API_KEY = process.env.OPENWEATHER_API_KEY;

const server = new McpServer({
  name: 'weather-server',
  version: '1.0.0'
});

//  Get current weather
server.tool(
  'get_current_weather',
  'Get the current weather for a city',
  {
    city: z.string().describe('The city name, e.g. Algiers')
  },
  async ({ city }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      return { content: [{ type: 'text', text: `City not found: ${city}` }] };
    }

    const text = `Weather in ${data.name}:
🌡️ Temperature: ${data.main.temp}°C
🤔 Feels like: ${data.main.feels_like}°C
💧 Humidity: ${data.main.humidity}%
🌤️ Condition: ${data.weather[0].description}
💨 Wind: ${data.wind.speed} m/s`;

    return { content: [{ type: 'text', text }] };
  }
);

// Get 5day forecast
server.tool(
  'get_forecast',
  'Get a 5-day weather forecast for a city',
  {
    city: z.string().describe('The city name, e.g. Algiers')
  },
  async ({ city }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== '200') {
      return { content: [{ type: 'text', text: `City not found: ${city}` }] };
    }

    const forecast = data.list.map(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      return `📅 ${date}: ${item.main.temp}°C, ${item.weather[0].description}`;
    }).join('\n');

    return { content: [{ type: 'text', text: `5-Day Forecast for ${city}:\n${forecast}` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);