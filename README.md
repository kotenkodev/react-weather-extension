# React Weather Chrome Extension

A Chrome extension that provides real-time weather updates, forecasts, and weather-related notifications directly in your browser. Easily check current conditions and plan your day with accurate, up-to-date weather information.

## Features

- **Real-time Weather:** Get the current temperature, conditions, and wind speed for any city.
- **Multiple Cities:** Add and manage a list of cities to keep track of the weather in different locations.
- **Customizable Units:** Switch between Celsius and Fahrenheit for temperature display.
- **Home City:** Set a primary "home" city that always appears at the top of the list.
- **Picture-in-Picture Overlay:** Toggle an overlay on the current webpage to keep an eye on the weather.
- **Options Page:** Configure your home city and overlay settings.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) installed on your computer.
- An API key from [OpenWeatherMap](https://openweathermap.org/api).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-weather-extension.git
    cd react-weather-extension
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root of the project directory and add your OpenWeatherMap API key like this:
    ```
    OPEN_WEATHER_API_KEY=your_api_key_here
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```
    This command will build the extension and watch for any file changes, recompiling automatically. The output will be in the `dist` folder.

### Loading The Chrome Extension

1.  Open Google Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** in the top right corner.
3.  Click on **Load unpacked**.
4.  Select the `dist` folder from the project directory.

The Weather Extension icon should now appear in your Chrome toolbar.

## Production Build

To create a production-ready, minified version of the extension, run:

```bash
npm run build
```

This will generate the production files in the `dist` folder. You can then zip the `dist` folder and upload it to the Chrome Web Store.

## Usage

- **Click the extension icon** in the Chrome toolbar to see the weather for your configured cities.
- **Add a city:** Type a city name in the input field and click the "Add" button.
- **Remove a city:** Click the "delete" icon on a weather card.
- **Change temperature scale:** Click the °C/°F button to toggle between Celsius and Fahrenheit.
- **Access options:** Right-click the extension icon and select "Options" to set your home city and other preferences.
