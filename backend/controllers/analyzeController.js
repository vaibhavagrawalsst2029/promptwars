import Resume from '../models/Resume.js';
import { structureResume } from '../services/aiStructurer.js';
import { enhanceContent } from '../services/contentEnhancer.js';
import { scorePortfolio } from '../services/portfolioScorer.js';

export const analyzeResume = async (req, res, next) => {
  try {
    const { portfolioId } = req.body;

    if (!portfolioId) {
      return res.status(400).json({ success: false, error: 'portfolioId is required.' });
    }

    const resume = await Resume.findOne({ portfolioId });
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume not found.' });
    }

    // Step 1: Structure the raw text with AI
    console.log('🔍 Step 1: Structuring resume...');
    const structuredData = await structureResume(resume.extractedText);

    // Step 2: Enhance the content with AI
    console.log('✨ Step 2: Enhancing content...');
    const enhancedData = await enhanceContent(structuredData);

    // Step 3: Score the portfolio
    console.log('📊 Step 3: Scoring portfolio...');
    const score = await scorePortfolio(enhancedData);

    // Update the resume record
    resume.structuredData = structuredData;
    resume.enhancedData = enhancedData;
    resume.score = score;
    await resume.save();

    console.log('✅ Analysis complete for:', portfolioId);

    res.json({
      success: true,
      data: {
        portfolioId,
        structuredData,
        enhancedData,
        score,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { analyzeResume };
