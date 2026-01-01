
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
      {/* Navigation */}
      <nav className="pt-6 md:pt-10 px-4 md:px-6 z-50">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-3xl border ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-emerald-500/20 bg-white/70 shadow-lg'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-4 ml-6 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-black opacity-40 uppercase">التحويلات</span>
                  <span className="text-xs font-black text-emerald-500">{totalConverted}</span>
                </div>
                <div className="w-[1px] h-6 bg-emerald-500/20"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-black opacity-40 uppercase">توفير مساحة</span>
                  <span className="text-xs font-black text-emerald-500">{totalSavedMB.toFixed(1)} MB</span>
                </div>
             </div>

             <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500 hover:bg-zinc-800' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
             >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             <button 
               onClick={() => setView(isAuthenticated ? 'admin' : 'login')}
               className={`p-3 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}
             >
               <LayoutDashboard size={20} />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-16 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-24">
            <section className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <Zap size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">معالجة فورية في المتصفح</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic mb-6 text-glow leading-tight">مركز تحويل الصور <br/><span className="text-emerald-500">فائق السرعة.</span></h1>
              <p className={`max-w-2xl mx-auto italic font-medium leading-relaxed mb-12 ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>
                قم بتحويل وتغيير مقاسات صورك بضغطة واحدة. نحن لا نرفع صورك إلى أي خادم، خصوصيتك هي الأولوية.
              </p>
              
              <Converter onConversion={handleConversionSuccess} isDark={isDark} />
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
               <FeatureCard 
                icon={<ShieldCheck size={24}/>} 
                title="خصوصية 100%" 
                desc="تتم جميع العمليات داخل متصفحك مباشرة دون الحاجة لرفع الصور." 
                isDark={isDark} 
               />
               <FeatureCard 
                icon={<Zap size={24}/>} 
                title="أداء WebP" 
                desc="حول صورك إلى صيغة WebP لتقليل حجم موقعك بنسبة تصل إلى 80%." 
                isDark={isDark} 
               />
               <FeatureCard 
                icon={<ImageIcon size={24}/>} 
                title="تغيير الأشكال" 
                desc="قص دائري، تدوير، إضافة علامة مائية، وتحكم كامل في الأبعاد." 
                isDark={isDark} 
               />
            </section>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={handleAdminLogin} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up">
            <button onClick={() => setView('home')} className="flex items-center gap-2 mb-8 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> العودة للمحول
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
      </main>

      {/* Footer */}
      <footer className={`border-t py-16 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Browser-Based Image Toolkit</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">شارك الأداة مع أصدقائك</h4>
            <div className="flex justify-center flex-wrap gap-4">
               <SocialShareBtn 
                 href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`}
                 icon={<MessageCircle size={20} />} 
                 label="واتساب"
                 color="hover:bg-green-500"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`}
                 icon={<Facebook size={20} />} 
                 label="فيسبوك"
                 color="hover:bg-blue-600"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`}
                 icon={<Twitter size={20} />} 
                 label="تويتر"
                 color="hover:bg-sky-500"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(siteUrl)}`}
                 icon={<Linkedin size={20} />} 
                 label="لينكد إن"
                 color="hover:bg-blue-700"
                 isDark={isDark}
               />
               <SocialShareBtn 
                 href={`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`}
                 icon={<Send size={20} />} 
                 label="تليجرام"
                 color="hover:bg-sky-600"
                 isDark={isDark}
               />
               <button 
                 onClick={copyToClipboard} 
                 className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all group relative ${
                   copySuccess 
                    ? 'bg-emerald-500 border-transparent text-black shadow-lg shadow-emerald-500/40' 
                    : isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                 }`}
               >
                 {copySuccess ? <CheckCircle size={20} /> : <LinkIcon size={20} />}
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest whitespace-nowrap">
                    {copySuccess ? 'تم النسخ!' : 'نسخ الرابط'}
                 </span>
               </button>
            </div>
          </div>

          <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? 'border-white/5' : 'border-zinc-100'}`}>
            <p className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
              جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop
            </p>
            <div className={`flex gap-8 text-[9px] font-black uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
               <button onClick={() => setView('home')} className="hover:text-emerald-500 transition-colors">المحول الذكي</button>
               <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className="hover:text-emerald-500 transition-colors">لوحة الأداء</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, isDark }: any) => (
  <div className={`emerald-card p-10 group hover:border-emerald-500/30 transition-all ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-black mb-4 italic">{title}</h3>
    <p className="text-sm font-medium opacity-40 leading-relaxed">{desc}</p>
  </div>
);

const SocialShareBtn = ({ href, icon, label, color, isDark }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all group relative ${
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
