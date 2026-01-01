
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, CheckCircle, 
  Link as LinkIcon, Image as ImageIcon, Zap,
  Sun, Moon, ArrowLeft, ShieldCheck,
  HardDrive, Trash2, Facebook, Twitter, 
  MessageCircle, Send, Linkedin, Mail, Share2, DollarSign
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { AdSettings } from './components/AdSettings.tsx';
import { AdUnit } from './components/AdUnit.tsx';
import { Policies } from './components/Policies.tsx';
import { View, AnalyticsData, AdSenseConfig, AdsterraConfig } from './types.ts';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [showAdSettings, setShowAdSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme_mode') !== 'light');
  
  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem('total_converted')) || 0);
  const [totalSavedMB, setTotalSavedMB] = useState(() => Number(localStorage.getItem('total_saved_mb')) || 0);
  
  const [adsense, setAdsense] = useState<AdSenseConfig>(() => JSON.parse(localStorage.getItem('as_cfg') || '{"isEnabled":false,"publisherId":"","slotId":""}'));
  
  // إعدادات Adsterra مع الأكواد التي زودتني بها
  const [adsterra, setAdsterra] = useState<AdsterraConfig>(() => {
    const saved = localStorage.getItem('at_cfg');
    const defaultConfig = {
      isEnabled: true,
      banner728x90: "", // اترك هذا فارغاً ليقوم المستخدم بوضعه من لوحة التحكم إن أراد بانر إضافي
      banner300x250: "",
      socialBar: '<script src="https://bouncingbuzz.com/15/38/5b/15385b7c751e6c7d59d59fb7f34e2934.js"></script>',
      popUnder: '<script src="https://bouncingbuzz.com/29/98/27/29982794e86cad0441c5d56daad519bd.js"></script>'
    };

    if (saved) {
      const parsed = JSON.parse(saved);
      // التأكد من تحديث الأكواد بالأكواد الجديدة حتى لو كان هناك تخزين قديم
      if (!parsed.socialBar || parsed.socialBar.includes('undefined')) {
         return defaultConfig;
      }
      return parsed;
    }
    return defaultConfig;
  });

  const [copySuccess, setCopySuccess] = useState(false);

  // نظام الحقن المباشر في المتصفح لضمان تجاوز الـ Adblock
  useEffect(() => {
    if (adsterra.isEnabled) {
      const injectAdsterraScript = (htmlCode: string, id: string) => {
        if (!htmlCode) return;
        if (document.getElementById(id)) return;

        const match = htmlCode.match(/src="([^"]+)"/);
        if (match && match[1]) {
          const script = document.createElement('script');
          script.src = match[1];
          script.id = id;
          script.async = true;
          // إضافة سمة للتعرف على السكريبت كإعلان موثوق
          script.setAttribute('data-ad-client', 'adsterra');
          document.head.appendChild(script);
          console.log(`Adsterra Script Injected: ${id}`);
        }
      };

      injectAdsterraScript(adsterra.socialBar, 'at-social-bar');
      injectAdsterraScript(adsterra.popUnder, 'at-pop-under');
    }
  }, [adsterra.isEnabled, adsterra.socialBar, adsterra.popUnder]);

  useEffect(() => {
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
    localStorage.setItem('as_cfg', JSON.stringify(adsense));
    localStorage.setItem('at_cfg', JSON.stringify(adsterra));
    localStorage.setItem('total_converted', totalConverted.toString());
    localStorage.setItem('total_saved_mb', totalSavedMB.toString());
  }, [isDark, adsense, adsterra, totalConverted, totalSavedMB]);

  const handleConversionSuccess = (savedKB: number) => {
    setTotalConverted(prev => prev + 1);
    setTotalSavedMB(prev => prev + (savedKB / 1024));
  };

  const siteUrl = "https://storehalal.shop";
  const shareText = "أداة Storehalal Convert الرائعة لتحويل الصور وتغيير مقاساتها فوراً في المتصفح بخصوصية تامة!";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-400 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6 lg:pt-10">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[2.5rem] border ${isDark ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/80 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => {setView('home'); setShowAdSettings(false);}} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={18} />
            </div>
            <span className="text-lg md:text-2xl font-black italic tracking-tighter truncate">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 md:p-3.5 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Sun size={18} className="rotate-180" />}
             </button>
             <button 
               onClick={() => setView(isAuthenticated ? 'admin' : 'login')}
               className={`p-2.5 md:p-3.5 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}
             >
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 pt-28 md:pt-40 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-12">
            
            {/* إعلان البانر العلوي - يظهر فقط إذا قمت بوضع كود البانر في لوحة التحكم */}
            {adsterra.isEnabled && adsterra.banner728x90 && (
              <AdUnit type="banner" code={adsterra.banner728x90} isDark={isDark} label="إعلان ممول" />
            )}

            <section className="text-center px-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 md:mb-10">
                <Zap size={14} className="text-emerald-500" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-500">معالجة فورية وآمنة تماماً</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic mb-6 md:mb-8 text-glow leading-[1.1] tracking-tighter">
                أداة تحويل الصور <br className="hidden sm:block" />
                <span className="text-emerald-500">بجودة هندسية.</span>
              </h1>
              
              <p className={`max-w-2xl mx-auto italic font-medium leading-relaxed mb-10 md:mb-16 px-4 text-sm md:text-lg ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>
                تحويل الصور وتغيير مقاساتها مجاناً وبدون رفعها لأي سيرفر. نستخدم تقنيات الويب الحديثة لضمان بقاء بياناتك على جهازك.
              </p>
              
              <Converter onConversion={handleConversionSuccess} isDark={isDark} />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 pt-10">
               <FeatureCard icon={<ShieldCheck size={28}/>} title="خصوصية 100%" desc="صورك لا تغادر جهازك أبداً. تتم المعالجة محلياً في المتصفح." isDark={isDark} />
               <FeatureCard icon={<Zap size={28}/>} title="أرشفة أسرع" desc="صيغة WebP تحسن سرعة موقعك بنسبة كبيرة وتساعدك في تصدر نتائج البحث." isDark={isDark} />
               <FeatureCard icon={<ImageIcon size={28}/>} title="تحكم هندسي" desc="أدوات دقيقة لقص وتدوير وتغيير مقاسات الصور بدقة عالية." isDark={isDark} />
            </section>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p === 'abdou2024') {setIsAuthenticated(true); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up space-y-8">
            <div className="flex justify-between items-center">
              <button onClick={() => {setView('home'); setShowAdSettings(false);}} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
                <ArrowLeft size={16} /> العودة للمحول
              </button>
              <button 
                onClick={() => setShowAdSettings(!showAdSettings)}
                className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 border transition-all ${showAdSettings ? 'bg-emerald-500 text-black border-transparent' : 'border-emerald-500/20 text-emerald-500'}`}
              >
                <DollarSign size={16} /> إعدادات الربح
              </button>
            </div>

            {showAdSettings ? (
              <AdSettings 
                adsense={adsense} 
                adsterra={adsterra} 
                isDark={isDark} 
                onSave={({adsense: as, adsterra: at}) => { setAdsense(as); setAdsterra(at); setShowAdSettings(false); }}
                onCancel={() => setShowAdSettings(false)}
              />
            ) : (
              <AdminPanel 
                isDark={isDark}
                analytics={{
                  totalViews: totalConverted,
                  dailyEarnings: [0],
                  ctr: `${totalSavedMB.toFixed(1)} MB`,
                  cpc: "Active"
                }}
                onOpenAdSense={() => setShowAdSettings(true)}
                onOpenSecurity={() => {}} 
                onSyncData={() => {}}
                posts={[]}
                onNewPost={() => {}} 
                onEditPost={() => {}}
                onDeletePost={() => {}}
                baseVisitors={0}
                onUpdateBaseVisitors={() => {}}
              />
            )}
          </div>
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      <footer className={`border-t py-12 md:py-20 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 onClick={() => setView('home')} className="text-2xl md:text-3xl font-black italic tracking-tighter cursor-pointer inline-block">Storehalal <span className="text-emerald-500">Convert</span></h2>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Image SEO Toolkit</p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-16">
                 <SocialShareBtn href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`} icon={<MessageCircle size={22} />} color="hover:bg-[#25D366]" isDark={isDark} label="WhatsApp" />
                 <SocialShareBtn href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`} icon={<Facebook size={22} />} color="hover:bg-[#1877F2]" isDark={isDark} label="Facebook" />
                 <SocialShareBtn href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`} icon={<Twitter size={22} />} color="hover:bg-[#000000]" isDark={isDark} label="X" />
                 <button onClick={() => { navigator.clipboard.writeText(siteUrl); setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }} className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all ${copySuccess ? 'bg-emerald-500 text-black' : 'text-emerald-500 border-emerald-500/20'}`}>
                   {copySuccess ? <CheckCircle size={22} /> : <LinkIcon size={22} />}
                 </button>
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

const SocialShareBtn = ({ href, icon, color, isDark, label }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" title={label} className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all ${isDark ? `bg-emerald-500/5 border-emerald-500/20 text-emerald-500 ${color} hover:text-white` : `bg-emerald-50 border-emerald-200 text-emerald-600 ${color} hover:text-white`}`}>{icon}</a>
);
