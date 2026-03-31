import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import ReactDOM from 'react-dom';
import { Card } from '@mui/material';
import { getStoredOptions, LocalStorageOptions } from '../utils/storage';

const App = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
          ;
        </Card>
      )}
    </>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
