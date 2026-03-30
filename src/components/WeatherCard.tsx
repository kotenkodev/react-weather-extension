import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchOpenWeatherData, WeatherData, WeatherTempScale } from '../utils/api';

interface WeatherCardContainerProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export const WeatherCardContainer = ({ children, onDelete }: WeatherCardContainerProps) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          <Button color="secondary" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'ready' | 'error';

interface WeatherCardProps {
  city: string;
  onDelete: () => void;
  tempScale: WeatherTempScale;
}

export default function WeatherCard({ city, onDelete, tempScale }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherState, setWeatherState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setWeatherState('ready');
      })
      .catch(() => {
        setWeatherState('error');
      });
  }, [city, tempScale]);

  if (weatherState == 'error' || weatherState == 'loading') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="h5">
          {weatherState == 'loading' ? 'Loading...' : 'Error loading weather data for this city.'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
        {city}
      </Typography>
      <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
      <Typography variant="body1">Feels like: {Math.round(weatherData.main.feels_like)}</Typography>
    </WeatherCardContainer>
  );
}
