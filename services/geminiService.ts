
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
      contents: `أنت خبير في صناعة المحتوى لمدونة "عبدو ويب" (Abdouweb) المغربية. اكتب مقالاً احترافياً باللغة العربية حول الموضوع التالي: ${topic}. 
      يجب أن يركز المقال بشكل أساسي على أحد هذه المجالات الثلاثة:
      1. أخبار المغرب (تطورات اقتصادية، اجتماعية، أو رياضية مثل الكان وكأس العالم 2030).
      2. التكنولوجيا والتقنية (مراجعات هواتف، حواسيب، أو أخبار الشركات الرقمية).
      3. تطوير الذات والإنتاجية (نصائح للنجاح المهني، الأفلييت، والعمل الحر).
      
      المتطلبات:
      1. عنوان قوي ومؤثر بلمسة مغربية عصرية.
      2. إذا كان الموضوع عن "أخبار المغرب"، يجب أن يكون التحليل دقيقاً وواقعياً.
      3. مقدمة تشد القارئ وتوضح أهمية الموضوع للشاب المغربي.
      4. عناوين فرعية واضحة بأسلوب عصري.
      5. نصائح عملية وقابلة للتطبيق.
      6. خاتمة تلخص الموضوع مع دعوة للتفاعل (CTA) لمتابعة جديد "عبدو ويب".
      7. أسلوب الكتابة: مهني، جذاب، وسلس.`,
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
      contents: `بناءً على هذا المحتوى لمدونة عبدو ويب، اقترح 5 عناوين احترافية متوافقة مع السيو (SEO) لجمهور مغربي: ${content.substring(0, 500)}`,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};
