import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import { InputBase, IconButton, Paper, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [cities, setCities] = useState<string[]>(['Toronto', 'London', 'Error']);
  const [cityInput, setCityInput] = useState<string>('');

  const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };

  return (
    <Box mx={'8px'} my={'16px'}>
      <Grid container>
        <Paper>
          <Box px={'15px'} py={'5px'}>
            <InputBase placeholder="Add a city name" value={cityInput} onChange={handleCityInput} />
            <IconButton>
              <AddIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard key={`${city}-${index}`} city={city} />
      ))}
      <img src="icon.png" />
    </Box>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
