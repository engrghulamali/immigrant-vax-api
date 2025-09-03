import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import profileRoutes from './routes/profileRoutes.js';
import vaccinationRoutes from './routes/vaccinationRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api/profile', profileRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/requirements', requirementRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
