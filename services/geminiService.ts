
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

// Fix: Implemented generatePostContent to generate article content using gemini-3-flash-preview
export const generatePostContent = async (title: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `اكتب مقالاً احترافياً ومفصلاً باللغة العربية حول الموضوع التالي: "${title}". يجب أن يكون المقال مناسباً للمدونات التقنية ويشمل مقدمة، فقرات مفصلة، وخاتمة.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Generate Post Content Error:", error);
    throw error;
  }
};

// Fix: Implemented generatePostImage using gemini-2.5-flash-image for article cover generation
export const generatePostImage = async (title: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional and modern blog cover image for an article titled: "${title}". High resolution, cinematic lighting, 4k.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        // Find the image part in the response parts
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Generate Post Image Error:", error);
    return null;
  }
};
