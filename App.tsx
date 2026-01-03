
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Zap, Sun, Moon, ArrowLeft, 
  ShieldCheck, ImageIcon, Users, Lock, DollarSign
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Policies } from './components/Policies.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSettings } from './components/AdSettings.tsx';
import { AdUnit } from './components/AdUnit.tsx';
import { SocialShare } from './components/SocialShare.tsx';
import { View, AdSenseConfig, AdsterraConfig } from './types.ts';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme_mode') !== 'light');
  
  const [adminPassword, setAdminPassword] = useState(() => {
    const saved = localStorage.getItem('admin_password');
    return (saved && saved.length >= 4) ? saved : 'abdou2024';
  });

  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem('total_converted')) || 0);
  const [totalVisitors, setTotalVisitors] = useState(() => Number(localStorage.getItem('total_visitors')) || 0);
  const [baseVisitors, setBaseVisitors] = useState(() => Number(localStorage.getItem('base_visitors')) || 0);
  const [onlineNow, setOnlineNow] = useState(Math.floor(Math.random() * 15) + 8);

  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>(() => {
    const saved = localStorage.getItem('adsense_config');
    return saved ? JSON.parse(saved) : { isEnabled: false, publisherId: '', slotId: '' };
  });

  const [adsterraConfig, setAdsterraConfig] = useState<AdsterraConfig>(() => {
    const saved = localStorage.getItem('adsterra_config');
    return saved ? JSON.parse(saved) : { 
      isEnabled: true, 
      socialBar: '<script src="https://bouncingbuzz.com/15/38/5b/15385b7c751e6c7d59d59fb7f34e2934.js"></script>', 
      popUnder: '<script src="https://bouncingbuzz.com/29/98/27/29982794e86cad0441c5d56daad519bd.js"></script>', 
      banner728x90: '', 
      banner300x250: `<script type="text/javascript">atOptions = {'key' : '0295263cf4ed8d9e3a97b6a2490864ee','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};</script><script type="text/javascript" src="https://bouncingbuzz.com/0295263cf4ed8d9e3a97b6a2490864ee/invoke.js"></script>`
    };
  });

  useEffect(() => {
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
    localStorage.setItem('total_converted', totalConverted.toString());
    localStorage.setItem('base_visitors', baseVisitors.toString());
    
    if (!sessionStorage.getItem('v_tracked_v2')) {
        setTotalVisitors(prev => prev + 1);
        sessionStorage.setItem('v_tracked_v2', 'true');
    }
  }, [isDark, totalConverted, baseVisitors]);

  const handleSaveAds = (configs: { adsense: AdSenseConfig, adsterra: AdsterraConfig }) => {
    setAdsenseConfig(configs.adsense);
    setAdsterraConfig(configs.adsterra);
    localStorage.setItem('adsense_config', JSON.stringify(configs.adsense));
    localStorage.setItem('adsterra_config', JSON.stringify(configs.adsterra));
    setView('admin');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-400 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-[2rem] border ${isDark ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/80 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center text-black shadow-lg">
              <Zap size={18} />
            </div>
            <span className="text-lg md:text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-2">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-lg md:rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className={`p-2.5 rounded-lg md:rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}>
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-24 md:pt-32 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-16 md:space-y-24">
            <section className="text-center pt-4">
              <h1 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 text-glow leading-tight tracking-tighter">
                تحويل الصور <br className="hidden md:block" />
                <span className="text-emerald-500">بجودة احترافية.</span>
              </h1>
              
              <Converter 
                onConversion={() => setTotalConverted(prev => prev + 1)} 
                isDark={isDark}
              />

              <SocialShare isDark={isDark} />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
               <FeatureCard icon={<ShieldCheck size={28}/>} title="أمان مطلق" desc="تتم معالجة الصور داخل جهازك فقط ولا يتم رفعها لأي خادم." isDark={isDark} />
               <FeatureCard icon={<Zap size={28}/>} title="سرعة البرق" desc="استخدم تقنيات المتصفح الحديثة لتحويل الصور في ثوانٍ." isDark={isDark} />
               <FeatureCard icon={<ImageIcon size={28}/>} title="دقة عالية" desc="تحكم في الجودة وصيغ الجيل القادم WebP و AVIF." isDark={isDark} />
            </section>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p === adminPassword) {setIsAuthenticated(true); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up space-y-8">
            <button onClick={() => setView('home')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> العودة للموقع
            </button>
            <AdminPanel 
              isDark={isDark}
              analytics={{
                totalViews: totalConverted,
                totalVisitors: totalVisitors,
                dailyEarnings: [0],
                ctr: "N/A",
                cpc: "Active"
              }}
              onOpenAdSense={() => setView('ads')}
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
                <ArrowLeft size={16} /> العودة للوحة
              </button>
              <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => {localStorage.setItem('admin_password', p); setAdminPassword(p); setView('admin');}} onCancel={() => setView('admin')} onForceResetData={() => {}} />
           </div>
        )}

        {view === 'ads' && isAuthenticated && (
           <div className="animate-slide-up space-y-8">
              <button onClick={() => setView('admin')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
                <ArrowLeft size={16} /> العودة للوحة
              </button>
              <AdSettings adsense={adsenseConfig} adsterra={adsterraConfig} isDark={isDark} onSave={handleSaveAds} onCancel={() => setView('admin')} />
           </div>
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      {/* Footer Area with Ads */}
      <footer className={`border-t py-12 md:py-20 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="mb-12 flex flex-col items-center">
            <div className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-3xl border flex items-center gap-4 md:gap-6 ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
               <div className="flex flex-col items-center">
                  <span className="text-[8px] md:text-[9px] font-black uppercase opacity-20 tracking-widest mb-1">الزوار</span>
                  <span className="text-xl md:text-2xl font-black italic text-emerald-500">{(totalVisitors + baseVisitors).toLocaleString()}</span>
               </div>
               <div className="w-[1px] h-8 md:h-10 bg-emerald-500/10"></div>
               <div className="flex flex-col items-center">
                  <span className="text-[8px] md:text-[9px] font-black uppercase opacity-20 tracking-widest mb-1">الآن</span>
                  <span className="text-xl md:text-2xl font-black italic flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    {onlineNow}
                  </span>
               </div>
            </div>
          </div>
          
          {/* Ads ONLY at the bottom */}
          <div className="mb-16 space-y-6 flex flex-col items-center">
             {adsterraConfig.isEnabled && adsterraConfig.banner300x250 && (
                <AdUnit type="script" code={adsterraConfig.banner300x250} isDark={isDark} className="max-w-[300px]" label="إعلان" />
             )}
             
             {adsterraConfig.isEnabled && adsterraConfig.banner728x90 && (
               <div className="max-w-4xl w-full hidden md:block">
                 <AdUnit type="script" code={adsterraConfig.banner728x90} isDark={isDark} />
               </div>
             )}
          </div>

          <div className={`flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-all">الخصوصية</button>
               <button onClick={() => setView('login')} className="hover:text-emerald-500 transition-all">الإدارة</button>
               <span>© {new Date().getFullYear()} Storehalal Convert</span>
          </div>
        </div>
      </footer>
      
      {adsterraConfig.isEnabled && (
        <div className="hidden">
           {adsterraConfig.popUnder && <AdUnit type="script" code={adsterraConfig.popUnder} isDark={isDark} />}
           {adsterraConfig.socialBar && <AdUnit type="script" code={adsterraConfig.socialBar} isDark={isDark} />}
        </div>
      )}
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, isDark }: any) => (
  <div className={`emerald-card p-8 md:p-10 transition-all duration-500 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/40'}`}>
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 md:mb-8">{icon}</div>
    <h3 className="text-xl md:text-2xl font-black mb-3 italic tracking-tight">{title}</h3>
    <p className="text-xs md:text-sm font-medium opacity-40 leading-relaxed">{desc}</p>
  </div>
);
