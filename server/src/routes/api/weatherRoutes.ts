import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

// these routes are ALL PREFIXED with '/api/weather'
router.post('/', async (req: Request, res: Response) => {

  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);

  // TODO: save city to search history --> use the HistoryService
  return res.status(200).json(weatherData);
} catch (error: any) {
  return res.status(500).json({ error: 'Failed to retrieve weather data' });
}
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities(); 
    return res.status(200).json(history); 
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    await HistoryService.removeCity(id);
    res.status(204).send();
  });

export default router;
