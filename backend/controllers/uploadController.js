import { v4 as uuidv4 } from 'uuid';
import Resume from '../models/Resume.js';
import { parseResume } from '../services/resumeParser.js';

export const uploadResume = async (req, res, next) => {
  try {
    console.log('📄 Processing uploaded file...');
    console.log('   req.file:', req.file ? req.file.originalname : 'MISSING');

    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }

    console.log('   Path:', req.file.path);
    console.log('   Size:', req.file.size, 'bytes');
    console.log('   MIME:', req.file.mimetype);

    const portfolioId = uuidv4();

    // Extract text from uploaded file
    let extractedText = '';
    try {
      extractedText = await parseResume(req.file.path);
      console.log('✅ Extracted', extractedText.length, 'chars of text');
    } catch (parseError) {
      console.error('⚠️ Parse error:', parseError.message);
      return res.status(400).json({
        success: false,
        error: 'Failed to parse the uploaded file. Please ensure it contains readable text.',
      });
    }

    if (!extractedText || extractedText.trim().length < 20) {
      console.error('⚠️ Text too short:', extractedText?.length || 0, 'chars');
      return res.status(400).json({
        success: false,
        error: 'The uploaded file appears to be empty or contains very little text.',
      });
    }

    // Save to database
    const resume = new Resume({
      portfolioId,
      filename: req.file.originalname,
      extractedText,
    });

    await resume.save();
    console.log('✅ Resume saved with portfolioId:', portfolioId);

    res.status(201).json({
      success: true,
      data: {
        portfolioId,
        filename: req.file.originalname,
        textPreview: extractedText.substring(0, 200) + '...',
        textLength: extractedText.length,
      },
    });
  } catch (error) {
    console.error('❌ Upload controller error:', error.message);
    next(error);
  }
};

export default { uploadResume };
