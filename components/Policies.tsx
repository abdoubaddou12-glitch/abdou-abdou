
import React from 'react';
import { ShieldCheck, FileText, Lock, Globe, ArrowLeft } from 'lucide-react';

interface PoliciesProps {
  isDark: boolean;
  onBack: () => void;
}

export const Policies: React.FC<PoliciesProps> = ({ isDark, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-slide-up px-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-10 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={16} /> العودة للمحول
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic mb-4 tracking-tighter text-glow">السياسات والقوانين</h1>
        <p className="opacity-40 font-bold uppercase tracking-widest text-xs">نحن نلتزم بحماية بياناتك وتقديم خدمة شفافة</p>
      </div>

      <div className="space-y-12">
        {/* Privacy Policy */}
        <section className={`emerald-card p-8 md:p-12 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-black italic">سياسة الخصوصية</h2>
          </div>
          <div className="space-y-6 text-sm font-medium leading-relaxed opacity-70">
            <p>في <strong>Storehalal Convert</strong>، نضع خصوصية المستخدم على رأس أولوياتنا. إليك كيف نتعامل مع بياناتك:</p>
            <ul className="list-disc pr-6 space-y-3">
              <li><strong>المعالجة المحلية:</strong> يتم تحويل ومعالجة جميع الصور داخل متصفحك مباشرة. نحن لا نقوم برفع صورك إلى أي خادم (Server) خاص بنا أو لجهة خارجية.</li>
              <li><strong>البيانات الشخصية:</strong> لا تطلب الأداة أي معلومات شخصية أو تسجيل حساب لاستخدام ميزات التحويل الأساسية.</li>
              <li><strong>ملفات تعريف الارتباط:</strong> نستخدم ملفات تعريف الارتباط التقنية فقط لحفظ تفضيلاتك مثل (الوضع الليلي) وإحصائيات الاستخدام المجهولة لتحسين الخدمة.</li>
            </ul>
          </div>
        </section>

        {/* Terms of Service */}
        <section className={`emerald-card p-8 md:p-12 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black italic">شروط الاستخدام</h2>
          </div>
          <div className="space-y-6 text-sm font-medium leading-relaxed opacity-70">
            <p>باستخدامك لموقعنا، فإنك توافق على الشروط التالية:</p>
            <ul className="list-disc pr-6 space-y-3">
              <li><strong>الاستخدام العادل:</strong> الأداة مقدمة للاستخدام الشخصي والتجاري القانوني. يمنع استخدام الأداة في أي نشاط يضر بالبنية التحتية للموقع.</li>
              <li><strong>إخلاء المسؤولية:</strong> بينما نسعى لتقديم أفضل جودة تحويل، فإننا غير مسؤولين عن أي فقدان في جودة الصور أو البيانات ناتج عن سوء الاستخدام أو مشاكل في المتصفح.</li>
              <li><strong>التعديلات:</strong> نحتفظ بالحق في تعديل هذه الشروط أو ميزات الأداة في أي وقت لضمان استمرارية الخدمة.</li>
            </ul>
          </div>
        </section>

        {/* Security Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-8 rounded-[2rem] border flex items-start gap-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-lg'}`}>
            <Lock className="text-emerald-500 shrink-0" size={24} />
            <div>
              <h4 className="font-black mb-2 text-sm">تشفير كامل</h4>
              <p className="text-[11px] opacity-40 leading-relaxed font-bold uppercase tracking-tight">يتم حماية اتصالك بالموقع عبر بروتوكول SSL العالمي لضمان أمان التصفح.</p>
            </div>
          </div>
          <div className={`p-8 rounded-[2rem] border flex items-start gap-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-lg'}`}>
            <Globe className="text-emerald-500 shrink-0" size={24} />
            <div>
              <h4 className="font-black mb-2 text-sm">توافق عالمي</h4>
              <p className="text-[11px] opacity-40 leading-relaxed font-bold uppercase tracking-tight">نحن نلتزم بالمعايير الدولية لحماية البيانات (GDPR) في طريقة معالجة المدخلات.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
        آخر تحديث: مايو 2024
      </div>
    </div>
  );
};
