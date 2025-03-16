import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/api/index.html', (_req: Request, res: Response) => {
console.log (`Routed successfully`);
res.sendFile(path.join(__dirname, 'index.html'));
});

export default router;
