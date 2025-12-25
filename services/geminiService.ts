
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const generatePostContent = async (topic: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "خطأ في المفتاح.";
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت خبير محتوى لمدونة "عبدو ويب". اكتب مقالاً احترافياً حول: ${topic}. الأسلوب: مغربي عصري، مهني، وجذاب.`,
    });
    return response.text || "";
  } catch (error) {
    return "خطأ في التوليد.";
  }
};

export const generatePostImage = async (title: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Professional cinematic editorial photo for: ${title}. Moroccan business/tech context.` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) { return null; }
};

export const getMarketAnalytics = async () => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "ما هي متوسط معدلات سعر النقرة (CPC) وألف ظهور (CPM) لإعلانات أدسنس في المغرب لعام 2024 في مجالات التقنية والأخبار؟ أعطني أرقاماً دقيقة بناءً على أحدث التقارير.",
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
