
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, Settings, LogOut, 
  BarChart3, Lock, MessageCircle, Send, Facebook, 
  Twitter, CheckCircle, Link as LinkIcon, DollarSign,
  Shield, Image as ImageIcon, Download, Trash2, Sliders, Zap,
  Sun, Moon
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSenseSettings } from './components/AdSenseSettings.tsx';
import { AdSense } from './components/AdSense.tsx';
import { Converter } from './components/Converter.tsx';
import { AdSenseConfig } from './types.ts';

export default function App() {
  const [view, setView] = useState<'home' | 'login' | 'admin'>('home');
  const [adminTab, setAdminTab] = useState<'stats' | 'security' | 'adsense'>('stats');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? saved === 'dark' : true;
  });
  
  // Stats for the tool
  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem('total_converted')) || 0);
  
  // Admin Secrets
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('emerald_admin_pass') || 'abdou2024');
  
  // AdSense Config
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>(() => {
    const saved = localStorage.getItem('emerald_adsense_config');
    return saved ? JSON.parse(saved) : { isEnabled: false, publisherId: '', slotId: '' };
  });

  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [isDark]);

  const handleAdminLogin = (pass: string) => {
    if (pass === adminPassword) {
      setIsAuthenticated(true);
      setView('admin');
      return true;
    }
    return false;
  };

  const handleConversionComplete = () => {
    const newVal = totalConverted + 1;
    setTotalConverted(newVal);
    localStorage.setItem('total_converted', newVal.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareUrl = encodeURIComponent("https://storehalal.shop");
  const shareText = encodeURIComponent("أفضل أداة لتحويل الصور مجاناً وبخصوصية تامة:");

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
             <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500 hover:bg-zinc-800' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
             >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             {isAuthenticated && (
               <button 
                 onClick={() => setView('admin')}
                 className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
               >
                 <LayoutDashboard size={20} />
               </button>
             )}
             
             <div className={`hidden sm:flex px-4 py-2 rounded-full border items-center gap-2 ${isDark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>نشط الآن</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-16 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-black italic mb-6 text-glow leading-tight">حول صورك <br/><span className="text-emerald-500">بخصوصية تامة.</span></h1>
              <p className={`max-w-2xl mx-auto italic font-medium leading-relaxed ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>أداة احترافية لتحويل صيغ الصور (WebP, JPG, PNG) مجاناً. المعالجة تتم في متصفحك ولا نطلع على ملفاتك أبداً.</p>
            </div>
            
            <AdSense config={adsenseConfig} isDark={isDark} className="mb-12" />

            <Converter onConversion={handleConversionComplete} isDark={isDark} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
               <FeatureCard icon={<Shield size={24}/>} title="أمان مطلق" desc="لا يتم رفع الصور إلى أي سيرفر، كل شيء يتم محلياً." isDark={isDark} />
               <FeatureCard icon={<Zap size={24}/>} title="سرعة فائقة" desc="تحويل فوري بضغطة زر واحدة بفضل تقنيات الويب الحديثة." isDark={isDark} />
               <FeatureCard icon={<Sliders size={24}/>} title="تحكم كامل" desc="اختر الجودة والمقاس المناسب لاحتياجاتك بدقة." isDark={isDark} />
            </div>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={handleAdminLogin} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2">مركز التحكم</h1>
                <p className={`font-bold uppercase tracking-widest text-[10px] ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>إدارة الأداء، الإعلانات والأمن</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 <AdminTabBtn active={adminTab === 'stats'} onClick={() => setAdminTab('stats')} icon={<BarChart3 size={16}/>} label="الأداء" isDark={isDark} />
                 <AdminTabBtn active={adminTab === 'adsense'} onClick={() => setAdminTab('adsense')} icon={<DollarSign size={16}/>} label="الإعلانات" isDark={isDark} />
                 <AdminTabBtn active={adminTab === 'security'} onClick={() => setAdminTab('security')} icon={<Settings size={16}/>} label="الأمان" isDark={isDark} />
                 <button onClick={() => { setIsAuthenticated(false); setView('home'); }} className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><LogOut size={18}/></button>
              </div>
            </div>

            <div className="mt-8">
              {adminTab === 'stats' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <StatCard label="إجمالي التحويلات" value={totalConverted.toLocaleString()} icon={<RefreshCw size={24} />} isDark={isDark} />
                  <StatCard label="أرباح أدسنس (تقديرية)" value={`$${(totalConverted * 0.02).toFixed(2)}`} icon={<DollarSign size={24} />} isDark={isDark} />
                  <StatCard label="حالة الدومين" value="نشط" icon={<CheckCircle size={24} />} isDark={isDark} />
                </div>
              )}

              {adminTab === 'adsense' && (
                <AdSenseSettings 
                  config={adsenseConfig} 
                  isDark={isDark} 
                  onSave={(conf) => { setAdsenseConfig(conf); localStorage.setItem('emerald_adsense_config', JSON.stringify(conf)); setAdminTab('stats'); }} 
                  onCancel={() => setAdminTab('stats')} 
                />
              )}

              {adminTab === 'security' && (
                <SecuritySettings 
                  isDark={isDark} 
                  currentSavedPassword={adminPassword} 
                  onSave={(pass) => { setAdminPassword(pass); localStorage.setItem('emerald_admin_pass', pass); }} 
                  onCancel={() => setAdminTab('stats')} 
                  onForceResetData={() => {}} 
                />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className={`border-t py-16 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/40' : 'border-zinc-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="text-center lg:text-right">
              <span className="text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>Professional Media Processing</p>
            </div>
            
            <div className="flex gap-4">
               <SocialBtn href={`https://wa.me/?text=${shareText}%20${shareUrl}`} icon={<MessageCircle size={20} />} isDark={isDark} />
               <SocialBtn href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} icon={<Facebook size={20} />} isDark={isDark} />
               <SocialBtn href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} icon={<Twitter size={20} />} isDark={isDark} />
               <button onClick={copyToClipboard} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${copySuccess ? 'bg-emerald-500 border-transparent text-black shadow-lg shadow-emerald-500/20' : isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                 {copySuccess ? <CheckCircle size={20} /> : <LinkIcon size={20} />}
               </button>
            </div>

            <div className={`flex gap-8 text-[11px] font-black uppercase tracking-widest ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>
               <button onClick={() => setView('home')} className="hover:text-emerald-500 transition-colors">الرئيسية</button>
               <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className="text-emerald-500 flex items-center gap-2 hover:opacity-80"><Lock size={12} /> لوحة الإدارة</button>
            </div>
          </div>
          <div className={`mt-12 pt-8 border-t text-center text-[10px] font-bold uppercase tracking-widest ${isDark ? 'border-white/5 opacity-20' : 'border-zinc-100 text-zinc-300'}`}>
            جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, isDark }) => (
  <div className={`emerald-card p-10 group hover:border-emerald-500/40 transition-all ${!isDark && 'bg-white shadow-sm'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
      {icon}
    </div>
    <h3 className="text-lg font-black mb-3">{title}</h3>
    <p className={`text-sm leading-relaxed ${isDark ? 'opacity-40' : 'text-zinc-500'}`}>{desc}</p>
  </div>
);

const AdminTabBtn = ({ active, onClick, icon, label, isDark }) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-4 rounded-2xl font-black text-xs transition-all flex items-center gap-3 ${active ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : isDark ? 'bg-white/5 hover:bg-white/10 opacity-60' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, icon, isDark }) => (
  <div className={`emerald-card p-10 relative overflow-hidden group ${!isDark && 'bg-white'}`}>
    <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500 scale-[4]">
      {icon}
    </div>
    <div className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>{label}</div>
    <div className="text-5xl font-black text-emerald-500 tracking-tighter">{value}</div>
  </div>
);

const SocialBtn = ({ href, icon, isDark }) => (
  <a href={href} target="_blank" className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white'}`}>
    {icon}
  </a>
);
