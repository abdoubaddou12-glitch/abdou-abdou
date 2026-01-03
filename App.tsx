
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, CheckCircle, 
  ImageIcon, Zap, Sun, Moon, ArrowLeft, 
  ShieldCheck, MessageCircle, Facebook, Twitter, Link as LinkIcon,
  Users, Activity
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Policies } from './components/Policies.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { View } from './types.ts';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme_mode') !== 'light');
  
  // نظام كلمة السر المحسن: استعادة من الذاكرة أو استخدام الافتراضية
  const [adminPassword, setAdminPassword] = useState(() => {
    const saved = localStorage.getItem('admin_password');
    return saved && saved.length >= 4 ? saved : 'abdou2024';
  });

  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem('total_converted')) || 0);
  const [totalVisitors, setTotalVisitors] = useState(() => Number(localStorage.getItem('total_visitors')) || 0);
  const [baseVisitors, setBaseVisitors] = useState(() => Number(localStorage.getItem('base_visitors')) || 0);
  const [onlineNow, setOnlineNow] = useState(12);

  const [copySuccess, setCopySuccess] = useState(false);

  // نظام تتبع الزوار الذكي
  useEffect(() => {
    const isNewSession = !sessionStorage.getItem('session_active');
    if (isNewSession) {
      const newTotal = totalVisitors + 1;
      setTotalVisitors(newTotal);
      localStorage.setItem('total_visitors', newTotal.toString());
      sessionStorage.setItem('session_active', 'true');
    }

    const updateOnline = () => {
      const hour = new Date().getHours();
      let baseOnline = 15;
      if (hour >= 18 && hour <= 23) baseOnline = 45;
      else if (hour >= 3 && hour <= 7) baseOnline = 5;
      const fluctuation = Math.floor(Math.random() * 10) - 5;
      setOnlineNow(Math.max(3, baseOnline + fluctuation));
    };

    updateOnline();
    const interval = setInterval(updateOnline, 15000);
    return () => clearInterval(interval);
  }, [totalVisitors]);

  // تحديث الإعدادات العامة (بدون كلمة السر لمنع التداخل)
  useEffect(() => {
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
    localStorage.setItem('total_converted', totalConverted.toString());
    localStorage.setItem('base_visitors', baseVisitors.toString());
  }, [isDark, totalConverted, baseVisitors]);

  const handleConversionSuccess = (savedKB: number) => {
    setTotalConverted(prev => prev + 1);
  };

  // وظيفة الحفظ الفوري لكلمة السر
  const handlePasswordUpdate = (newPass: string) => {
    if (newPass && newPass.length >= 4) {
      localStorage.setItem('admin_password', newPass); // حفظ فوري في الذاكرة الدائمة
      setAdminPassword(newPass); // تحديث الحالة في التطبيق
      setView('admin');
      alert('تم تحديث كلمة السر بنجاح وستبقى ثابتة حتى بعد التحديث.');
    }
  };

  const siteUrl = "https://storehalal.shop";
  const shareText = "أداة Storehalal Convert الاحترافية لتحويل الصور ومعالجتها فوراً بخصوصية تامة!";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-400 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-[2rem] border ${isDark ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/80 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:rotate-180 transition-transform duration-500">
              <Zap size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter truncate">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                {onlineNow} متواجد الآن
             </div>
             <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button 
               onClick={() => setView(isAuthenticated ? 'admin' : 'login')}
               className={`p-3 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}
             >
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-6 pt-32 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-20">
            <section className="text-center pt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <Zap size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">معالجة محلية 100%</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic mb-8 text-glow leading-tight tracking-tighter">
                تحويل الصور <br />
                <span className="text-emerald-500">بجودة هندسية.</span>
              </h1>
              <p className={`max-w-2xl mx-auto italic font-medium leading-relaxed mb-16 text-lg ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>
                الأداة الأكثر أماناً لتحويل مقاسات وصيغ صورك مباشرة في المتصفح. لا يتم رفع أي ملفات لسيرفراتنا، خصوصيتك هي أولويتنا.
              </p>
              <Converter onConversion={handleConversionSuccess} isDark={isDark} />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard icon={<ShieldCheck size={28}/>} title="أمان مطلق" desc="تتم معالجة الصور داخل جهازك فقط، مما يضمن عدم اطلاع أي طرف ثالث على محتواك." isDark={isDark} />
               <FeatureCard icon={<Zap size={28}/>} title="سرعة البرق" desc="نستخدم تقنيات الويب الحديثة لضمان تحويل الصور في أجزاء من الثانية." isDark={isDark} />
               <FeatureCard icon={<ImageIcon size={28}/>} title="دقة عالية" desc="تحكم كامل في الأبعاد، الجودة، والقص للحصول على أفضل نسخة من صورك." isDark={isDark} />
            </section>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p === adminPassword) {setIsAuthenticated(true); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up space-y-8">
            <button onClick={() => setView('home')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> العودة للمحول
            </button>
            <AdminPanel 
              isDark={isDark}
              analytics={{
                totalViews: totalConverted,
                totalVisitors: totalVisitors + baseVisitors,
                dailyEarnings: [0],
                ctr: "N/A",
                cpc: "Active"
              }}
              posts={[]} 
              onNewPost={() => {}}
              onEditPost={() => {}}
              onDeletePost={() => {}}
              onOpenAdSense={() => {}}
              onOpenSecurity={() => setView('security')} 
              onSyncData={() => {}}
              baseVisitors={baseVisitors}
              onUpdateBaseVisitors={(val) => setBaseVisitors(val)}
            />
          </div>
        )}

        {view === 'security' && isAuthenticated && (
           <div className="animate-slide-up space-y-8">
              <button onClick={() => setView('admin')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
                <ArrowLeft size={16} /> العودة للوحة التحكم
              </button>
              <SecuritySettings 
                isDark={isDark}
                currentSavedPassword={adminPassword}
                onSave={handlePasswordUpdate}
                onCancel={() => setView('admin')}
                onForceResetData={() => {}}
              />
           </div>
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      <footer className={`border-t py-16 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 onClick={() => setView('home')} className="text-2xl md:text-3xl font-black italic tracking-tighter cursor-pointer inline-block">Storehalal <span className="text-emerald-500">Convert</span></h2>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Image SEO Toolkit</p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-16">
                 <SocialShareBtn href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`} icon={<MessageCircle size={22} />} color="hover:bg-[#25D366]" isDark={isDark} />
                 <SocialShareBtn href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`} icon={<Facebook size={22} />} color="hover:bg-[#1877F2]" isDark={isDark} />
                 <SocialShareBtn href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`} icon={<Twitter size={22} />} color="hover:bg-[#000000]" isDark={isDark} />
                 <button onClick={() => { navigator.clipboard.writeText(siteUrl); setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }} className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${copySuccess ? 'bg-emerald-500 text-black' : 'text-emerald-500 border-emerald-500/20'}`}>
                   {copySuccess ? <CheckCircle size={22} /> : <LinkIcon size={22} />}
                 </button>
          </div>

          <div className="mb-12 flex flex-col items-center">
            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
               <div className="flex flex-col items-start">
                  <span className="text-[8px] font-black uppercase opacity-30 tracking-widest">إجمالي الزيارات</span>
                  <span className="text-xl font-black italic tracking-tighter text-emerald-500">{(totalVisitors + baseVisitors).toLocaleString()}</span>
               </div>
               <div className="w-[1px] h-8 bg-white/10"></div>
               <div className="flex flex-col items-end text-right">
                  <span className="text-[8px] font-black uppercase opacity-30 tracking-widest">المتصلون الآن</span>
                  <span className="text-xl font-black italic tracking-tighter flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    {onlineNow}
                  </span>
               </div>
            </div>
          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDark ? 'border-white/5' : 'border-zinc-100'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop</p>
            <div className={`flex flex-wrap justify-center md:justify-end gap-6 text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
               <button onClick={() => setView('home')} className="hover:text-emerald-500">المحول</button>
               <button onClick={() => setView('policies')} className="hover:text-emerald-500">الخصوصية</button>
               <button onClick={() => setView('login')} className="hover:text-emerald-500">الإدارة</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, isDark }: any) => (
  <div className={`emerald-card p-8 group transition-all ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-black mb-4 italic tracking-tight">{title}</h3>
    <p className="text-sm font-medium opacity-40 leading-relaxed">{desc}</p>
  </div>
);

const SocialShareBtn = ({ href, icon, color, isDark }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${isDark ? `bg-emerald-500/5 border-emerald-500/20 text-emerald-500 ${color} hover:text-white` : `bg-emerald-50 border-emerald-200 text-emerald-600 ${color} hover:text-white`}`}>{icon}</a>
);
