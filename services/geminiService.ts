
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI once if needed, or per function as per performance/key rotation needs.
// Guidelines suggest creating a new instance right before making an API call for up-to-date keys.

export const generatePostContent = async (topic: string) => {
  try {
    // Create new instance to ensure up-to-date API key usage as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت خبير محتوى لمدونة "عبدو ويب". اكتب مقالاً احترافياً حول: ${topic}. الأسلوب: مغربي عصري، مهني، وجذاب.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Content Generation Error:", error);
    return "خطأ في التوليد.";
  }
};

export const generatePostImage = async (title: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Professional cinematic editorial photo for: ${title}. Moroccan business/tech context.` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    
    // Iterate through all parts to find the image part as per guidelines
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) { 
    console.error("Image Generation Error:", error);
    return null; 
  }
};

export const getMarketAnalytics = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "ما هي متوسط معدلات سعر النقرة (CPC) وألف ظهور (CPM) لإعلانات أدسنس في المغرب لعام 2024 في مجالات التقنية والأخبار؟ أعطني أرقاماً دقيقة بناءً على أحدث التقارير.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      // Extract URLs from groundingChunks as per Google Search grounding guidelines
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Market Analytics Error:", error);
    return null;
  }
};
