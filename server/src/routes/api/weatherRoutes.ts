import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

// these routes are ALL PREFIXED with '/api/weather'
router.post('/', async (req: Request, res: Response) => {
try {
  console.log("Incoming Data: ", req.body)  // { cityName: '' }
  const cityName = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  await HistoryService.addCity(cityName);
  res.status(200).json(weatherData);
  catch (err) {
    res.status(500).json({ message:err });
  }
});
  // TODO: GET weather data from city name

  router.get('/', (req: Request, res: Response) => {
//  const weatherData = 
//  router.get('/', (req: Request, res: Response) => req.JSON(weatherData))
  // TODO: save city to search history --> use the HistoryService
  const result = HistoryService.addCity(cityName);
  // RESPONSE BACK TO THE CLIENT FETCH REQUEST
  res.json(result);
//  router.put('/history',(req: Request, res: Response))
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await HistoryService.removeCity(id);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await HistoryService.removeCity(id);
    res.status(204).send()
  } catch (err)
  res.status(500).json({ message:err });
  
});

export default router;
