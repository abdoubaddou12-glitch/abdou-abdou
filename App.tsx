
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, Settings, 
  BarChart3, Lock, CheckCircle, Link as LinkIcon, 
  Image as ImageIcon, Download, Sliders, Zap,
  Sun, Moon, ArrowLeft, History, ShieldCheck,
  HardDrive, ZapOff, Trash2, Facebook, Twitter, 
  MessageCircle, Send, Linkedin
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Policies } from './components/Policies.tsx';
import { View, AnalyticsData } from './types.ts';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? saved === 'dark' : true;
  });
  
  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem('total_converted')) || 0);
  const [totalSavedMB, setTotalSavedMB] = useState(() => Number(localStorage.getItem('total_saved_mb')) || 0);
  const [adminPassword] = useState(() => localStorage.getItem('emerald_admin_pass') || 'abdou2024');
  
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme_mode', 'light');
    }
    localStorage.setItem('total_converted', totalConverted.toString());
    localStorage.setItem('total_saved_mb', totalSavedMB.toString());
  }, [isDark, totalConverted, totalSavedMB]);

  const handleAdminLogin = (pass: string) => {
    if (pass === adminPassword) {
      setIsAuthenticated(true);
      setView('admin');
      return true;
    }
    return false;
  };

  const handleConversionSuccess = (savedKB: number) => {
    setTotalConverted(prev => prev + 1);
    setTotalSavedMB(prev => prev + (savedKB / 1024));
  };

  const analytics: AnalyticsData = {
    totalViews: totalConverted,
    liveVisitors: Math.floor(Math.random() * 10) + 1,
    dailyEarnings: [totalConverted * 0.1, totalConverted * 0.15, totalConverted * 0.05, totalConverted * 0.2],
    ctr: `${(totalSavedMB).toFixed(1)} MB`,
    cpc: 'High'
  };

  const siteUrl = "https://storehalal.shop";
  const shareText = "أداة Storehalal Convert الرائعة لتحويل الصور وتغيير مقاساتها فوراً في المتصفح! جربها الآن:";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-400 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      {/* Navigation - Sticky on mobile for better UX */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6 lg:pt-10">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[2.5rem] border ${isDark ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/80 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={18} className="md:w-6 md:h-6" />
            </div>
            <span className="text-lg md:text-2xl font-black italic tracking-tighter truncate">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
             {/* Stats Hidden on small phones to save space */}
             <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex flex-col items-center">
                  <span className="text-[7px] md:text-[8px] font-black opacity-40 uppercase">التحويلات</span>
                  <span className="text-xs font-black text-emerald-500">{totalConverted}</span>
                </div>
                <div className="w-[1px] h-6 bg-emerald-500/20"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[7px] md:text-[8px] font-black opacity-40 uppercase">توفير</span>
                  <span className="text-xs font-black text-emerald-500">{totalSavedMB.toFixed(1)}M</span>
                </div>
             </div>

             <button 
                onClick={() => setIsDark(!isDark)}
                aria-label="تبديل الوضع"
                className={`p-2.5 md:p-3.5 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500 hover:bg-zinc-800' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
             >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             <button 
               onClick={() => setView(isAuthenticated ? 'admin' : 'login')}
               aria-label="لوحة التحكم"
               className={`p-2.5 md:p-3.5 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}
             >
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Added padding top to account for fixed nav */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 pt-28 md:pt-40 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-16 md:space-y-32">
            <section className="text-center px-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 md:mb-10">
                <Zap size={14} className="text-emerald-500" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-500">معالجة فورية وآمنة تماماً</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic mb-6 md:mb-8 text-glow leading-[1.1] tracking-tighter">
                تحويل الصور لـ WebP <br className="hidden sm:block" />
                <span className="text-emerald-500">بجودة احترافية.</span>
              </h1>
              
              <p className={`max-w-2xl mx-auto italic font-medium leading-relaxed mb-10 md:mb-16 px-4 text-sm md:text-lg ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>
                استخدم Storehalal Convert لتحويل الصور وتغيير مقاساتها مجاناً وبدون رفعها لأي سيرفر. خصوصيتك هي محركنا الأساسي في كل سطر برمجنا به هذه الأداة.
              </p>
              
              <Converter onConversion={handleConversionSuccess} isDark={isDark} />
            </section>

            {/* Features Grid - Improved for all screens */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 pt-10">
               <FeatureCard 
                icon={<ShieldCheck size={28}/>} 
                title="خصوصية 100%" 
                desc="صورك لا تغادر جهازك أبداً. تتم المعالجة محلياً في المتصفح باستخدام تقنيات حديثة." 
                isDark={isDark} 
               />
               <FeatureCard 
                icon={<Zap size={28}/>} 
                title="أرشفة أسرع" 
                desc="صيغة WebP تحسن سرعة موقعك بنسبة كبيرة وتساعدك في تصدر نتائج البحث بجدارة." 
                isDark={isDark} 
               />
               <FeatureCard 
                icon={<ImageIcon size={28}/>} 
                title="تحكم هندسي" 
                desc="أدوات دقيقة لقص وتدوير وتغيير مقاسات الصور بدقة عالية مع الحفاظ على الألوان." 
                isDark={isDark} 
               />
            </section>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={handleAdminLogin} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up">
            <button onClick={() => setView('home')} className="flex items-center gap-2 mb-10 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> العودة للمحول الذكي
            </button>
            <AdminPanel 
              posts={[]}
              isDark={isDark}
              analytics={analytics}
              onNewPost={() => {}} 
              onEditPost={() => {}}
              onDeletePost={() => {}}
              onOpenAdSense={() => {}}
              onOpenSecurity={() => {}}
              onSyncData={() => {}}
            />
          </div>
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      {/* Footer - Optimized spacing and layout */}
      <footer className={`border-t py-12 md:py-20 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10 md:mb-12">
            <h2 onClick={() => setView('home')} className="text-2xl md:text-3xl font-black italic tracking-tighter cursor-pointer inline-block">
              Storehalal <span className="text-emerald-500">Convert</span>
            </h2>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Image SEO Toolkit</p>
          </div>

          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">شارك الأداة لدعم استمراريتنا</span>
            <div className="flex justify-center flex-wrap gap-3 md:gap-5">
               <SocialShareBtn 
                 href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`}
                 icon={<MessageCircle size={22} />} 
                 label="واتساب"
                 color="hover:bg-green-500"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`}
                 icon={<Facebook size={22} />} 
                 label="فيسبوك"
                 color="hover:bg-blue-600"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`}
                 icon={<Twitter size={22} />} 
                 label="تويتر"
                 color="hover:bg-sky-500"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(siteUrl)}`}
                 icon={<Linkedin size={22} />} 
                 label="لينكد إن"
                 color="hover:bg-blue-700"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`}
                 icon={<Send size={22} />} 
                 label="تليجرام"
                 color="hover:bg-sky-600"
                 isDark={isDark}
               />
               <button 
                 onClick={copyToClipboard} 
                 aria-label="نسخ رابط الموقع"
                 className={`w-11 h-11 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all group relative ${
                   copySuccess 
                    ? 'bg-emerald-500 border-transparent text-black shadow-lg shadow-emerald-500/40' 
                    : isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                 }`}
               >
                 {copySuccess ? <CheckCircle size={22} /> : <LinkIcon size={22} />}
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest whitespace-nowrap">
                    {copySuccess ? 'تم النسخ!' : 'نسخ الرابط'}
                 </span>
               </button>
            </div>
          </div>

          <div className={`mt-16 md:mt-24 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDark ? 'border-white/5' : 'border-zinc-100'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-center md:text-right ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
              جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop
            </p>
            <div className={`flex flex-wrap justify-center md:justify-end gap-6 md:gap-10 text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
               <button onClick={() => setView('home')} className="hover:text-emerald-500 transition-colors">تحويل الصور</button>
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-colors">سياسة الخصوصية</button>
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-colors">شروط الخدمة</button>
               <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className="hover:text-emerald-500 transition-colors">الأمان</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, isDark }: any) => (
  <div className={`emerald-card p-8 md:p-12 group hover:border-emerald-500/30 transition-all ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-black mb-4 italic tracking-tight">{title}</h3>
    <p className="text-sm md:text-base font-medium opacity-40 leading-relaxed">{desc}</p>
  </div>
);

const SocialShareBtn = ({ href, icon, label, color, isDark }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={`مشاركة عبر ${label}`}
    className={`w-11 h-11 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all group relative ${
      isDark 
        ? `bg-emerald-500/5 border-emerald-500/20 text-emerald-500 ${color} hover:text-white hover:border-transparent` 
        : `bg-emerald-50 border-emerald-200 text-emerald-600 ${color} hover:text-white hover:border-transparent`
    }`}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest whitespace-nowrap">
      {label}
    </span>
  </a>
);
