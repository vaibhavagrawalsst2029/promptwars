import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { getMockStructuredData } from '../data/mockResume.js';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key_here'
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Use Gemini AI to convert raw resume text into structured JSON.
 */
export const structureResume = async (rawText) => {
  if (!genAI) {
    console.log('⚠️ No Gemini API key found. Using mock structured data.');
    return getMockStructuredData();
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert resume parser. Analyze the following resume text and extract structured information.

Return a JSON object with EXACTLY this structure (use empty strings or empty arrays if information is not found):

{
  "name": "Full Name",
  "role": "Professional Title/Role (infer from experience if not stated)",
  "email": "email@example.com",
  "phone": "+1234567890",
  "linkedin": "linkedin.com/in/username",
  "github": "github.com/username",
  "summary": "A 2-3 sentence professional summary. If not in the resume, create one based on their experience and skills.",
  "skills": ["Skill1", "Skill2", "Skill3"],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description of the project",
      "technologies": ["Tech1", "Tech2"],
      "link": "project-url-if-available"
    }
  ],
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "duration": "Start - End",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "School Name",
      "year": "Graduation Year",
      "gpa": "GPA if available"
    }
  ],
  "certifications": ["Certification 1", "Certification 2"]
}

RESUME TEXT:
${rawText}

Return ONLY valid JSON, no markdown formatting, no code blocks, just the raw JSON object.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up response - remove markdown code blocks if present
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const structured = JSON.parse(cleanedText);
    return structured;
  } catch (error) {
    console.error('❌ AI structuring failed:', error.message);
    console.log('⚠️ Falling back to mock data.');
    return getMockStructuredData();
  }
};

export default structureResume;
