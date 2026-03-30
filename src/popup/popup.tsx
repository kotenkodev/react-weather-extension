import React from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import WeatherCard from '../components/WeatherCard';

const App: React.FC<{}> = () => {
    return (
        <div>
            <WeatherCard city="London" />
            <WeatherCard city="Toronto" />
            <WeatherCard city="Error" />
            <img src="icon.png" />
        </div>
    );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
