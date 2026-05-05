import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  portfolioId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  filename: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    default: '',
  },
  structuredData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  enhancedData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  theme: {
    type: String,
    default: 'developer',
  },
  score: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
