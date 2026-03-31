import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import { InputBase, IconButton, Paper, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredCities,
  setStoredOptions,
} from '../utils/storage';
import { PictureInPicture as PictureInPictureIcon } from '@mui/icons-material';
import { Messages } from '../utils/messages';

function App() {
  const [cities, setCities] = useState<string[]>(['Toronto', 'London', 'Error']);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
    });
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleAddCity = () => {
    if (cityInput === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleDeleteCity = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);

    setStoredCities(newCities).then(() => {
      setCities(newCities);
      setCityInput('');
    });
  };

  const handleTempScaleClick = () => {
    setOptions((prevOptions) => {
      if (!prevOptions) {
        return null;
      }
      const updatedOptions: LocalStorageOptions = {
        ...prevOptions,
        tempScale: prevOptions.tempScale === 'metric' ? 'imperial' : 'metric',
      };
      setStoredOptions(updatedOptions);
      return updatedOptions;
    });
  };

  const handleOverlayClick = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      },
    );

    setOptions((prevOptions) => {
      if (!prevOptions) {
        return null;
      }
      const updatedOptions: LocalStorageOptions = {
        ...prevOptions,
        hasAutoOverlay: !prevOptions.hasAutoOverlay,
      };
      setStoredOptions(updatedOptions);
      return updatedOptions;
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx={'8px'} my={'16px'}>
      <Grid container justifyContent={'space-evenly'}>
        <Grid>
          <Paper>
            <Box px={'15px'} py={'5px'}>
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleAddCity}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            <Box py={'4px'}>
              <IconButton onClick={handleTempScaleClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            <Box py={'4px'}>
              <IconButton onClick={handleOverlayClick}>
                <PictureInPictureIcon color={options.hasAutoOverlay ? 'primary' : 'disabled'} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != '' && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          onDelete={() => handleDeleteCity(index)}
          tempScale={options.tempScale}
          key={`${city}-${index}`}
          city={city}
        />
      ))}
      <Box height={'16px'} />
    </Box>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
