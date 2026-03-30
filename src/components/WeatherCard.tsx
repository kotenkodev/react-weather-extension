import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchOpenWeatherData, WeatherData } from '../api/weather';

export default function WeatherCard({ city }: { city: string }) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        fetchOpenWeatherData(city)
            .then((data) => {
                setWeatherData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!weatherData) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">Loading...</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box mx={'4px'} my={'16px'}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{city}</Typography>
                    <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
                    <Typography variant="body1">
                        Feels like: {Math.round(weatherData.main.feels_like)}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
