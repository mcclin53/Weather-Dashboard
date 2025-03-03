import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  cityName: string;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
 fetch(api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={this.APIkey})
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    console.log (locationData.latitude);
    console.log (locationData.longitude);
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    fetch(api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key})
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();
