
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
  if (!apiKey) {
    return "خطأ: مفتاح API غير موجود. يرجى التأكد من إعداد البيئة بشكل صحيح.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اكتب مقالاً احترافياً باللغة العربية حول الموضوع التالي: ${topic}. 
      يجب أن يتضمن العنوان، ومقدمة، وعناوين فرعية، وخاتمة. 
      اجعل الأسلوب جذاباً ومفيداً لمدونة تقنية/ثقافية.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "لم يتم توليد أي محتوى.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، حدث خطأ أثناء توليد المحتوى الذكي.";
  }
};

export const suggestTitles = async (content: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اقترح 5 عناوين جذابة لهذا النص: ${content.substring(0, 500)}`,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};
