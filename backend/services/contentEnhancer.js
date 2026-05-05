import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key_here'
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Use Gemini AI to enhance weak resume content into powerful, professional descriptions.
 */
export const enhanceContent = async (structuredData) => {
  if (!genAI) {
    console.log('Gemini failed, using fallback mock data');
    return applyBasicEnhancements(structuredData);
  }

  try {
    console.log('Using Gemini model: gemini-1.5-flash-latest');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `You are a professional resume writer and career coach. Your job is to enhance the following resume data to make it more impressive, professional, and recruiter-friendly.

Rules:
1. Enhance the summary to be compelling and highlight key strengths (2-3 sentences).
2. For each project description, make it more impactful. Use action verbs and quantify results where possible.
3. For experience highlights, make them achievement-oriented using the STAR method. Add metrics/numbers when plausible.
4. Keep all factual information the same — only improve the WORDING.
5. If a field seems weak, enhance it significantly.

Example enhancement:
- BEFORE: "made ecommerce website"
- AFTER: "Engineered a scalable full-stack e-commerce platform featuring secure JWT authentication, Stripe payment integration, and a responsive UI that increased user engagement by 40%."

Here is the resume data to enhance:
${JSON.stringify(structuredData, null, 2)}

Return the SAME JSON structure with enhanced content. Return ONLY valid JSON, no markdown formatting, no code blocks.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const enhanced = JSON.parse(cleanedText);
    return enhanced;
  } catch (error) {
    console.error('❌ AI enhancement failed:', error.message);
    console.log('Gemini failed, using fallback mock data');
    return applyBasicEnhancements(structuredData);
  }
};

/**
 * Basic text enhancement fallback when Gemini is unavailable
 */
function applyBasicEnhancements(data) {
  const enhanced = JSON.parse(JSON.stringify(data));

  // Enhance summary if too short
  if (enhanced.summary && enhanced.summary.length < 100) {
    enhanced.summary = `Driven and results-oriented ${enhanced.role || 'professional'} with a proven track record of delivering high-quality solutions. ${enhanced.summary} Passionate about leveraging cutting-edge technologies to solve complex challenges and drive meaningful impact.`;
  }

  // Enhance project descriptions
  if (enhanced.projects) {
    enhanced.projects = enhanced.projects.map((project) => ({
      ...project,
      description: project.description && project.description.length < 50
        ? `Architected and developed ${project.name}: ${project.description}. Leveraged ${(project.technologies || []).join(', ')} to deliver a scalable and performant solution.`
        : project.description,
    }));
  }

  return enhanced;
}

export default enhanceContent;
