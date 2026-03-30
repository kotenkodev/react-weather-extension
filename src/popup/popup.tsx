import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import { InputBase, IconButton, Paper, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getStoredCities, setStoredCities } from '../utils/storage';

function App() {
  const [cities, setCities] = useState<string[]>(['Toronto', 'London', 'Error']);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
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

  return (
    <Box mx={'8px'} my={'16px'}>
      <Grid container>
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
      {cities.map((city, index) => (
        <WeatherCard
          onDelete={() => handleDeleteCity(index)}
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
