import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  temp: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  
  constructor(
    city: string,
    date: string,
    temp: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string,
  ) {
      this.city = city;
      this.date = date;
      this.temp = temp;
      this.windSpeed = windSpeed;
      this.humidity = humidity;
      this.icon = icon;
      this.iconDescription = iconDescription;
}
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';  
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return data;

    } catch (error: any) {
      console.log(error);
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData[0].lat,
      longitude: locationData[0].lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geoQuery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geoQuery);
    const destructedLocationData = this.destructureLocationData(locationData);
    return destructedLocationData;
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {

      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather[] {
    const data = response.list[0];
    const date = new Date(data.dt * 1000).toLocaleDateString();      const weather = new Weather(
      this.cityName,
      date,
      data.main.temp,
      data.wind.speed,
      data.main.humidity,
      data.weather[0].icon,
      data.weather[0].description,
    );
    const forecast: Weather[] = this.buildForecastArray(weather, response.list);
    return forecast;
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const weatherForecast: Weather[] = [currentWeather];
    const filteredWeatherData = weatherData.filter((data: any) => {
      return data;
    });
    for (const day of filteredWeatherData) {
    const date = new Date(day.dt * 1000).toLocaleDateString();
      weatherForecast.push(
        new Weather(
          this.cityName,
          date,
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description,
        )
      )};
    return weatherForecast;
  } 
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    console.log(currentWeather);
    return currentWeather;
  }
}

export default new WeatherService();
