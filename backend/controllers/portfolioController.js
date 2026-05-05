import Resume from '../models/Resume.js';

export const getPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ portfolioId: id });

    if (!resume) {
      return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    }

    res.json({
      success: true,
      data: {
        portfolioId: resume.portfolioId,
        filename: resume.filename,
        enhancedData: resume.enhancedData || resume.structuredData,
        theme: resume.theme,
        score: resume.score,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { theme } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { portfolioId: id },
      { theme },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    }

    res.json({ success: true, data: { theme: resume.theme } });
  } catch (error) {
    next(error);
  }
};

export const getAllPortfolios = async (req, res, next) => {
  try {
    const resumes = await Resume.find({})
      .sort({ createdAt: -1 })
      .select('portfolioId filename enhancedData theme score createdAt');

    res.json({
      success: true,
      data: resumes.map((r) => ({
        portfolioId: r.portfolioId,
        filename: r.filename,
        name: r.enhancedData?.name || r.structuredData?.name || 'Unknown',
        role: r.enhancedData?.role || r.structuredData?.role || 'Professional',
        theme: r.theme,
        overallScore: r.score?.overallScore || null,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const deletePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOneAndDelete({ portfolioId: id });

    if (!resume) {
      return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    }

    res.json({ success: true, message: 'Portfolio deleted.' });
  } catch (error) {
    next(error);
  }
};

export default { getPortfolio, updateTheme, getAllPortfolios, deletePortfolio };
