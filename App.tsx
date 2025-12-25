
import React, { useState, useEffect } from 'react';
import { Post, View, AdSenseConfig, AnalyticsData } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PostCard } from './components/PostCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { PostEditor } from './components/PostEditor.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';
import { SecuritySettings } from './components/SecuritySettings.tsx';
import { 
  ArrowRight, Sparkles, TrendingUp, Zap, Newspaper, User, ChevronLeft
} from 'lucide-react';

// مفتاح التخزين الجديد لضمان المسح الشامل للنسخ القديمة
const STORAGE_KEY = 'abdou_infinity_v4';
const APP_VERSION = "4.0.0";

const MOCK_POSTS: Post[] = [
  {
    id: 'olive-oil-2024-final',
    title: 'حصري: انخفاض أسعار زيت الزيتون بالمغرب 2024 يبث التفاؤل في الأسواق الوطنية',
    excerpt: 'بعد فترة من الغلاء، تشهد معاصر الزيتون بمختلف ربوع المملكة وفرة في الإنتاج وانخفاضاً ملموساً في الأثمان، مما يجعله متاحاً لجميع الأسر المغربية.',
    content: `بشرى سارة للمغاربة؛ لقد بدأت أسعار زيت الزيتون بالاستقرار والانخفاض الملحوظ في أغلب المناطق المنتجة بالمملكة. موسم 2024 يتميز بجودة عالية بفضل التساقطات المطرية التي عرفتها مناطق الأطلس والريف.

أبرز مستجدات الموسم:
1. وفرة العرض في الأسواق: مما أدى لتراجع السعر بنسبة تتراوح بين 20% و 30% مقارنة بالموسم الماضي.
2. جودة "البكر الممتاز": المعاصر الحديثة سجلت مستويات حموضة منخفضة جداً، مما يرفع من القيمة الغذائية للمنتوج.
3. المراقبة الصارمة: لجان اليقظة تتابع الأسعار لمنع الاحتكار وضمان وصول الزيت للمواطن بأفضل ثمن.

نصيحة "عبدو ويب": يفضل دائماً الشراء مباشرة من المعاصر المعتمدة لضمان الجودة والثمن المناسب. نحن نتابع معكم كل جديد في الأسواق المغربية أولاً بأول.`,
    date: '28 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'ai-morocco-future',
    title: 'المغرب والذكاء الاصطناعي: ثورة رقمية صامتة تقودها الكفاءات الشابة 2025',
    excerpt: 'استكشاف لمدى تطور مراكز البيانات والذكاء الاصطناعي في المملكة وكيف يستفيد المبرمجون المغاربة من هذا التحول.',
    content: `تتحول المملكة المغربية اليوم إلى قطب تكنولوجي رائد في القارة الإفريقية. من خلال استثمارات ضخمة في البنية التحتية الرقمية، أصبح المغرب وجهة مفضلة لكبرى شركات التكنولوجيا العالمية.`,
    date: '26 مارس 2024',
    author: 'عبدو',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  }
];

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("abdou2024");
  const [analytics] = useState<AnalyticsData>({
    totalViews: 5200,
    liveVisitors: 64,
    dailyEarnings: [15, 20, 25, 30, 28, 35, 40],
    ctr: "3.1%",
    cpc: "$0.15"
  });

  const resetAndSync = (force = false) => {
    if (force || !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS));
      setPosts(MOCK_POSTS);
      console.log("Infinity v4: Hard Reset Performed");
    } else {
      setPosts(JSON.parse(localStorage.getItem(STORAGE_KEY)!));
    }
  };

  useEffect(() => {
    resetAndSync();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDark(false);
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const navigateToPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setView('post');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const featured = posts[0] || MOCK_POSTS[0];

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
        setView={setView} 
        currentView={currentView}
        liveVisitors={analytics.liveVisitors}
        isAuthenticated={isAuthenticated}
      />

      <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        {currentView === 'home' && (
          <div className="space-y-40">
            {/* Ultra Hero Section */}
            <section className="animate-fade-in">
              <div 
                onClick={() => navigateToPost(featured.id)}
                className="group relative h-[85vh] w-full rounded-[4rem] overflow-hidden cursor-pointer shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
              >
                <img src={featured.image} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-24 text-white">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-5 py-1.5 rounded-full bg-emerald-500 text-black text-xs font-black uppercase tracking-widest">مقال الغلاف الرئيسي</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-2"><Sparkles size={16} /> حصري اليوم</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter max-w-6xl text-balance">
                    {featured.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-70 mb-14 max-w-3xl font-medium leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <button className="flex items-center gap-4 bg-white text-black px-12 py-6 rounded-3xl font-black hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                    اقرأ الآن <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </section>

            {/* Content Explorer */}
            <section className="space-y-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">اكتشف المزيد</h2>
                  <p className="text-xl opacity-40 font-bold">أحدث المقالات المختارة بعناية</p>
                </div>
                <div className="flex gap-4">
                   {['أخبار المغرب', 'تقنية', 'تطوير'].map(c => (
                     <button key={c} className="px-8 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-black text-xs uppercase tracking-widest hover:border-emerald-500 transition-all">{c}</button>
                   ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                {posts.slice(1).map(post => (
                  <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
                ))}
              </div>
            </section>

            {/* Newsletter Premium */}
            <section className="infinity-card p-16 md:p-32 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">ابقَ على اتصال.</h2>
              <p className="text-xl md:text-2xl opacity-50 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">انضم إلى مجتمع عبدو ويب واحصل على أهم الأخبار والتحليلات مباشرة في بريدك الإلكتروني.</p>
              <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                <input type="email" placeholder="أدخل بريدك الإلكتروني هنا" className="flex-1 px-10 py-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border-none outline-none font-black text-lg shadow-inner" />
                <button className="bg-emerald-500 text-black px-14 py-6 rounded-3xl font-black text-lg shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)] hover:scale-105 transition-all">اشترك</button>
              </div>
            </section>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <article className="max-w-5xl mx-auto animate-fade-in py-10">
            <header className="mb-24">
               <button onClick={() => setView('home')} className="group mb-16 flex items-center gap-4 text-sm font-black opacity-30 hover:opacity-100 transition-all uppercase tracking-widest">
                 <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-transparent group-hover:text-black transition-all">
                   <ChevronLeft size={20} />
                 </div>
                 العودة للمنصة الرئيسية
               </button>
               <h1 className="text-6xl md:text-9xl font-black mb-14 leading-[0.9] tracking-tighter text-balance">{selectedPost.title}</h1>
               <div className="flex items-center gap-8 text-sm font-black opacity-40 uppercase tracking-widest">
                  <span className="flex items-center gap-3"><User size={18} className="text-emerald-500" /> {selectedPost.author}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>{selectedPost.date}</span>
                  <span className="px-6 py-2 rounded-full border border-emerald-500/20 text-emerald-500">{selectedPost.category}</span>
               </div>
            </header>
            
            <div className="aspect-[21/9] rounded-[4rem] overflow-hidden mb-24 shadow-4xl group">
              <img src={selectedPost.image} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
            </div>
            
            <div className="prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[2] font-medium whitespace-pre-wrap mb-40 text-justify">
              {selectedPost.content}
            </div>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p===adminPassword){setIsAuthenticated(true); sessionStorage.setItem('admin_auth','true'); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} isDark={isDark} analytics={analytics}
            onNewPost={() => setView('editor')} 
            onEditPost={(id) => {}} 
            onDeletePost={(id) => { const n = posts.filter(p => p.id !== id); setPosts(n); localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); }}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
            onSyncData={() => resetAndSync(true)}
            appVersion={APP_VERSION}
          />
        )}

        {currentView === 'editor' && isAuthenticated && (
           <PostEditor isDark={isDark} onSave={(data) => {
              const newPosts = [{...data, id: Date.now().toString(), author: 'عبدو', date: new Date().toLocaleDateString('ar-MA')} as Post, ...posts];
              setPosts(newPosts);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
              setView('admin');
           }} onCancel={() => setView('admin')} />
        )}

        {currentView === 'security-settings' && isAuthenticated && (
           <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => setAdminPassword(p)} onCancel={() => setView('admin')} onForceResetData={() => resetAndSync(true)} />
        )}
      </main>

      {/* Infinity Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-32 mt-40">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
          <div className="space-y-10">
            <h3 className="text-4xl font-black tracking-tighter italic">عبدو <span className="text-emerald-500">ويب</span></h3>
            <p className="opacity-40 font-medium text-lg leading-relaxed max-w-xs">المنصة الرائدة للأخبار والتحليلات العميقة في المغرب والوطن العربي بلمسة عصرية عالمية.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">المنصة</h4>
              <ul className="space-y-4 font-bold opacity-60">
                <li><button onClick={() => setView('home')}>الرئيسية</button></li>
                <li><button onClick={() => setView('home')}>أخبار المغرب</button></li>
                <li><button onClick={() => setView('home')}>تقنية</button></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">القانونية</h4>
              <ul className="space-y-4 font-bold opacity-60">
                <li><a href="#">الخصوصية</a></li>
                <li><a href="#">الشروط</a></li>
                <li><a href="#">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          <div className="space-y-8 md:text-left">
            <div className="text-[10px] font-black opacity-20 uppercase tracking-[0.5em]">Infinity v4.0.0 Global Edition</div>
            <div className="text-sm font-bold opacity-40">© 2024 ABDOUWEB. صنع بشغف للتميز الرقمي.</div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
