import express from 'express';
import { getThemes } from '../controllers/themeController.js';

const router = express.Router();

router.get('/', getThemes);

export default router;
