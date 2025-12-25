
import React, { useState, useEffect } from 'react';
import { Post, View, AdSenseConfig } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PostCard } from './components/PostCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';
import { AdSenseSettings } from './components/AdSenseSettings.tsx';
import { AdSense } from './components/AdSense.tsx';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'استراتيجية المغرب الرقمي 2030: رؤية عبدو ويب للتحول القادم',
    excerpt: 'تحليل شامل للتحول الرقمي في المغرب وكيف سيؤثر على الخدمات الحكومية والقطاع الخاص في السنوات القادمة.',
    content: 'أطلق المغرب مؤخراً استراتيجية "المغرب الرقمي 2030" التي تهدف إلى رقمنة الخدمات العمومية وتطوير الاقتصاد الرقمي. تشمل الخطة خلق آلاف مناصب الشغل في مجال التكنولوجيا وتعزيز مكانة المغرب كقطب إقليمي للابتكار. في هذا المقال من عبدو ويب، نستعرض أهم الركائز التي تعتمد عليها هذه الخطة الطموحة وكيف يمكن للمقاولين الشباب الاستفادة منها.',
    date: '15 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1539103377911-4909a1aba491?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '2',
    title: 'دليل عبدو ويب: أفضل 5 برامج أفلييت للمغاربة في 2024',
    excerpt: 'دليل كامل للربح من التسويق بالعمولة في المغرب، من المواقع المحلية إلى المنصات العالمية مثل أمازون.',
    content: 'التسويق بالعمولة أو "الأفلييت" أصبح من أكثر الطرق شعبية لتحقيق دخل إضافي في المغرب. سواء كنت تستهدف السوق المحلي عبر منصات مثل "جوميا" أو "شي إن"، أو السوق العالمي عبر "أمازون" و "كليك بانك"، هناك استراتيجيات معينة للنجاح. نناقش في هذا المقال عبر منصة عبدو ويب كيفية اختيار المنتج المناسب وبناء جمهور مخلص.',
    date: '12 مارس 2024',
    author: 'عبدو',
    category: 'أفلييت',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '3',
    title: 'عقلية النمو: كيف يرى عبدو ويب سر النجاح المهني؟',
    excerpt: 'تطوير الذات ليس مجرد كلمات تحفيزية، بل هو نظام حياة. تعلم كيف تعيد برمجة تفكيرك للنجاح.',
    content: 'في عالم سريع التغير، تعد عقلية النمو (Growth Mindset) السلاح الأقوى لمواجهة التحديات. في هذا المقال، نستعرض نصائح عملية لتطوير مهاراتك الشخصية، إدارة وقتك بفعالية، والتعامل مع الفشل كفرصة للتعلم. سنركز على تجارب ملهمة لمقاولين مغاربة استطاعوا تغيير حياتهم عبر الانضباط الذاتي، وهو ما نشجعه دائماً في عبدو ويب.',
    date: '10 مارس 2024',
    author: 'عبدو',
    category: 'تطوير الذات',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  }
];

