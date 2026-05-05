import Resume from '../models/Resume.js';
import { scorePortfolio } from '../services/portfolioScorer.js';

export const getScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ portfolioId: id });

    if (!resume) {
      return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    }

    // If score exists, return it
    if (resume.score) {
      return res.json({ success: true, data: resume.score });
    }

    // Otherwise generate score on-the-fly
    const data = resume.enhancedData || resume.structuredData;
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Portfolio has not been analyzed yet. Call /api/analyze first.',
      });
    }

    const score = await scorePortfolio(data);
    resume.score = score;
    await resume.save();

    res.json({ success: true, data: score });
  } catch (error) {
    next(error);
  }
};

export default { getScore };
