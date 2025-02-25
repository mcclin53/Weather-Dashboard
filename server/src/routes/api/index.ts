import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';

// This route is PREFIXED with '/api'
router.use('/weather', weatherRoutes);  // --> '/api/weather'

export default router;
