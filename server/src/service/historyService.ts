import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
}
// TODO: Complete the HistoryService class
class HistoryService {
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
/*
    fetch()
      .then()
      .then()
      .catch(err)
*/
    try {
      
      const data = await fs.readFile('db/searchHistory.json', 'utf8');
      console.log("Data: ", data);
      console.log("Data Type: ", typeof data);
      return data;
    } catch (error) {
      
      console.log("Err: ", error);
    }

/*
    // ES5 Error First CALLBACK function syntax
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if(err) {
        console.log("Err: ", err);
      }
      console.log("Data: ", data);
    });
    console.log("JSON data: ", data);  // --> PROMISE

    */
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const data = fs.writeFile('db/searchHistory.json', 'utf8');

  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = this.read();
    console.log("Cities: ", cities);
    console.log("Cities data: ", typeof cities);
    const jsData = JSON.parse(cities);
    console.log("JS Data: ", jsData);
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {


    // First need to Retrieve the CURRENT data set  --> read()
    try {
      
      const addedCities = await fs.readFile('db/db.json', 'utf8');
      console.log("data: ", addedCities);
    // Check the Data type? --> PARSE if needed (DATA CONVERSION)
    // JSON --> JS Array []
    const jsData = JSON.parse(addedCities);
    console.log ('jsData: ', jsData);
    // ADD the new data to our JS ARRAY --> array.push(city)
     const citiesArray = addedCities.push(city);
    // Check the Data type? --> STRINGIFY if needed (DATA CONVERSION)
console.log('citiesArray: ', citiesArray);

    // SAVE the NEW INSTANCE of our dataset (OVERWRITTING THE DATA)

  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
