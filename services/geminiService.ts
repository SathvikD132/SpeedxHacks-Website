
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCourseAdvice = async (userPrompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert educational advisor for SMART Hacks. Recommend courses briefly. Your responses MUST be extremely concise, ideally 1-2 sentences maximum. No fluff.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Try asking about our workshops!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our advisor is offline. Contact us directly below.";
  }
};