const ADMIN_PASSWORD = "abdou2024";

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>({
    publisherId: '',
    slotId: '',
    isEnabled: false
  });

  // Inject JSON-LD Schema for articles dynamically
  useEffect(() => {
    if (currentView === 'post' && selectedPost) {
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "image": selectedPost.image,
        "author": {
          "@type": "Person",
          "name": selectedPost.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Abdouweb",
          "logo": {
            "@type": "ImageObject",
            "url": "https://abdouweb.com/logo.png"
          }
        },
        "datePublished": selectedPost.date,
        "description": selectedPost.excerpt
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld-article';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
      
      return () => {
        const oldScript = document.getElementById('json-ld-article');
        if (oldScript) oldScript.remove();
      };
    }
  }, [currentView, selectedPost]);

  useEffect(() => {
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
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setView('admin');
      return true;
    }
    return false;
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setView('admin');
    } else {
      setView('login');
    }
  };

  const handleSaveAdSense = (config: AdSenseConfig) => {
    setAdsenseConfig(config);
    localStorage.setItem('adsense_config', JSON.stringify(config));
    setView('admin');
  };

  const handleSavePost = (newPostData: Partial<Post>) => {
    let updatedPosts;
    if (editingPostId) {
      updatedPosts = posts.map(p => p.id === editingPostId ? { ...p, ...newPostData } as Post : p);
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        author: 'عبدو',
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'published',
        title: '',
        excerpt: '',
        content: '',
        category: 'تكنولوجيا',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        ...(newPostData as Post)
      };
      updatedPosts = [newPost, ...posts];
    }
    setPosts(updatedPosts);
    localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
    setView('admin');
    setEditingPostId(null);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المقالة نهائياً؟')) {
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
    }
  };

  const navigateToPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setView('post');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        setView={(v) => v === 'admin' ? handleAdminAccess() : setView(v)} 
        currentView={currentView}
      />
      
      <main className="pt-32 pb-20 hero-gradient min-h-screen container mx-auto px-4 md:px-8">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <section className="text-center mb-24 py-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                عبد وويب | المنصة الأولى تقنياً في المغرب
              </div>
              <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[1.1] tracking-tighter">
                عالمك الرقمي يبدأ <br />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  من هنا.
                </span>
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                اكتشف آخر أخبار المغرب التقنية، استراتيجيات الأفلييت المتقدمة، ودروس النجاح المهني بأسلوب عصري.
              </p>
              
              <AdSense config={adsenseConfig} isDark={isDark} className="mb-12 max-w-4xl mx-auto" />

              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105"
                >
                  استكشف المقالات
                </button>
              </div>
            </section>

            <div id="latest-posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.filter(p => p.status === 'published').map((post, index) => (
                <React.Fragment key={post.id}>
                  <PostCard post={post} isDark={isDark} onClick={navigateToPost} />
                  {(index + 1) % 3 === 0 && adsenseConfig.isEnabled && (
                    <div className="md:col-span-2 lg:col-span-3 py-10">
                      <AdSense config={adsenseConfig} isDark={isDark} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {currentView === 'login' && (
          <AdminLogin isDark={isDark} onLogin={handleLogin} onCancel={() => setView('home')} />
        )}

        {currentView === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto py-10 animate-fade-in">
            <nav className="mb-12">
              <button 
                onClick={() => setView('home')} 
                className="group flex items-center gap-3 text-indigo-600 font-black hover:pr-4 transition-all"
              >
                <span>←</span> العودة للمقالات
              </button>
            </nav>

            <header className="mb-12">
              <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-video border-8 border-white/5 dark:border-zinc-900/50">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-12 right-12 left-12">
                  <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.15] mb-6 tracking-tighter">{selectedPost.title}</h1>
                  <div className="flex items-center gap-6 text-white/80 text-sm font-black uppercase tracking-widest">
                    <span className="bg-indigo-600 px-4 py-1 rounded-full text-white">{selectedPost.category}</span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                    <span>{selectedPost.date}</span>
                  </div>
                </div>
              </div>
            </header>

            <AdSense config={adsenseConfig} isDark={isDark} className="mb-12" />

            <div className={`prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.8] whitespace-pre-wrap font-medium tracking-wide ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {selectedPost.content}
            </div>

            <AdSense config={adsenseConfig} isDark={isDark} className="mt-12" />
          </article>
        )}

        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} 
            isDark={isDark} 
            onNewPost={() => { setEditingPostId(null); setView('editor'); }} 
            onEditPost={(id) => { setEditingPostId(id); setView('editor'); }}
            onDeletePost={handleDeletePost}
            onOpenAdSense={() => setView('adsense-settings')}
          />
        )}

        {currentView === 'adsense-settings' && isAuthenticated && (
          <AdSenseSettings 
            config={adsenseConfig} 
            isDark={isDark} 
            onSave={handleSaveAdSense} 
            onCancel={() => setView('admin')} 
          />
        )}

        {currentView === 'editor' && isAuthenticated && (
          <PostEditor 
            isDark={isDark}
            post={editingPostId ? posts.find(p => p.id === editingPostId) : undefined}
            onSave={handleSavePost}
            onCancel={() => setView('admin')}
          />
        )}
      </main>

      <footer className={`py-20 border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 text-right">
          <div className="md:col-span-2">
            <div className="flex flex-col mb-8">
              <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent leading-none mb-3">عبدو ويب.</div>
              <div className={`text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Abdouweb Media</div>
            </div>
            <p className={`max-w-md leading-loose font-medium text-lg ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              المنصة المغربية الرائدة في تقاطع التكنولوجيا والنجاح الشخصي. نهدف لتمكين الشباب المغربي من أدوات العصر الرقمي.
            </p>
          </div>
          <div>
            <h4 className="font-black text-2xl mb-8">استكشف</h4>
            <ul className={`space-y-4 text-[15px] font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <li><button onClick={() => setView('home')} className="hover:text-indigo-600 transition-colors">الرئيسية</button></li>
              <li><button onClick={() => handleAdminAccess()} className="hover:text-indigo-600 transition-colors">لوحة الإدارة</button></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">عالم الأفلييت</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-2xl mb-8">تواصل</h4>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-black border border-indigo-600/20">FB</div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-black border border-indigo-600/20">IG</div>
            </div>
            <p className="mt-8 text-sm font-black opacity-40 uppercase tracking-tighter italic">connect@abdouweb.com</p>
          </div>
          <div className="md:col-span-4 pt-12 border-t border-zinc-800/10 text-center">
            <div className="text-[11px] font-black uppercase tracking-[0.6em] opacity-40 mb-3">
               ABDOUWEB | عبدو ويب - 2024
            </div>
            <div className="text-[10px] font-bold opacity-30">
               مصمم خصيصاً لسرعة الأداء وتجربة المستخدم المثالية (Core Web Vitals Optimized)
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
