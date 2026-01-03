
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, CheckCircle, 
  ImageIcon, Zap, Sun, Moon, ArrowLeft, 
  ShieldCheck, MessageCircle, Facebook, Twitter, Link as LinkIcon,
  Users, Activity, DollarSign, Newspaper, PlusCircle
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Policies } from './components/Policies.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSettings } from './components/AdSettings.tsx';
import { AdUnit } from './components/AdUnit.tsx';
import { PostCard } from './components/PostCard.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { View, AdSenseConfig, AdsterraConfig, Post } from './types.ts';

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
  const [onlineNow, setOnlineNow] = useState(12);

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('blog_posts');
    return saved ? JSON.parse(saved) : [];
  });

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
      banner300x250: `<script type="text/javascript">
	atOptions = {
		'key' : '0295263cf4ed8d9e3a97b6a2490864ee',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://bouncingbuzz.com/0295263cf4ed8d9e3a97b6a2490864ee/invoke.js"></script>`
    };
  });

  useEffect(() => {
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
    localStorage.setItem('total_converted', totalConverted.toString());
    localStorage.setItem('base_visitors', baseVisitors.toString());
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }, [isDark, totalConverted, baseVisitors, posts]);

  const handleSaveAds = (configs: { adsense: AdSenseConfig, adsterra: AdsterraConfig }) => {
    setAdsenseConfig(configs.adsense);
    setAdsterraConfig(configs.adsterra);
    localStorage.setItem('adsense_config', JSON.stringify(configs.adsense));
    localStorage.setItem('adsterra_config', JSON.stringify(configs.adsterra));
    setView('admin');
    alert('تم الحفظ وتحديث نظام الإعلانات.');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-400 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      <nav className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-[2rem] border ${isDark ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/80 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg group-hover:rotate-180 transition-transform duration-500">
              <Zap size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter truncate">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className={`p-3 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}>
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-6 pt-32 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up space-y-20">
            <section className="text-center pt-10">
              <h1 className="text-5xl md:text-8xl font-black italic mb-8 text-glow leading-tight tracking-tighter">
                تحويل الصور <br />
                <span className="text-emerald-500">بجودة هندسية.</span>
              </h1>
              
              <Converter 
                onConversion={(kb) => setTotalConverted(prev => prev + 1)} 
                isDark={isDark} 
              />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard icon={<ShieldCheck size={28}/>} title="أمان مطلق" desc="تتم معالجة الصور داخل جهازك فقط." isDark={isDark} />
               <FeatureCard icon={<Zap size={28}/>} title="سرعة البرق" desc="تحويل الصور في أجزاء من الثانية." isDark={isDark} />
               <FeatureCard icon={<ImageIcon size={28}/>} title="دقة عالية" desc="تحكم كامل في الأبعاد والجودة." isDark={isDark} />
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
                totalVisitors: totalVisitors + baseVisitors,
                dailyEarnings: [0],
                ctr: "N/A",
                cpc: "Active"
              }}
              posts={posts} 
              onNewPost={() => alert('ميزة المقالات قيد التطوير')}
              onEditPost={() => {}}
              onDeletePost={() => {}}
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
                <ArrowLeft size={16} /> العودة للوحة التحكم
              </button>
              <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => {localStorage.setItem('admin_password', p); setAdminPassword(p); setView('admin');}} onCancel={() => setView('admin')} onForceResetData={() => {}} />
           </div>
        )}

        {view === 'ads' && isAuthenticated && (
           <div className="animate-slide-up space-y-8">
              <button onClick={() => setView('admin')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs">
                <ArrowLeft size={16} /> العودة للوحة التحكم
              </button>
              <AdSettings adsense={adsenseConfig} adsterra={adsterraConfig} isDark={isDark} onSave={handleSaveAds} onCancel={() => setView('admin')} />
           </div>
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      <footer className={`border-t py-16 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          {/* Adsterra Social Bar - Floating Script Implementation */}
          {adsterraConfig.isEnabled && adsterraConfig.socialBar && (
            <div className="ad-social-bar hidden">
              <AdUnit type="script" code={adsterraConfig.socialBar} isDark={isDark} />
            </div>
          )}

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
          
          {/* Adsterra 300x250 Banner - Centered Footer Ad */}
          <div className="mb-16 flex flex-col items-center">
             {adsterraConfig.isEnabled && adsterraConfig.banner300x250 && (
               <div className="max-w-[300px] w-full">
                 <AdUnit 
                   type="script" 
                   code={adsterraConfig.banner300x250} 
                   isDark={isDark} 
                   label="محتوى مروج" 
                 />
               </div>
             )}
          </div>

          <div className={`flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-colors">الخصوصية</button>
               <button onClick={() => setView('login')} className="hover:text-emerald-500 transition-colors">الإدارة</button>
               <span className="opacity-40">© {new Date().getFullYear()} Storehalal</span>
          </div>
        </div>
      </footer>
      
      {/* Popunder - Invisible Implementation */}
      {adsterraConfig.isEnabled && adsterraConfig.popUnder && (
        <div className="hidden" dangerouslySetInnerHTML={{ __html: adsterraConfig.popUnder }} />
      )}
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
