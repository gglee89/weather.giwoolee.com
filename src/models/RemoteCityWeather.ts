interface Weather {
  main: string;
  description: string;
}

export interface RemoteCityWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Weather[];
  wind: {
    deg: number;
    speed: number;
  };
}
