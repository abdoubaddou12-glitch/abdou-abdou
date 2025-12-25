
import React, { useState, useEffect } from 'react';
import { Post, View, AdSenseConfig, AnalyticsData } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PostCard } from './components/PostCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';
import { AdSenseSettings } from './components/AdSenseSettings.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSense } from './components/AdSense.tsx';
import { 
  Sparkles, ArrowRight, Star, Cpu, BookOpen, ShoppingBag, 
  Newspaper, Globe, Zap, Facebook, Twitter, Share2, Copy, 
  CheckCircle2, MessageCircle, Mail, Instagram, Users, RefreshCcw
} from 'lucide-react';

const APP_VERSION = "1.5.0"; // تغيير هذا الرقم يجبر المتصفح على التحديث الشامل
const CONTACT_EMAIL = "abdelghaforbahaddou@gmail.com";
const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1611974714851-eb6051612253?auto=format&fit=crop&q=80&w=2000";

const MOCK_POSTS: Post[] = [
  {
    id: 'dirham-floating-2024',
    title: 'تعويم الدرهم المغربي: رحلة نحو المرونة الاقتصادية بين الفرص الواعدة والتحديات',
    excerpt: 'تحليل شامل لأبعاد قرار تحرير سعر صرف الدرهم المغربي وتأثيراته المباشرة على الاقتصاد والمواطن.',
    content: `يعتبر قرار إصلاح نظام سعر صرف الدرهم من أهم التحولات البنيوية التي شهدها الاقتصاد المغربي...`,
    date: '21 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'can-morocco-2025',
    title: 'المغرب 2025: عندما تتحول الملاعب إلى تحف فنية تبهر القارة السمراء',
    excerpt: 'استكشف أجواء "الكان" الأسطورية في المملكة المغربية، حيث تلتقي الحداثة بالتقاليد في ملاعب عالمية جاهزة لكتابة التاريخ الإفريقي الجديد.',
    content: `المغرب يثبت للعالم مرة أخرى أنه عاصمة الرياضة الإفريقية بلا منازع...`,
    date: '20 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  }
];

const DEFAULT_PASSWORD = "abdou2024";

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_PASSWORD);
  const [copied, setCopied] = useState(false);
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>({
    publisherId: '',
    slotId: '',
    isEnabled: false
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    liveVisitors: 0,
    dailyEarnings: [8.5, 12.2, 10.4, 15.1, 11.5, 18.8, 14.4],
    ctr: "1.8%",
    cpc: "$0.08"
  });

  const handleSyncData = (forceReset = false) => {
    if (forceReset) {
      localStorage.removeItem('blog_posts');
      setPosts(MOCK_POSTS);
      localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
      return;
    }
    const updatedPosts = MOCK_POSTS.map(m => {
      const existing = posts.find(p => p.id === m.id);
      return existing ? { ...existing, ...m } : m;
    });
    const finalPosts = [...updatedPosts, ...posts.filter(p => !MOCK_POSTS.find(m => m.id === p.id))];
    setPosts(finalPosts);
    localStorage.setItem('blog_posts', JSON.stringify(finalPosts));
  };

  useEffect(() => {
    // 1. فحص الإصدار للتحديث التلقائي
    const savedVersion = localStorage.getItem('app_version');
    if (savedVersion !== APP_VERSION) {
      handleSyncData(true);
      localStorage.setItem('app_version', APP_VERSION);
    }

    const savedPassword = localStorage.getItem('admin_password');
    if (savedPassword) setAdminPassword(savedPassword);
    
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(MOCK_POSTS);
      }
    } else {
      setPosts(MOCK_POSTS);
      localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);

    const savedAds = localStorage.getItem('adsense_config');
    if (savedAds) setAdsenseConfig(JSON.parse(savedAds));

    const views = parseInt(localStorage.getItem('total_views') || '1240');
    setAnalytics(prev => ({ 
      ...prev, 
      totalViews: views,
      liveVisitors: 15 + Math.floor(Math.random() * 20)
    }));
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const handleLogin = (password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setView('admin');
      return true;
    }
    return false;
  };

  const updatePassword = (newPass: string) => {
    setAdminPassword(newPass);
    localStorage.setItem('admin_password', newPass);
  };

  const navigateToPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setView('post');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const views = (parseInt(localStorage.getItem('total_views') || '1240')) + 1;
      localStorage.setItem('total_views', views.toString());
      setAnalytics(prev => ({ ...prev, totalViews: views }));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredPost = posts.find(p => p.status === 'published');

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        setView={(v) => v === 'admin' && !isAuthenticated ? setView('login') : setView(v)} 
        currentView={currentView}
        liveVisitors={analytics.liveVisitors}
      />
      
      {isAuthenticated && (
        <button 
          onClick={() => { handleSyncData(true); alert('تم تحديث بيانات السيرفر بنجاح!'); }}
          className="fixed bottom-8 left-8 z-[100] w-14 h-14 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
          title="تحديث شامل للبيانات"
        >
          <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
        </button>
      )}

      <main className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        {currentView === 'home' && (
          <div className="animate-fade-in space-y-24">
            <header className="relative py-12 flex flex-col items-center text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
              <h1 className="text-6xl md:text-[8rem] font-black mb-8 leading-[0.85] tracking-tighter text-black dark:text-white">
                عبدو <span className="text-emerald-500">ويب.</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-70 font-medium leading-relaxed mb-12 px-4">
                مدونة احترافية تجمع بين <span className="text-emerald-500 font-bold underline decoration-emerald-200">أخبار المغرب</span>، 
                عالم <span className="text-emerald-500 font-bold underline decoration-emerald-200">التقنية</span>، 
                وحيادية <span className="text-emerald-500 font-bold underline decoration-emerald-200">تطوير الذات</span>.
              </p>
            </header>

            {featuredPost && (
              <section className="relative group">
                <div onClick={() => navigateToPost(featuredPost.id)} className="relative glass-card rounded-[4rem] overflow-hidden flex flex-col lg:flex-row cursor-pointer shadow-2xl border-emerald-500/5 group">
                  <div className="lg:w-3/5 h-[500px] lg:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      onError={(e) => { e.currentTarget.src = DEFAULT_FALLBACK_IMAGE; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={featuredPost.title} 
                    />
                  </div>
                  <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center bg-white/50 dark:bg-black/50 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-6"><span className="w-8 h-[2px] bg-emerald-500"></span><span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">المقال المميز</span></div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-black dark:text-white group-hover:text-emerald-500 transition-colors">{featuredPost.title}</h2>
                    <p className="text-lg opacity-60 mb-10 leading-relaxed font-medium line-clamp-3">{featuredPost.excerpt}</p>
                    <button className="flex items-center gap-3 text-sm font-black text-emerald-500 uppercase tracking-widest group-hover:gap-5 transition-all">اقرأ المقال كاملاً <ArrowRight size={18} /></button>
                  </div>
                </div>
              </section>
            )}

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.filter(p => p.status === 'published' && p.id !== featuredPost?.id).map((post) => (
                <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
              ))}
            </section>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto py-10 animate-fade-in">
             <header className="mb-16 text-center">
                <button onClick={() => setView('home')} className="mb-12 text-[11px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-3 border border-emerald-500/20 px-6 py-2 rounded-full">← العودة للرئيسية</button>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-black dark:text-white">{selectedPost.title}</h1>
             </header>
             <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl mb-16 aspect-video">
                <img src={selectedPost.image} onError={(e) => { e.currentTarget.src = DEFAULT_FALLBACK_IMAGE; }} className="w-full h-full object-cover" alt={selectedPost.title} />
             </div>
             <div className={`prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.8] font-medium whitespace-pre-wrap px-4 mb-20 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{selectedPost.content}</div>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={handleLogin} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} isDark={isDark} analytics={analytics}
            onNewPost={() => setView('editor')} 
            onEditPost={(id) => { setEditingPostId(id); setView('editor'); }}
            onDeletePost={(id) => {
               const up = posts.filter(p => p.id !== id);
               setPosts(up);
               localStorage.setItem('blog_posts', JSON.stringify(up));
            }}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
            onSyncData={() => handleSyncData(true)}
          />
        )}
        
        {currentView === 'adsense-settings' && isAuthenticated && (
          <AdSenseSettings config={adsenseConfig} isDark={isDark} onSave={(c) => { setAdsenseConfig(c); localStorage.setItem('adsense_config', JSON.stringify(c)); setView('admin'); }} onCancel={() => setView('admin')} />
        )}

        {currentView === 'security-settings' && isAuthenticated && (
          <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={updatePassword} onCancel={() => setView('admin')} onForceResetData={() => handleSyncData(true)} />
        )}

        {currentView === 'editor' && isAuthenticated && (
           <PostEditor isDark={isDark} post={editingPostId ? posts.find(p => p.id === editingPostId) : undefined} onSave={(data) => {
                let up;
                if(editingPostId) up = posts.map(p => p.id === editingPostId ? {...p, ...data} as Post : p);
                else up = [{...data, id: Date.now().toString(), author: 'عبدو', date: new Date().toLocaleDateString('ar-MA')} as Post, ...posts];
                setPosts(up);
                localStorage.setItem('blog_posts', JSON.stringify(up));
                setView('admin');
                setEditingPostId(null);
             }} onCancel={() => setView('admin')} />
        )}
      </main>
    </Layout>
  );
};

export default App;
