
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
      contents: `أنت خبير في صناعة المحتوى لمدونة "عبدو ويب" (Abdouweb) المغربية المتخصصة. اكتب مقالاً احترافياً باللغة العربية حول الموضوع التالي: ${topic}. 
      يجب أن يركز المقال على أحد هذه المجالات: (أخبار المغرب التقنية، التكنولوجيا العالمية، تطوير الذات والإنتاجية، أو التسويق بالعمولة والأفلييت).
      
      المتطلبات:
      1. عنوان جذاب ومثير للاهتمام يليق بمنصة عبدو ويب.
      2. مقدمة تشد القارئ وتوضح القيمة المضافة.
      3. عناوين فرعية واضحة بأسلوب عصري.
      4. نصائح عملية وقابلة للتطبيق للشباب المغربي والعربي.
      5. خاتمة تلخص الموضوع مع دعوة للتفاعل (CTA) تشجع على متابعة عبدو ويب.
      6. إذا كان الموضوع يتعلق بالأفلييت، اذكر استراتيجيات الربح الحقيقية.
      7. إذا كان عن المغرب، أشر إلى السياق المحلي بذكاء.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "لم يتم توليد أي محتوى.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، حدث خطأ أثناء توليد المحتوى الذكي في منصة عبدو ويب.";
  }
};

export const suggestTitles = async (content: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بناءً على هذا المحتوى لمدونة عبدو ويب، اقترح 5 عناوين احترافية متوافقة مع قواعد السيو (SEO) لجمهور مغربي وعربي: ${content.substring(0, 500)}`,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};
