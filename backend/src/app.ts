import express from 'express';
import cors from 'cors';
import apartmentRouter from './modules/apartment/apartment.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/apartments', apartmentRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Apartments API' }));

app.use(errorHandler);

export default app;
