import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key_here'
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Use Gemini AI to score the portfolio on multiple dimensions.
 */
export const scorePortfolio = async (enhancedData) => {
  if (!genAI) {
    console.log('⚠️ No Gemini API key. Using mock score.');
    return getMockScore(enhancedData);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a senior technical recruiter and portfolio reviewer. Evaluate the following portfolio data and provide a detailed score.

Score each category from 1.0 to 10.0 (one decimal place):

1. recruiterAppeal - How attractive is this to a recruiter?
2. contentStrength - How strong and specific is the content?
3. completeness - How complete is the profile (all sections filled)?
4. technicalDepth - How technically impressive are the skills/projects?
5. overallScore - Overall portfolio quality

Also provide:
- "suggestions": An array of 3-5 actionable improvement suggestions (e.g., "Add a GitHub link", "Quantify achievements with metrics")
- "strengths": An array of 2-3 things that are done well

Portfolio data:
${JSON.stringify(enhancedData, null, 2)}

Return ONLY valid JSON in this exact format:
{
  "recruiterAppeal": 8.5,
  "contentStrength": 7.8,
  "completeness": 9.0,
  "technicalDepth": 8.2,
  "overallScore": 8.4,
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "strengths": ["strength1", "strength2"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('❌ AI scoring failed:', error.message);
    return getMockScore(enhancedData);
  }
};

function getMockScore(data) {
  const hasGithub = data?.github ? 1 : 0;
  const hasLinkedin = data?.linkedin ? 1 : 0;
  const projectCount = data?.projects?.length || 0;
  const skillCount = data?.skills?.length || 0;
  const expCount = data?.experience?.length || 0;

  const completeness = Math.min(10, 5 + hasGithub + hasLinkedin + Math.min(projectCount, 2) + (expCount > 0 ? 1 : 0));
  const technicalDepth = Math.min(10, 5 + Math.min(skillCount * 0.3, 3) + Math.min(projectCount * 0.5, 2));

  return {
    recruiterAppeal: 8.5,
    contentStrength: 8.0,
    completeness: parseFloat(completeness.toFixed(1)),
    technicalDepth: parseFloat(technicalDepth.toFixed(1)),
    overallScore: parseFloat(((8.5 + 8.0 + completeness + technicalDepth) / 4).toFixed(1)),
    suggestions: [
      ...(hasGithub ? [] : ['Add a GitHub profile link to showcase your code']),
      ...(hasLinkedin ? [] : ['Include your LinkedIn profile for professional networking']),
      ...(projectCount < 3 ? ['Add more projects to demonstrate breadth of experience'] : []),
      'Quantify achievements with specific metrics and numbers',
      'Add certifications to validate your technical skills',
    ].slice(0, 5),
    strengths: [
      skillCount > 5 ? 'Strong and diverse technical skill set' : 'Focused technical expertise',
      expCount > 0 ? 'Solid professional experience' : 'Strong project portfolio',
      'Well-structured and organized content',
    ],
  };
}

export default scorePortfolio;
