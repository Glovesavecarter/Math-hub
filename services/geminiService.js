import { GoogleGenAI } from "@google/genai";

export const getGameGuide = async (gameTitle) => {
  if (!process.env.API_KEY) return "AI Tactical Briefing unavailable (Missing Logic Key).";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 3-point tactical briefing for the logic module "${gameTitle}". Focus on spatial reasoning, optimal strategy, and a fun trivia fact. Format as concise bullet points.`,
      config: {
        temperature: 0.7
      }
    });
    return response.text || "Tactical data stream clear.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tactical briefing failed to initialize. Rely on field intuition.";
  }
};