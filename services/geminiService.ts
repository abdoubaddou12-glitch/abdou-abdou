
import { GoogleGenAI } from "@google/genai";

export const generatePostContent = async (topic: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اكتب مقالاً احترافياً باللغة العربية حول الموضوع التالي: ${topic}. 
      يجب أن يتضمن العنوان، ومقدمة، وعناوين فرعية، وخاتمة. 
      اجعل الأسلوب جذاباً ومفيداً لمدونة تقنية/ثقافية.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، حدث خطأ أثناء توليد المحتوى الذكي.";
  }
};

export const suggestTitles = async (content: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اقترح 5 عناوين جذابة لهذا النص: ${content.substring(0, 500)}`,
    });
    return response.text;
  } catch (error) {
    return "";
  }
};
