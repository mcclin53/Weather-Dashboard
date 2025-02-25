import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

// these routes are ALL PREFIXED with '/api/weather'
router.post('/', (req: Request, res: Response) => {

  console.log("Incoming Data: ", req.body)  // { cityName: '' }
  const city = req.body.cityName;
});
  // TODO: GET weather data from city name
  router.get('/', (req: Request, res: Response) => {
//  const weatherData = 
//  router.get('/', (req: Request, res: Response) => req.JSON(weatherData))
  // TODO: save city to search history --> use the HistoryService
  const result = HistoryService.addCity(city);
  // RESPONSE BACK TO THE CLIENT FETCH REQUEST
  res.json(result);
//  router.put('/history',(req: Request, res: Response))
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
