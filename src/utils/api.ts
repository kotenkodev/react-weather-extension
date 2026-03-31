const API_KEY = process.env.OPEN_WEATHER_API_KEY;

export interface WeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export type WeatherTempScale = 'metric' | 'imperial';

export async function fetchOpenWeatherData(
  city: string,
  tempScale: WeatherTempScale,
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

export function getWeatherIconSrc(iconCode: string) {
  return 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
}
