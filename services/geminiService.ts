
import { GoogleGenAI } from "@google/genai";

export const getMarketAnalytics = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "ما هي أحدث توجهات استخدام صيغة WebP في تحسين سيو المواقع لعام 2024؟",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Market Analytics Error:", error);
    return null;
  }
};
