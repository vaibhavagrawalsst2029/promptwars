import express from 'express';
import upload from '../middleware/upload.js';
import { uploadResume } from '../controllers/uploadController.js';

const router = express.Router();

// Wrap multer to properly catch its errors and send them as JSON
router.post('/', (req, res, next) => {
  console.log('📥 Upload request received');
  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err.message, err.code);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'File too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ success: false, error: err.message });
    }
    uploadResume(req, res, next);
  });
});

export default router;
