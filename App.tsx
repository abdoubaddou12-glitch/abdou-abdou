
import React, { useState, useEffect } from 'react';
import { Post, View, AdSenseConfig } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PostCard } from './components/PostCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';
import { AdSenseSettings } from './components/AdSenseSettings.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { AdSense } from './components/AdSense.tsx';
// Fix: Added missing Globe and Zap imports
import { Sparkles, ArrowRight, Star, Cpu, BookOpen, ShoppingBag, Newspaper, Globe, Zap } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'مستقبل الذكاء الاصطناعي في الإدارات المغربية 2030',
    excerpt: 'كيف تستعد المملكة المغربية لدمج تقنيات الذكاء الاصطناعي في الخدمات العمومية لتسهيل حياة المواطنين.',
    content: 'المغرب يخطو خطوات ثابتة نحو الرقمنة الشاملة...',
    date: '18 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200',
    status: 'published'
  },
  {
    id: '2',
    title: 'أفضل الحواسيب المحمولة للمبرمجين في السوق المغربي',
    excerpt: 'مراجعة شاملة لأحدث الأجهزة المتاحة حالياً مع مقارنة الأسعار والأداء للمحترفين.',
    content: 'اختيار الحاسوب المناسب هو أول خطوة في مسارك المهني...',
    date: '16 مارس 2024',
    author: 'عبدو',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200',
    status: 'published'
  },
  {
    id: '3',
    title: 'كيف تبني انضباطاً ذاتياً حديدياً في 30 يوماً؟',
    excerpt: 'خارطة طريق عملية لتطوير عادات النجاح والتحكم في وقتك بفاعلية قصوى.',
    content: 'النجاح ليس صدفة بل هو نتيجة انضباط يومي...',
    date: '14 مارس 2024',
    author: 'عبدو',
    category: 'تطوير الذات',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200',
    status: 'published'
  },
  {
    id: '4',
    title: 'تقييم آيفون 15 برو ماكس بعد 6 أشهر من الاستخدام',
    excerpt: 'هل يستحق الهاتف سعره الحالي في المغرب؟ وهل الكاميرا فعلاً نقلة نوعية؟',
    content: 'بعد تجربة طويلة وشاملة، إليكم الخلاصة...',
    date: '12 مارس 2024',
    author: 'عبدو',
    category: 'تقييم المنتجات',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=1200',
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
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>({
    publisherId: '',
    slotId: '',
    isEnabled: false
  });

  useEffect(() => {
    // تحميل كلمة المرور
    const savedPassword = localStorage.getItem('admin_password');
    if (savedPassword) {
      setAdminPassword(savedPassword);
    } else {
      localStorage.setItem('admin_password', DEFAULT_PASSWORD);
    }

    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        setPosts(parsed.length > 0 ? parsed : MOCK_POSTS);
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
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    }
  };

  const featuredPost = posts.find(p => p.status === 'published');

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        setView={(v) => v === 'admin' && !isAuthenticated ? setView('login') : setView(v)} 
        currentView={currentView}
      />
      
      <main className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        {currentView === 'home' && (
          <div className="animate-fade-in space-y-24">
            
            {/* Elegant Hero */}
            <header className="relative py-12 flex flex-col items-center text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10"></div>
              
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full glass-card text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 border border-indigo-500/10">
                <Sparkles size={14} className="animate-pulse" /> وجهتك الأولى للمحتوى الهادف
              </div>

              <h1 className="text-6xl md:text-[8rem] font-black mb-8 leading-[0.85] tracking-tighter text-zinc-900 dark:text-white">
                عبدو <span className="text-indigo-600">ويب.</span>
              </h1>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-70 font-medium leading-relaxed mb-12 px-4">
                مدونة احترافية تجمع بين <span className="text-indigo-600 font-bold underline decoration-indigo-200">أخبار المغرب</span>، 
                عالم <span className="text-indigo-600 font-bold underline decoration-indigo-200">التقنية</span>، 
                فن <span className="text-indigo-600 font-bold underline decoration-indigo-200">تطوير الذات</span>، 
                وحيادية <span className="text-indigo-600 font-bold underline decoration-indigo-200">تقييم المنتجات</span>.
              </p>

              {/* Quick Categories Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
                {[
                  { icon: Newspaper, label: 'أخبار المغرب', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
                  { icon: Cpu, label: 'تقنية', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                  { icon: BookOpen, label: 'تطوير الذات', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
                  { icon: ShoppingBag, label: 'تقييم المنتجات', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' }
                ].map((cat, i) => (
                  <div key={i} className={`flex flex-col items-center gap-3 p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer hover:scale-105 glass-card ${cat.color}`}>
                    <cat.icon size={32} />
                    <span className="font-black text-sm uppercase tracking-widest">{cat.label}</span>
                  </div>
                ))}
              </div>
            </header>

            {/* Featured Post - Ultra Modern Layout */}
            {featuredPost && (
              <section className="relative group">
                <div 
                  onClick={() => navigateToPost(featuredPost.id)}
                  className="relative glass-card rounded-[4rem] overflow-hidden flex flex-col lg:flex-row cursor-pointer shadow-2xl border-indigo-500/5 group"
                >
                  <div className="lg:w-3/5 h-[500px] lg:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={featuredPost.title}
                    />
                  </div>
                  <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-[2px] bg-indigo-600"></span>
                      <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">المقال المميز</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg opacity-60 mb-10 leading-relaxed font-medium line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <button className="flex items-center gap-3 text-sm font-black text-indigo-600 uppercase tracking-widest group-hover:gap-5 transition-all">
                      اقرأ المقال كاملاً <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Grid for other sections */}
            <section className="space-y-16">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-right">
                  <h2 className="text-4xl font-black tracking-tighter">أحدث المنشورات</h2>
                  <p className="text-xs opacity-40 font-black mt-1 uppercase tracking-[0.5em]">Explore our latest insights</p>
                </div>
                <div className="h-[1px] flex-grow mx-8 bg-zinc-500/10 hidden md:block"></div>
                <div className="flex gap-2">
                   {[1, 2, 3].map(i => <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-indigo-600/10'}`}></div>)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.filter(p => p.status === 'published' && p.id !== featuredPost?.id).map((post) => (
                  <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
                ))}
              </div>
            </section>
            
            <AdSense config={adsenseConfig} isDark={isDark} className="max-w-5xl mx-auto" />
          </div>
        )}

        {/* Views */}
        {currentView === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto py-10 animate-fade-in">
             <header className="mb-16 text-center">
                <button 
                  onClick={() => setView('home')} 
                  className="mb-12 text-[11px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-3 border border-zinc-500/20 px-6 py-2 rounded-full"
                >
                   ← العودة للرئيسية
                </button>
                <div className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-6">
                  {selectedPost.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-zinc-900 dark:text-white">
                  {selectedPost.title}
                </h1>
                <div className="flex justify-center items-center gap-8 text-[11px] font-black uppercase tracking-widest opacity-40">
                   <div className="flex items-center gap-2">بواسطة <span className="text-zinc-900 dark:text-white">{selectedPost.author}</span></div>
                   <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                   <span>{selectedPost.date}</span>
                </div>
             </header>

             <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl mb-16 aspect-video">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
             </div>

             <div className={`prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.8] font-medium whitespace-pre-wrap px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                {selectedPost.content}
             </div>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={handleLogin} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} 
            isDark={isDark} 
            onNewPost={() => setView('editor')} 
            onEditPost={(id) => { setEditingPostId(id); setView('editor'); }}
            onDeletePost={(id) => {
               const up = posts.filter(p => p.id !== id);
               setPosts(up);
               localStorage.setItem('blog_posts', JSON.stringify(up));
            }}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
          />
        )}
        
        {currentView === 'adsense-settings' && isAuthenticated && (
          <AdSenseSettings 
            config={adsenseConfig} 
            isDark={isDark} 
            onSave={(c) => { setAdsenseConfig(c); localStorage.setItem('adsense_config', JSON.stringify(c)); setView('admin'); }} 
            onCancel={() => setView('admin')} 
          />
        )}

        {currentView === 'security-settings' && isAuthenticated && (
          <SecuritySettings 
            isDark={isDark} 
            currentSavedPassword={adminPassword}
            onSave={updatePassword}
            onCancel={() => setView('admin')}
          />
        )}

        {currentView === 'editor' && isAuthenticated && (
           <PostEditor 
             isDark={isDark} 
             post={editingPostId ? posts.find(p => p.id === editingPostId) : undefined}
             onSave={(data) => {
                let up;
                if(editingPostId) {
                   up = posts.map(p => p.id === editingPostId ? {...p, ...data} as Post : p);
                } else {
                   up = [{...data, id: Date.now().toString(), author: 'عبدو', date: new Date().toLocaleDateString('ar-MA')} as Post, ...posts];
                }
                setPosts(up);
                localStorage.setItem('blog_posts', JSON.stringify(up));
                setView('admin');
                setEditingPostId(null);
             }}
             onCancel={() => setView('admin')}
           />
        )}
      </main>

      <footer className="py-32 relative overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl border-t border-zinc-500/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
               <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent mb-8 tracking-tighter">عبدو ويب.</div>
               <p className="text-xl opacity-60 font-medium leading-relaxed max-w-md mb-12">
                 موقع مغربي يهتم بالتقنية وتطوير المهارات الشخصية ومراجعة أحدث المنتجات بحيادية تامة. هدفنا هو إثراء المحتوى العربي بجودة عالمية.
               </p>
               <div className="flex gap-4">
                  {[Star, Globe, Zap].map((Icon, i) => (
                    <div key={i} className="w-14 h-14 rounded-2xl bg-indigo-600/5 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                      <Icon size={24} />
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
               <div className="space-y-8">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">الأقسام الرئيسية</h4>
                  <ul className="space-y-5 font-bold opacity-60 text-lg">
                     <li><button onClick={() => setView('home')}>أخبار المغرب</button></li>
                     <li><button onClick={() => setView('home')}>عالم التقنية</button></li>
                     <li><button onClick={() => setView('home')}>تطوير الذات</button></li>
                     <li><button onClick={() => setView('home')}>تقييم المنتجات</button></li>
                  </ul>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">المزيد</h4>
                  <ul className="space-y-5 font-bold opacity-60 text-lg">
                     <li><a href="#">سياسة الخصوصية</a></li>
                     <li><a href="#">شروط الخدمة</a></li>
                     <li><a href="#">تواصل معنا</a></li>
                     <li><button onClick={() => setView('login')}>دخول الإدارة</button></li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-zinc-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">
               &copy; 2024 ABDOUWEB | MOROCCO DIGITAL EXCELLENCE
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
