
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, LayoutDashboard, Settings, LogOut, 
  BarChart3, Lock, MessageCircle, Send, Facebook, 
  Twitter, CheckCircle, Link as LinkIcon, DollarSign,
  Shield, Image as ImageIcon, Download, Trash2, Sliders, Zap
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
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      {/* Navigation */}
      <nav className="pt-6 md:pt-10 px-4 md:px-6 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-3xl border border-emerald-500/10 bg-black/40 backdrop-blur-2xl">
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
          </div>
          
          <div className="flex items-center gap-3">
             {isAuthenticated && (
               <button 
                 onClick={() => setView('admin')}
                 className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
               >
                 <LayoutDashboard size={20} />
               </button>
             )}
             <div className="hidden sm:flex px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">نشط الآن</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-16 pb-20 flex-grow">
        {view === 'home' && (
          <div className="animate-slide-up">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-black italic mb-6 text-glow leading-tight">حول صورك <br/><span className="text-emerald-500">بخصوصية تامة.</span></h1>
              <p className="opacity-40 max-w-2xl mx-auto italic font-medium leading-relaxed">أداة احترافية لتحويل صيغ الصور (WebP, JPG, PNG) مجاناً. المعالجة تتم في متصفحك ولا نطلع على ملفاتك أبداً.</p>
            </div>
            
            <AdSense config={adsenseConfig} isDark={true} className="mb-12" />

            <Converter onConversion={handleConversionComplete} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
               {/* Fixed missing Zap icon error */}
               <FeatureCard icon={<Zap size={24}/>} title="أمان مطلق" desc="لا يتم رفع الصور إلى أي سيرفر، كل شيء يتم محلياً." />
               <FeatureCard icon={<Zap size={24}/>} title="سرعة فائقة" desc="تحويل فوري بضغطة زر واحدة بفضل تقنيات الويب الحديثة." />
               <FeatureCard icon={<Sliders size={24}/>} title="تحكم كامل" desc="اختر الجودة والمقاس المناسب لاحتياجاتك بدقة." />
            </div>
          </div>
        )}

        {view === 'login' && <AdminLogin isDark={true} onLogin={handleAdminLogin} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2">مركز التحكم</h1>
                <p className="opacity-40 font-bold uppercase tracking-widest text-[10px]">إدارة الأداء، الإعلانات والأمن</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 <AdminTabBtn active={adminTab === 'stats'} onClick={() => setAdminTab('stats')} icon={<BarChart3 size={16}/>} label="الأداء" />
                 <AdminTabBtn active={adminTab === 'adsense'} onClick={() => setAdminTab('adsense')} icon={<DollarSign size={16}/>} label="الإعلانات" />
                 <AdminTabBtn active={adminTab === 'security'} onClick={() => setAdminTab('security')} icon={<Settings size={16}/>} label="الأمان" />
                 <button onClick={() => { setIsAuthenticated(false); setView('home'); }} className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><LogOut size={18}/></button>
              </div>
            </div>

            <div className="mt-8">
              {adminTab === 'stats' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <StatCard label="إجمالي التحويلات" value={totalConverted.toLocaleString()} icon={<RefreshCw size={24} />} />
                  <StatCard label="أرباح أدسنس (تقديرية)" value={`$${(totalConverted * 0.02).toFixed(2)}`} icon={<DollarSign size={24} />} />
                  <StatCard label="حالة الدومين" value="نشط" icon={<CheckCircle size={24} />} />
                </div>
              )}

              {adminTab === 'adsense' && (
                <AdSenseSettings 
                  config={adsenseConfig} 
                  isDark={true} 
                  onSave={(conf) => { setAdsenseConfig(conf); localStorage.setItem('emerald_adsense_config', JSON.stringify(conf)); setAdminTab('stats'); }} 
                  onCancel={() => setAdminTab('stats')} 
                />
              )}

              {adminTab === 'security' && (
                <SecuritySettings 
                  isDark={true} 
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

      <footer className="border-t border-emerald-500/10 py-16 bg-black/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="text-center lg:text-right">
              <span className="text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Convert</span></span>
              <p className="text-[10px] opacity-30 font-bold uppercase tracking-widest mt-3">Professional Media Processing</p>
            </div>
            
            <div className="flex gap-4">
               <SocialBtn href={`https://wa.me/?text=${shareText}%20${shareUrl}`} icon={<MessageCircle size={20} />} />
               <SocialBtn href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} icon={<Facebook size={20} />} />
               <SocialBtn href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} icon={<Twitter size={20} />} />
               <button onClick={copyToClipboard} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${copySuccess ? 'bg-emerald-500 border-transparent text-black shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                 {copySuccess ? <CheckCircle size={20} /> : <LinkIcon size={20} />}
               </button>
            </div>

            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest opacity-30">
               <button onClick={() => setView('home')}>الرئيسية</button>
               <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className="text-emerald-500 flex items-center gap-2"><Lock size={12} /> لوحة الإدارة</button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] opacity-20 font-bold uppercase tracking-widest">
            جميع الحقوق محفوظة © {new Date().getFullYear()} Storehalal.shop
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="emerald-card p-10 border-emerald-500/5 group hover:border-emerald-500/20 transition-all">
    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-black mb-3">{title}</h3>
    <p className="text-sm opacity-40 leading-relaxed">{desc}</p>
  </div>
);

const AdminTabBtn = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-4 rounded-2xl font-black text-xs transition-all flex items-center gap-3 ${active ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100'}`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, icon }) => (
  <div className="emerald-card p-10 relative overflow-hidden group">
    <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500 scale-[4]">
      {icon}
    </div>
    <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-3">{label}</div>
    <div className="text-5xl font-black text-emerald-500 tracking-tighter">{value}</div>
  </div>
);

const SocialBtn = ({ href, icon }) => (
  <a href={href} target="_blank" className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all">
    {icon}
  </a>
);
