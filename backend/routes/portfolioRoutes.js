import express from 'express';
import {
  getPortfolio,
  updateTheme,
  getAllPortfolios,
  deletePortfolio,
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', getAllPortfolios);
router.get('/:id', getPortfolio);
router.put('/:id/theme', updateTheme);
router.delete('/:id', deletePortfolio);

export default router;
