
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, Settings, 
  BarChart3, Lock, CheckCircle, Link as LinkIcon, 
  Image as ImageIcon, Download, Sliders, Zap,
  Sun, Moon, ArrowLeft, History, ShieldCheck,
  HardDrive, ZapOff, Trash2
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
    totalViews: totalConverted, // نستخدمها هنا كعدد عمليات التحويل
    liveVisitors: Math.floor(Math.random() * 10) + 1,
    dailyEarnings: [totalConverted * 0.1, totalConverted * 0.15, totalConverted * 0.05, totalConverted * 0.2], // افتراضي
    ctr: `${(totalSavedMB).toFixed(1)} MB`, // نستخدمها لعرض المساحة الموفرة
    cpc: 'High'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
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
              posts={[]} // لا توجد مقالات الآن
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
          <span className="text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Browser-Based Image Toolkit</p>
          <div className="mt-8 flex justify-center gap-6">
             <button onClick={copyToClipboard} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${copySuccess ? 'text-emerald-500' : 'opacity-40 hover:opacity-100'}`}>
               <LinkIcon size={14} /> {copySuccess ? 'تم النسخ!' : 'نسخ رابط الأداة'}
             </button>
          </div>
          <div className={`mt-12 pt-8 border-t text-[10px] font-bold uppercase tracking-widest ${isDark ? 'border-white/5 opacity-10' : 'border-zinc-100 text-zinc-300'}`}>
            جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop
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
