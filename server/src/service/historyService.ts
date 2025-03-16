import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor( id:string, name: string) {
    this.id = id;
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {

    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf8');
      console.log("Data: ", data);
      console.log("Data Type: ", typeof data);
      return JSON.parse(data);
    } catch (error) {
     console.log("Err: ", error);
     return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
    const data = JSON.stringify(cities, null, 2);
    await fs.writeFile('db/searchHistory.json', data, 'utf8');
    console.log("success");
    }catch (error) {
      console.log("Err: ", error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try {
    const citiesData = await this.read();
    console.log("Cities: ", citiesData);
    const jsData = typeof citiesData === 'string' ? JSON.parse(citiesData) : citiesData;
    console.log("JS Data: ", jsData);
    return jsData as City[];
    } catch (error) {
      console.log("Err: ", error);
      return [];
    }
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const citiesArray = await this.read();
      const jsData = Array.isArray(citiesArray) ? citiesArray : JSON.parse(citiesArray);
      jsData.push(city);
      await this.write(jsData);
    } catch (error) {
      console.log("Err: ", error);
    }

    // SAVE the NEW INSTANCE of our dataset (OVERWRITTING THE DATA)

  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      const citiesArray = await this.read();
      const jsData = Array.isArray(citiesArray) ? citiesArray : JSON.parse(citiesArray);
      const updatedCities = jsData.filter((existingCity: City) => existingCity.id !== id);
      await this.write(updatedCities);
    } catch (error) {
      console.log("Err ", error);
    }
  }
}

export default new HistoryService();
