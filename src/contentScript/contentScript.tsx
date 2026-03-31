// contentScript.tsx
import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import ReactDOM from 'react-dom';
import { Card } from '@mui/material';
import { getStoredOptions, LocalStorageOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

const App = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Messages.TOGGLE_OVERLAY) {
        setIsActive((prev) => !prev);
      }
      if (message === Messages.TEMP_SCALE_CHANGED) {
        setOptions((prev) => ({
          ...prev,
          tempScale: prev.tempScale === 'metric' ? 'imperial' : 'metric',
        }));
      }
    });
  }, []);

  if (!options || !isActive) {
    return null;
  }

  return (
    <div
      className="overlay-wrapper"
      onMouseDown={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const offX = e.clientX - rect.left;
        const offY = e.clientY - rect.top;
        const onMove = (e: MouseEvent) => {
          el.style.left = e.clientX - offX + 'px';
          el.style.top = e.clientY - offY + 'px';
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMove), {
          once: true,
        });
        e.preventDefault();
      }}
    >
      <WeatherCard
        city={options.homeCity}
        tempScale={options.tempScale}
        onDelete={() => setIsActive(false)}
      />
    </div>
  );
};

const root = document.createElement('div');
root.id = 'weather-extension-root';
document.body.appendChild(root);

ReactDOM.render(<App />, root);
