
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

const VERSION = "13.0"; // النسخة الشاملة لكسر الكاش

export default function App() {
  const [view, setView] = useState<View | 'post' | 'editor'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem(`theme_v${VERSION}`) !== 'light');
  
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem(`pass_v${VERSION}`) || 'abdou2024';
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(`posts_v${VERSION}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [totalConverted, setTotalConverted] = useState(() => Number(localStorage.getItem(`conv_v${VERSION}`)) || 0);
  const [totalVisitors, setTotalVisitors] = useState(() => Number(localStorage.getItem(`vis_v${VERSION}`)) || 0);
  const [baseVisitors, setBaseVisitors] = useState(() => Number(localStorage.getItem(`base_v${VERSION}`)) || 0);
  const [onlineNow] = useState(Math.floor(Math.random() * 25) + 15);

  const [adsterraConfig, setAdsterraConfig] = useState<AdsterraConfig>(() => {
    const saved = localStorage.getItem(`ads_v${VERSION}`);
    return saved ? JSON.parse(saved) : { 
      isEnabled: true, 
      socialBar: '', 
      popUnder: '', 
      banner728x90: '', 
      banner300x250: ''
    };
  });

  useEffect(() => {
    console.log(`🚀 Storehalal Engine v${VERSION} - All Systems Operational`);
    
    document.body.className = isDark ? '' : 'light-mode';
    localStorage.setItem(`theme_v${VERSION}`, isDark ? 'dark' : 'light');
    localStorage.setItem(`posts_v${VERSION}`, JSON.stringify(posts));
    localStorage.setItem(`conv_v${VERSION}`, totalConverted.toString());
    localStorage.setItem(`base_v${VERSION}`, baseVisitors.toString());
    localStorage.setItem(`ads_v${VERSION}`, JSON.stringify(adsterraConfig));
    localStorage.setItem(`pass_v${VERSION}`, adminPassword);
    
    if (!sessionStorage.getItem(`track_v${VERSION}`)) {
        setTotalVisitors(prev => prev + 1);
        sessionStorage.setItem(`track_v${VERSION}`, 'true');
    }
  }, [isDark, posts, totalConverted, baseVisitors, adsterraConfig, adminPassword]);

  const handleSavePost = (postData: Partial<Post>) => {
    const newPost = {
      id: selectedPost?.id || Date.now().toString(),
      date: selectedPost?.date || new Date().toLocaleDateString('ar-MA'),
      ...postData
    } as Post;

    if (selectedPost) {
      setPosts(posts.map(p => p.id === selectedPost.id ? newPost : p));
    } else {
      setPosts([newPost, ...posts]);
    }
    setView('admin');
    setSelectedPost(null);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6">
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] border ${isDark ? 'border-emerald-500/10 bg-black/70' : 'border-emerald-500/20 bg-white/90 shadow-2xl'} backdrop-blur-3xl transition-all`}>
          <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg group-hover:rotate-12 transition-transform">
              <Zap size={18} />
            </div>
            <span className="text-lg md:text-2xl font-black italic tracking-tighter">Storehalal <span className="text-emerald-500">Pro</span></span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 md:p-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setView(isAuthenticated ? 'admin' : 'login')} className={`p-2.5 md:p-3 rounded-xl transition-all ${isAuthenticated ? 'bg-emerald-500 text-black shadow-lg' : isDark ? 'bg-white/5 text-white/40' : 'bg-zinc-100 text-zinc-400'}`}>
               <LayoutDashboard size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-24 md:pt-32 pb-20 flex-grow">
        
        {view === 'home' && (
          <div className="animate-slide-up space-y-16 md:space-y-32">
            <section className="text-center pt-8">
              <h1 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 text-glow leading-[1.1] tracking-tighter">
                مدونة احترافية <br />
                <span className="text-emerald-500">& محول صور ذكي.</span>
              </h1>
              
              <Converter 
                onConversion={() => setTotalConverted(prev => prev + 1)} 
                isDark={isDark}
              />

              <SocialShare isDark={isDark} />
            </section>

            <BlogSection 
              posts={posts} 
              isDark={isDark} 
              onPostClick={(post) => { setSelectedPost(post); setView('post'); }} 
            />
          </div>
        )}

        {view === 'post' && selectedPost && (
          <PostView post={selectedPost} isDark={isDark} onBack={() => setView('home')} />
        )}

        {view === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p === adminPassword) {setIsAuthenticated(true); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}

        {view === 'admin' && isAuthenticated && (
          <div className="animate-slide-up space-y-8">
            <div className="flex justify-between items-center px-2">
                <button onClick={() => setView('home')} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all font-black uppercase text-[10px]">
                  <ArrowLeft size={14} /> الخروج للموقع
                </button>
                <button onClick={() => { setSelectedPost(null); setView('editor'); }} className="bg-emerald-500 text-black px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
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

            <div className="mt-12 px-2">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3"><BookOpen className="text-emerald-500" /> إدارة المحتوى</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map(post => (
                        <div key={post.id} className={`p-5 rounded-2xl border flex justify-between items-center ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-sm'}`}>
                            <div className="flex gap-4 items-center">
                                <img src={post.image} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                    <h4 className="font-bold text-sm line-clamp-1">{post.title}</h4>
                                    <span className="text-[10px] opacity-40 uppercase font-black">{post.status}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setSelectedPost(post); setView('editor'); }} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><PenTool size={14}/></button>
                                <button onClick={() => setPosts(posts.filter(p => p.id !== post.id))} className="p-2 bg-red-500/10 text-red-500 rounded-lg"><Zap size={14}/></button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && <p className="opacity-30 text-center py-10 font-black uppercase tracking-widest text-xs">لا توجد مقالات حالياً</p>}
                </div>
            </div>
          </div>
        )}

        {view === 'editor' && isAuthenticated && (
            <PostEditor 
                post={selectedPost || undefined} 
                isDark={isDark} 
                onSave={handleSavePost} 
                onCancel={() => setView('admin')} 
            />
        )}

        {view === 'security' && isAuthenticated && (
           <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => { setAdminPassword(p); setView('admin');}} onCancel={() => setView('admin')} onForceResetData={() => {}} />
        )}

        {view === 'ads' && isAuthenticated && (
           <AdSettings adsense={{isEnabled: false, publisherId: '', slotId: ''}} adsterra={adsterraConfig} isDark={isDark} onSave={(c) => { setAdsterraConfig(c.adsterra); setView('admin'); }} onCancel={() => setView('admin')} />
        )}

        {view === 'policies' && <Policies isDark={isDark} onBack={() => setView('home')} />}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 md:py-20 transition-colors ${isDark ? 'border-emerald-500/10 bg-black/80' : 'border-zinc-200 bg-white shadow-xl'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="mb-10 flex flex-wrap justify-center gap-3 md:gap-8">
            <div className={`px-5 py-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-200 shadow-sm'}`}>
                <span className="text-[8px] font-black uppercase opacity-30 tracking-widest block mb-1">الزوار</span>
                <span className="text-xl font-black italic text-emerald-500">{(totalVisitors + baseVisitors).toLocaleString()}</span>
            </div>
            <div className={`px-5 py-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-200 shadow-sm'}`}>
                <span className="text-[8px] font-black uppercase opacity-30 tracking-widest block mb-1">أونلاين</span>
                <span className="text-xl font-black italic flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    {onlineNow}
                </span>
            </div>
          </div>
          
          {/* إعلانات النسخة 13.0 */}
          <div className="mb-12 space-y-8 flex flex-col items-center min-h-[50px]">
             {adsterraConfig.isEnabled && adsterraConfig.banner300x250 && (
                <div id="ad-v13-mobile" className="w-full flex justify-center">
                  <AdUnit type="banner" code={adsterraConfig.banner300x250} isDark={isDark} className="max-w-[320px]" label="إعلان" />
                </div>
             )}
             
             {adsterraConfig.isEnabled && adsterraConfig.banner728x90 && (
               <div id="ad-v13-desktop" className="max-w-4xl w-full hidden md:block">
                 <AdUnit type="banner" code={adsterraConfig.banner728x90} isDark={isDark} label="إعلان الحاسوب" />
               </div>
             )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] opacity-30 mb-8">
               <button onClick={() => setView('policies')} className="hover:text-emerald-500 transition-all">سياسة الخصوصية</button>
               <button onClick={() => setView('login')} className="hover:text-emerald-500 transition-all">التحكم</button>
               <span>Storehalal © {new Date().getFullYear()}</span>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[7px] font-black opacity-20 uppercase tracking-[0.3em]">
            v{VERSION} Stable Build
          </div>
        </div>
      </footer>
      
      {/* سكريبتات أدستيرا */}
      {adsterraConfig.isEnabled && (
        <div id="hidden-ad-scripts" style={{ position: 'fixed', zIndex: -99, opacity: 0.01 }}>
           {adsterraConfig.popUnder && <AdUnit type="script" code={adsterraConfig.popUnder} isDark={isDark} label="" />}
           {adsterraConfig.socialBar && <AdUnit type="script" code={adsterraConfig.socialBar} isDark={isDark} label="" />}
        </div>
      )}
    </div>
  );
}
