import express from 'express';
import cors from 'cors'; // ✅ Add this import
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoute.js';
import compoundRoutes from './src/routes/compoundRoute.js';
import { startServer } from './src/services/startupService.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/compounds', compoundRoutes);

const PORT = process.env.PORT || 5000;

startServer(app, PORT);
