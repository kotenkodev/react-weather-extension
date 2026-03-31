import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import ReactDOM from 'react-dom';
import { Card } from '@mui/material';
import { getStoredOptions, LocalStorageOptions } from '../utils/storage';

const App = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  return (
    <Card className="overlayCard">
      <WeatherCard city={options.homeCity} tempScale={options.tempScale} />;
    </Card>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
