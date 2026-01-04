
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Zap, Sun, Moon, ArrowLeft, 
  ShieldCheck, ImageIcon, Users, BookOpen, PenTool
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin.tsx';
import { Converter } from './components/Converter.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { PostView } from './components/PostView.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { Policies } from './components/Policies.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSettings } from './components/AdSettings.tsx';
import { AdUnit } from './components/AdUnit.tsx';
import { SocialShare } from './components/SocialShare.tsx';
import { View, AdsterraConfig, Post } from './types.ts';

const VERSION = "15.1"; 

export default function App() {
  const [view, setView] = useState<View | 'post' | 'editor'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem(`v${VERSION}_theme`) !== 'light');
  
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem(`v${VERSION}_pass`) || 'abdou2024';
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(`v${VERSION}_posts`);
    return saved ? JSON.parse(saved) : [];
  });

  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem(`v${VERSION}_conv`)) || 0);
  const [totalVisitors, setTotalVisitors] = useState(() => Number(localStorage.getItem(`v${VERSION}_vis`)) || 0);
  const [baseVisitors, setBaseVisitors] = useState(() => Number(localStorage.getItem(`v${VERSION}_base`)) || 0);

  const [adsterraConfig, setAdsterraConfig] = useState<AdsterraConfig>(() => {
    const saved = localStorage.getItem(`v${VERSION}_ads`);
    if (saved) return JSON.parse(saved);
    
    // الأكواد الخاصة بك مدمجة افتراضياً
    return { 
      isEnabled: true, 
      socialBar: '<script src="https://bouncingbuzz.com/15/38/5b/15385b7c751e6c7d59d59fb7f34e2934.js"></script>', 
      popUnder: '<script src="https://bouncingbuzz.com/29/98/27/29982794e86cad0441c5d56daad519bd.js"></script>', 
      banner728x90: '', // يمكنك إضافة كود بانر الحاسوب هنا لاحقاً
      banner300x250: `<script>atOptions = {'key' : '0295263cf4ed8d9e3a97b6a2490864ee','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};</script><script src="https://bouncingbuzz.com/0295263cf4ed8d9e3a97b6a2490864ee/invoke.js"></script>`
    };
  });

  useEffect(() => {
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem(`v${VERSION}_theme`, isDark ? 'dark' : 'light');
    localStorage.setItem(`v${VERSION}_posts`, JSON.stringify(posts));
    localStorage.setItem(`v${VERSION}_conv`, totalConverted.toString());
    localStorage.setItem(`v${VERSION}_base`, baseVisitors.toString());
    localStorage.setItem(`v${VERSION}_ads`, JSON.stringify(adsterraConfig));
    localStorage.setItem(`v${VERSION}_pass`, adminPassword);
    
    if (!sessionStorage.getItem(`v${VERSION}_track`)) {
        setTotalVisitors(prev => prev + 1);
        sessionStorage.setItem(`v${VERSION}_track`, 'true');
    }
  }, [isDark, posts, totalConverted, baseVisitors, adsterraConfig, adminPassword]);

  const handleSavePost = (postData: Partial<Post>) => {
    if (selectedPost) {
      setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, ...postData } as Post : p));
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ar-MA'),
        title: '',
        category: 'تقنية',
        excerpt: '',
        content: '',
        status: 'published',
        image: '',
        ...postData
      } as Post;
      setPosts(prev => [newPost, ...prev]);
    }
    setView('admin');
    setSelectedPost(null);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      {/* سكريبتات Adsterra في الخلفية - تعمل على كافة الأجهزة */}
      {adsterraConfig.isEnabled && (
        <>
          <AdUnit type="script" code={adsterraConfig.socialBar} isDark={isDark} />
          <AdUnit type="script" code={adsterraConfig.popUnder} isDark={isDark} />
        </>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 md:py-4 rounded-3xl border ${isDark ? 'border-emerald-500/10 bg-black/70' : 'border-zinc-200 bg-white/90 shadow-xl'} backdrop-blur-2xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg group-hover:rotate-12 transition-transform">
              <Zap size={18} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Pro</span></span>
          </div>
          
          <div className="flex items-center gap-2">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-zinc-100 border-zinc-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className={`p-2.5 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}>
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 pt-32 pb-20 flex-grow">
        
        {view === 'home' && (
          <div className="space-y-24 md:space-y-32">
            <section className="text-center animate-slide-up">
              <h1 className="text-4xl md:text-8xl font-black italic mb-10 text-glow leading-tight tracking-tighter">
                مدونة احترافية <br />
                <span className="text-emerald-500">& محول صور ذكي.</span>
              </h1>
              
              <Converter onConversion={() => setTotalConverted(prev => prev + 1)} isDark={isDark} />
              <SocialShare isDark={isDark} />
            </section>

            <BlogSection posts={posts} isDark={isDark} onPostClick={(post) => { setSelectedPost(post); setView('post'); }} />
          </div>
        )}

        {view === 'post' && selectedPost && (
          <PostView post={selectedPost} isDark={isDark} onBack={() => setView('home')} />
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p === adminPassword) {setIsAuthenticated(true); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-fade-in space-y-8">
             <div className="flex justify-between items-center px-2">
                <button onClick={() => setView('home')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase text-[10px]">
                  <ArrowLeft size={14} /> الخروج للموقع
                </button>
                <button onClick={() => { setSelectedPost(null); setView('editor'); }} className="bg-emerald-500 text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
                    <PenTool size={16} /> مقال جديد
                </button>
            </div>
            
            <AdminPanel 
              isDark={isDark}
              analytics={{
                totalViews: totalConverted,
                totalVisitors: totalVisitors,
                dailyEarnings: [0],
                ctr: "8.5%",
                cpc: "0.12$"
              }}
              onOpenAdSense={() => setView('ads')}
              onOpenSecurity={() => setView('security')} 
              onSyncData={() => {}}
              baseVisitors={baseVisitors}
              onUpdateBaseVisitors={(val) => setBaseVisitors(val)}
            />
          </div>
        )}

        {view === 'editor' && isAuthenticated && (
            <PostEditor post={selectedPost || undefined} isDark={isDark} onSave={handleSavePost} onCancel={() => setView('admin')} />
        )}

        {view === 'security' && isAuthenticated && (
           <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => { setAdminPassword(p); setView('admin');}} onCancel={() => setView('admin')} onForceResetData={() => {}} />
        )}

        {view === 'ads' && isAuthenticated && (
           <AdSettings adsense={{isEnabled: false, publisherId: '', slotId: ''}} adsterra={adsterraConfig} isDark={isDark} onSave={(c) => { setAdsterraConfig(c.adsterra); setView('admin'); }} onCancel={() => setView('admin')} />
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      <footer className={`border-t py-12 md:py-20 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/80' : 'border-zinc-200 bg-white shadow-xl'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="mb-10 flex justify-center gap-4">
            <div className={`px-5 py-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                <span className="text-[9px] font-black uppercase opacity-30 block mb-1">الزوار</span>
                <span className="text-xl font-black text-emerald-500">{(totalVisitors + baseVisitors).toLocaleString()}</span>
            </div>
          </div>
          
          {/* توزيع الإعلانات حسب نوع الجهاز */}
          <div className="mb-12 space-y-12 flex flex-col items-center">
             {adsterraConfig.isEnabled && (
                <>
                  {/* هذا البانر يظهر دائماً على الهاتف ويكون مركزياً */}
                  <div className="w-full max-w-[320px] mx-auto">
                    <AdUnit type="banner" code={adsterraConfig.banner300x250} isDark={isDark} label="إعلان الجوال" />
                  </div>
                  
                  {/* هذا البانر يظهر فقط على الحواسيب (الشاشات المتوسطة وما فوق) */}
                  <div className="hidden md:block w-full max-w-4xl mx-auto">
                    <AdUnit type="banner" code={adsterraConfig.banner728x90 || adsterraConfig.banner300x250} isDark={isDark} label="إعلان الحاسوب" />
                  </div>
                </>
             )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-30 mb-8">
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-all">الخصوصية</button>
               <button onClick={() => setView('login')} className="hover:text-emerald-500 transition-all">الإدارة</button>
               <span>Storehalal © {new Date().getFullYear()}</span>
          </div>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[8px] font-black opacity-20 uppercase tracking-widest">
            STABLE ENGINE v{VERSION}
          </div>
        </div>
      </footer>
    </div>
  );
}
