
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
  CheckCircle2, MessageCircle, Mail, Instagram, Users
} from 'lucide-react';

const CONTACT_EMAIL = "abdelghaforbahaddou@gmail.com";

const MOCK_POSTS: Post[] = [
  {
    id: 'dirham-floating-2024',
    title: 'تعويم الدرهم المغربي: رحلة نحو المرونة الاقتصادية بين الفرص الواعدة والتحديات الجسيمة',
    excerpt: 'تحليل معمق لمسار تحرير سعر صرف الدرهم المغربي، استكشف الإيجابيات المتوقعة للاقتصاد الوطني، السلبيات المحتملة على القدرة الشرائية، والسبل الكفيلة لمواجهة المخاطر.',
    content: `يعتبر قرار إصلاح نظام سعر صرف الدرهم، أو ما يعرف بـ "التعويم"، من أهم التحولات البنيوية التي شهدها الاقتصاد المغربي في العقد الأخير. هذا المسار الذي بدأه بنك المغرب ووزارة المالية يهدف إلى جعل العملة الوطنية أكثر مرونة وقدرة على امتصاص الصدمات الخارجية.

أولاً: الإيجابيات والفرص الواعدة:
1. تعزيز التنافسية الخارجية: يسمح التعويم للدرهم بالتكيف مع واقع السوق، مما يجعل الصادرات المغربية (خاصة الفوسفاط، السيارات، والمنتجات الفلاحية) أكثر تنافسية في الأسواق العالمية.
2. جذب الاستثمارات الأجنبية: يفضل المستثمرون الأسواق التي تتميز بمرونة في سعر الصرف، حيث يقلل ذلك من مخاطر التعديلات المفاجئة والقوية للعملة.
3. حماية احتياطات الصرف: من خلال السماح للسعر بالتحرك، يقل الضغط على بنك المغرب للتدخل باستخدام العملة الصعبة لدعم الدرهم، مما يحافظ على سيولة البلاد من العملات الأجنبية.

ثانياً: السلبيات والمخاطر المحتملة:
1. ضغوط تضخمية: بما أن المغرب يستورد جزءاً كبيراً من احتياجاته من الطاقة (البترول والغاز) والمواد الأولية، فإن أي انخفاض في قيمة الدرهم يؤدي مباشرة إلى ارتفاع أسعار هذه المواد في السوق الداخلي.
2. التأثير على القدرة الشرائية: الارتفاع في أسعار الواردات قد ينتقل إلى المستهلك النهائي، مما يشكل عبئاً على الطبقة المتوسطة والفقيرة.
3. تقلبات غير متوقعة: في حالة الأزمات العالمية الحادة، قد يشهد الدرهم تقلبات سريعة قد تصعب من مأمورية الفاعلين الاقتصاديين في وضع توقعات مالية دقيقة.

ثالثاً: سبل مواجهة التحديات وضمان النجاح:
1. التنويع الاقتصادي: تقليل الاعتماد على الواردات من خلال تشجيع الصناعة المحلية (صنع في المغرب) يخفف من أثر تقلبات العملة.
2. سياسة نقدية يقظة: استمرار بنك المغرب في نهج سياسة استهداف التضخم والتدخل التدريجي يضمن عدم خروج الأمور عن السيطرة.
3. دعم المقاولات الصغرى والمتوسطة: توفير أدوات مالية للمقاولات لحمايتها من مخاطر الصرف عبر "عقود التحوط".

خاتمة:
إن تعويم الدرهم ليس غاية في حد ذاته، بل هو وسيلة لتحقيق اقتصاد قوي ومنفتح. نجاح هذه التجربة يعتمد بشكل أساسي على مواكبتها بإصلاحات هيكلية ترفع من الإنتاجية الوطنية وتقلل من التبعية للخارج. نحن في "عبدو ويب" سنواصل تتبع هذا الملف الاقتصادي الشائك وتقديم تحليلاتنا لمساعدتكم على فهم التحولات المالية الكبرى.`,
    date: '21 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1611974717537-48358a602114?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'can-morocco-2025',
    title: 'المغرب 2025: عندما تتحول الملاعب إلى تحف فنية تبهر القارة السمراء',
    excerpt: 'استكشف أجواء "الكان" الأسطورية في المملكة المغربية، حيث تلتقي الحداثة بالتقاليد في ملاعب عالمية جاهزة لكتابة التاريخ الإفريقي الجديد.',
    content: `المغرب يثبت للعالم مرة أخرى أنه عاصمة الرياضة الإفريقية بلا منازع. مع اقتراب موعد نهائيات كأس أمم إفريقيا "الكان"، تشهد المملكة ثورة حقيقية في البنية التحتية الرياضية...`,
    date: '20 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'ai-future-morocco',
    title: 'مستقبل الذكاء الاصطناعي في المغرب: كيف نستعد للثورة الرقمية القادمة؟',
    excerpt: 'استكشف التوجهات الجديدة للمغرب الرقمي وكيف يمكن للشباب المغربي الاستفادة من تقنيات الذكاء الاصطناعي في سوق الشغل.',
    content: 'يعيش المغرب اليوم على إيقاع تحول رقمي غير مسبوق...',
    date: '19 مارس 2024',
    author: 'عبدو',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000',
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
    liveVisitors: Math.floor(Math.random() * 20) + 5,
    dailyEarnings: [12.5, 15.2, 8.4, 19.1, 14.5, 22.8, 18.4],
    ctr: "2.4%",
    cpc: "$0.12"
  });

  useEffect(() => {
    const savedPassword = localStorage.getItem('admin_password');
    if (savedPassword) setAdminPassword(savedPassword);
    
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        // If the user has old data, we merge it with defaults instead of just ignoring defaults
        if (parsed.length > 0) {
          setPosts(parsed);
        } else {
          setPosts(MOCK_POSTS);
          localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
        }
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

    const views = parseInt(localStorage.getItem('total_views') || '0');
    const newViews = views + 1;
    localStorage.setItem('total_views', newViews.toString());
    setAnalytics(prev => ({ ...prev, totalViews: newViews }));

    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        liveVisitors: Math.max(3, prev.liveVisitors + (Math.random() > 0.5 ? 1 : -1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const handleSyncData = () => {
    // Logic to find posts in MOCK_POSTS that aren't in current posts
    const currentIds = new Set(posts.map(p => p.id));
    const newDefaults = MOCK_POSTS.filter(p => !currentIds.has(p.id));
    
    if (newDefaults.length > 0) {
      const updatedPosts = [...newDefaults, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
    } else {
      // If everything exists, force refresh from MOCK_POSTS just in case of updates
      const refreshedPosts = [...posts];
      MOCK_POSTS.forEach(mock => {
        const index = refreshedPosts.findIndex(p => p.id === mock.id);
        if (index !== -1) {
          refreshedPosts[index] = { ...refreshedPosts[index], ...mock };
        }
      });
      setPosts(refreshedPosts);
      localStorage.setItem('blog_posts', JSON.stringify(refreshedPosts));
    }
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredPost = posts[0];

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        setView={(v) => v === 'admin' && !isAuthenticated ? setView('login') : setView(v)} 
        currentView={currentView}
        liveVisitors={analytics.liveVisitors}
      />
      
      <main className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        {currentView === 'home' && (
          <div className="animate-fade-in space-y-24">
            
            <header className="relative py-12 flex flex-col items-center text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
              
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full glass-card text-[11px] font-black uppercase tracking-[0.2em] text-emerald-500 border border-emerald-500/10">
                <Sparkles size={14} className="animate-pulse" /> وجهتك الأولى للمحتوى الهادف
              </div>

              <h1 className="text-6xl md:text-[8rem] font-black mb-8 leading-[0.85] tracking-tighter text-black dark:text-white">
                عبدو <span className="text-emerald-500">ويب.</span>
              </h1>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-70 font-medium leading-relaxed mb-12 px-4">
                مدونة احترافية تجمع بين <span className="text-emerald-500 font-bold underline decoration-emerald-200">أخبار المغرب</span>، 
                عالم <span className="text-emerald-500 font-bold underline decoration-emerald-200">التقنية</span>، 
                وحيادية <span className="text-emerald-500 font-bold underline decoration-emerald-200">تطوير الذات</span>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
                {[
                  { icon: Newspaper, label: 'أخبار المغرب', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
                  { icon: Cpu, label: 'تقنية', color: 'bg-zinc-900/10 text-zinc-900 dark:text-emerald-400 border-zinc-900/20 dark:border-emerald-500/20' },
                  { icon: BookOpen, label: 'تطوير الذات', color: 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' }
                ].map((cat, i) => (
                  <div key={i} className={`flex flex-col items-center gap-3 p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer hover:scale-105 glass-card ${cat.color}`}>
                    <cat.icon size={32} />
                    <span className="font-black text-sm uppercase tracking-widest">{cat.label}</span>
                  </div>
                ))}
              </div>
            </header>

            {featuredPost && (
              <section className="relative group">
                <div 
                  onClick={() => navigateToPost(featuredPost.id)}
                  className="relative glass-card rounded-[4rem] overflow-hidden flex flex-col lg:flex-row cursor-pointer shadow-2xl border-emerald-500/5 group"
                >
                  <div className="lg:w-3/5 h-[500px] lg:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={featuredPost.title}
                    />
                  </div>
                  <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center bg-white/50 dark:bg-black/50 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-[2px] bg-emerald-500"></span>
                      <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">المقال المميز</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-black dark:text-white group-hover:text-emerald-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg opacity-60 mb-10 leading-relaxed font-medium line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <button className="flex items-center gap-3 text-sm font-black text-emerald-500 uppercase tracking-widest group-hover:gap-5 transition-all">
                      اقرأ المقال كاملاً <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-16">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-right">
                  <h2 className="text-4xl font-black tracking-tighter">أحدث المنشورات</h2>
                  <p className="text-xs opacity-40 font-black mt-1 uppercase tracking-[0.5em]">Explore our latest insights</p>
                </div>
                <div className="h-[1px] flex-grow mx-8 bg-emerald-500/10 hidden md:block"></div>
                <div className="flex gap-2">
                   {[1, 2, 3].map(i => <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-emerald-500' : 'bg-emerald-500/10'}`}></div>)}
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

        {currentView === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto py-10 animate-fade-in">
             <header className="mb-16 text-center">
                <button 
                  onClick={() => setView('home')} 
                  className="mb-12 text-[11px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-3 border border-emerald-500/20 px-6 py-2 rounded-full"
                >
                   ← العودة للرئيسية
                </button>
                <div className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-6">
                  {selectedPost.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-black dark:text-white">
                  {selectedPost.title}
                </h1>
                <div className="flex justify-center items-center gap-8 text-[11px] font-black uppercase tracking-widest opacity-40">
                   <div className="flex items-center gap-2">بواسطة <span className="text-black dark:text-white font-black">{selectedPost.author}</span></div>
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                   <span>{selectedPost.date}</span>
                </div>
             </header>

             <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl mb-16 aspect-video">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
             </div>

             <div className={`prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.8] font-medium whitespace-pre-wrap px-4 mb-20 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                {selectedPost.content}
             </div>

             <section className={`pt-12 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="text-center lg:text-right">
                    <h4 className="text-xl font-black mb-2">هل أعجبك المقال؟</h4>
                    <p className="text-sm opacity-50 font-medium">شارك الفائدة مع أصدقائك أو تواصل معي مباشرة</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a href={`mailto:${CONTACT_EMAIL}?subject=بخصوص مقال: ${selectedPost.title}`} className="w-14 h-14 rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 transition-all flex items-center justify-center shadow-lg"><Mail size={24} /></a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center shadow-lg"><Facebook size={24} fill="currentColor" /></a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-black text-white hover:bg-zinc-800 transition-all flex items-center justify-center shadow-lg border border-white/5"><Twitter size={24} fill="currentColor" /></a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + " " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center shadow-lg"><MessageCircle size={24} fill="currentColor" /></a>
                    <button onClick={copyToClipboard} className={`w-14 h-14 rounded-2xl transition-all flex items-center justify-center shadow-lg ${copied ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-white hover:bg-emerald-500 hover:text-black'}`}>{copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}</button>
                  </div>
                </div>
             </section>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={handleLogin} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} 
            isDark={isDark} 
            analytics={analytics}
            onNewPost={() => setView('editor')} 
            onEditPost={(id) => { setEditingPostId(id); setView('editor'); }}
            onDeletePost={(id) => {
               const up = posts.filter(p => p.id !== id);
               setPosts(up);
               localStorage.setItem('blog_posts', JSON.stringify(up));
            }}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
            onSyncData={handleSyncData}
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

      <footer className="py-32 relative overflow-hidden bg-zinc-50 dark:bg-black border-t border-emerald-500/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
               <div className="text-5xl font-black bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent mb-8 tracking-tighter">عبدو ويب.</div>
               <p className="text-xl opacity-60 font-medium leading-relaxed max-w-md mb-12">
                 موقع مغربي يهتم بالتقنية وتطوير المهارات الشخصية ومراجعة أحدث المنتجات بحيادية تامة. هدفنا هو إثراء المحتوى العربي بجودة عالمية.
               </p>
               <div className="flex gap-4">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                    <Mail size={24} />
                  </a>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                    <Facebook size={24} />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                    <Instagram size={24} />
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
               <div className="space-y-8">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">الأقسام الرئيسية</h4>
                  <ul className="space-y-5 font-bold opacity-60 text-lg">
                     <li><button onClick={() => setView('home')}>أخبار المغرب</button></li>
                     <li><button onClick={() => setView('home')}>عالم التقنية</button></li>
                     <li><button onClick={() => setView('home')}>تطوير الذات</button></li>
                     <li><button onClick={() => setView('home')}>تقييم المنتجات</button></li>
                  </ul>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">المزيد</h4>
                  <ul className="space-y-5 font-bold opacity-60 text-lg">
                     <li><a href="#">سياسة الخصوصية</a></li>
                     <li><a href="#">شروط الخدمة</a></li>
                     <li><a href={`mailto:${CONTACT_EMAIL}`}>تواصل معنا</a></li>
                     <li><button onClick={() => setView('login')}>دخول الإدارة</button></li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-emerald-500/10">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic text-center">
               &copy; 2024 ABDOUWEB | {CONTACT_EMAIL}
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
