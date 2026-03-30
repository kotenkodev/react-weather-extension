import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchOpenWeatherData, WeatherData } from '../api/weather';

export const WeatherCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'ready' | 'error';

export default function WeatherCard({ city }: { city: string }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherState, setWeatherState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setWeatherState('ready');
      })
      .catch((error) => {
        setWeatherState('error');
      });
  }, []);

  if (weatherState == 'error' || weatherState == 'loading') {
    return (
      <WeatherCardContainer>
        <Typography variant="h5">
          {weatherState == 'loading' ? 'Loading...' : 'Error loading weather data for this city.'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
      <Typography variant="body1">Feels like: {Math.round(weatherData.main.feels_like)}</Typography>
    </WeatherCardContainer>
  );
}
