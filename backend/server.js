import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import uploadRoutes from './routes/uploadRoutes.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';

// Demo data seeding
import Resume from './models/Resume.js';
import { getMockEnhancedData, getMockScore } from './data/mockResume.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/score', scoreRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ResumeForge AI API is running 🚀' });
});

// Error handler
app.use(errorHandler);

// Seed demo data
const seedDemoData = async () => {
  try {
    const existingDemo = await Resume.findOne({ portfolioId: 'demo-portfolio' });
    if (!existingDemo) {
      const demoResume = new Resume({
        portfolioId: 'demo-portfolio',
        filename: 'demo-resume.pdf',
        extractedText: 'Demo resume for Alex Chen - Full Stack Developer',
        structuredData: getMockEnhancedData(),
        enhancedData: getMockEnhancedData(),
        theme: 'developer',
        score: getMockScore(),
      });
      await demoResume.save();
      console.log('🌱 Demo portfolio seeded successfully');
    }
  } catch (error) {
    console.error('⚠️ Demo seeding error:', error.message);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  await seedDemoData();

  app.listen(PORT, () => {
    console.log(`\n🚀 ResumeForge AI Backend running on http://localhost:${PORT}`);
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🗂️  Demo Portfolio ID: demo-portfolio\n`);
  });
};

startServer();
