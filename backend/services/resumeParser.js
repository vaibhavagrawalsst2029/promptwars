import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Parse a resume file (PDF or DOCX) and extract raw text.
 */
export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  console.log(`   Parsing ${ext} file...`);

  if (ext === '.pdf') {
    return await parsePDF(filePath);
  } else if (ext === '.docx') {
    return await parseDOCX(filePath);
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }
};

const parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  console.log(`   PDF buffer size: ${dataBuffer.length} bytes`);
  const data = await pdfParse(dataBuffer);
  console.log(`   Extracted ${data.text.length} characters, ${data.numpages} pages`);
  return data.text;
};

const parseDOCX = async (filePath) => {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.default.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.warn('⚠️ mammoth not installed, DOCX parsing unavailable');
    throw new Error('DOCX parsing requires mammoth package. Install with: npm install mammoth');
  }
};

export default parseResume;
