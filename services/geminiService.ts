
import { GoogleGenAI, Type } from "@google/genai";
import { Game } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGameRecommendation = async (userQuery: string, gamesList: Game[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a gaming expert assistant for NovaPlay Unblocked. 
      Given the user's mood or query: "${userQuery}", and the following available games: ${JSON.stringify(gamesList.map(g => ({id: g.id, title: g.title, category: g.category})))}.
      Recommend the best game and provide a short, cool reason why.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gameId: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["gameId", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getGameGuide = async (gameTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick pro guide for the game "${gameTitle}". 
      Include 3 short bullet points: Control Tips, Strategy, and Fun Fact. Keep it concise and gamer-focused.`,
      config: {
        temperature: 0.7
      }
    });
    return response.text;
  } catch (error) {
    console.error("Guide Error:", error);
    return "Could not load guide. Just have fun!";
  }
};
