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
import { 
  ArrowRight, Zap, RefreshCw, TrendingUp, Sparkles
} from 'lucide-react';

const APP_VERSION = "2.0.0"; // إصدار جديد كلياً لتغيير التصميم
const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1611974714851-eb6051612253?auto=format&fit=crop&q=80&w=2000";

const MOCK_POSTS: Post[] = [
  {
    id: 'olive-oil-morocco-2024',
    title: 'زيت الزيتون في المغرب 2024: وفرة في الإنتاج وانخفاض ملحوظ في الأسعار يثلج صدور المغاربة',
    excerpt: 'بعد سنوات من الارتفاع الجنوني، يشهد موسم زيت الزيتون بالمغرب انفراجة كبيرة مع توفر المنتوج بكثرة وتراجع الأسعار في المعاصر الوطنية.',
    content: `يعتبر زيت الزيتون، أو "الذهب الأخضر" كما يحلو للمغاربة تسميته، مادة أساسية لا تخلو منها مائدة مغربية. وبعد سنتين من الجفاف وارتفاع الأسعار الذي أرهق كاهل المواطن، يحمل موسم 2024 بشائر خير كبيرة.

أولاً: وفرة في المنتوج:
بفضل التساقطات المطرية الأخيرة في المناطق المنتجة كقلعة السراغنة، تاونات، وبني ملال، سجلت المحاصيل أرقاماً مشجعة جداً. المعاصر اليوم تشهد حركية غير مسبوقة، مما يدل على استعادة القطاع لعافيته.

ثانياً: انعكاس الأسعار على القدرة الشرائية:
سجلت أسواق الجملة والتقسيط انخفاضاً ملموساً في ثمن اللتر الواحد مقارنة بالسنة الماضية. هذا التراجع مكن الأسر المغربية، خاصة ذات الدخل المحدود، من اقتناء حاجياتها السنوية بظروف مريحة، مما خفف من حدة التضخم في المواد الغذائية.

ثالثاً: الجودة والمنافسة:
الوفرة لم تكن على حساب الجودة؛ فالمنافسة بين المنتجين والمصانع أدت إلى توفير زيت بكر ممتاز بمواصفات عالمية، مما يفتح آفاقاً واعدة أيضاً للتصدير وتعزيز العلامة التجارية "صنع في المغرب".

خاتمة:
عودة زيت الزيتون إلى سعره المعقول هي أكثر من مجرد خبر اقتصادي، إنها عودة لطقس من طقوس الحياة المغربية الأصيلة. نحن في "عبدو ويب" نتمنى أن يستمر هذا الازدهار ليشمل كافة المواد الأساسية.`,
    date: '25 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'can-morocco-2025',
    title: 'المغرب 2025: عندما تتحول الملاعب إلى تحف فنية تبهر القارة السمراء',
    excerpt: 'استكشف أجواء "الكان" الأسطورية في المملكة المغربية، حيث تلتقي الحداثة بالتقاليد في ملاعب عالمية جاهزة لكتابة التاريخ الإفريقي الجديد.',
    content: `المغرب يثبت للعالم مرة أخرى أنه عاصمة الرياضة الإفريقية بلا منازع. مع اقتراب موعد نهائيات كأس أمم إفريقيا "الكان"، تشهد المملكة ثورة حقيقية في البنية التحتية الرياضية.`,
    date: '20 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  }
];

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("abdou2024");
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>({ publisherId: '', slotId: '', isEnabled: false });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 1540,
    liveVisitors: 24,
    dailyEarnings: [8.5, 12.2, 10.4, 15.1, 11.5, 18.8, 14.4],
    ctr: "1.8%",
    cpc: "$0.08"
  });

  const handleSyncData = (forceReset = false) => {
    if (forceReset) {
      localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
      setPosts(MOCK_POSTS);
      return;
    }
    const saved = localStorage.getItem('blog_posts');
    let current = saved ? JSON.parse(saved) : [];
    
    // إجبار مقال زيت الزيتون على الظهور في المقدمة
    const filtered = current.filter((p: Post) => p.id !== 'olive-oil-morocco-2024');
    const final = [MOCK_POSTS[0], ...filtered];
    
    setPosts(final);
    localStorage.setItem('blog_posts', JSON.stringify(final));
    localStorage.setItem('app_version', APP_VERSION);
  };

  useEffect(() => {
    const savedVer = localStorage.getItem('app_version');
    if (savedVer !== APP_VERSION) handleSyncData(true);
    else {
      const savedPosts = localStorage.getItem('blog_posts');
      if (savedPosts) setPosts(JSON.parse(savedPosts));
      else handleSyncData(true);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const navigateToPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setView('post');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const featuredPost = posts.find(p => p.id === 'olive-oil-morocco-2024') || posts[0];

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} toggleTheme={toggleTheme} 
        setView={setView} currentView={currentView}
        liveVisitors={analytics.liveVisitors}
        isAuthenticated={isAuthenticated}
      />

      <main className="pt-32 pb-20 container mx-auto px-6 relative">
        {currentView === 'home' && (
          <div className="animate-fade-in space-y-20">
            {/* New Hero Section */}
            {featuredPost && (
              <section className="relative mt-12 group">
                <div 
                  onClick={() => navigateToPost(featuredPost.id)}
                  className="relative neo-card rounded-[3rem] overflow-hidden flex flex-col lg:flex-row cursor-pointer group shadow-2xl border-white/20"
                >
                  <div className="lg:w-1/2 h-[450px] lg:h-[600px] overflow-hidden relative">
                    <img src={featuredPost.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>
                  </div>
                  <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                       <TrendingUp size={200} />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="bg-emerald-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">مقال اليوم</span>
                      <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Sparkles size={14}/> حصري</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-black dark:text-white group-hover:text-emerald-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg opacity-70 mb-12 leading-relaxed font-medium line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <button className="w-fit flex items-center gap-4 bg-black dark:bg-emerald-500 dark:text-black text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl">
                      اكتشف التفاصيل <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Grid for other posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.filter(p => p.id !== featuredPost?.id).map(post => (
                <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto py-10 animate-fade-in">
             <header className="mb-16 text-center">
                <button onClick={() => setView('home')} className="mb-8 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity px-6 py-2 rounded-full border border-current">العودة للرئيسية</button>
                <h1 className="text-5xl md:text-7xl font-black mb-10 leading-tight text-black dark:text-white">{selectedPost.title}</h1>
             </header>
             <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 aspect-video neo-card">
                <img src={selectedPost.image} className="w-full h-full object-cover" />
             </div>
             <div className="prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.8] font-medium whitespace-pre-wrap mb-20">
               {selectedPost.content}
             </div>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p===adminPassword){setIsAuthenticated(true); sessionStorage.setItem('admin_auth','true'); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} isDark={isDark} analytics={analytics}
            onNewPost={() => setView('editor')} 
            onEditPost={() => {}} 
            onDeletePost={() => {}}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
            onSyncData={() => handleSyncData(true)}
            appVersion={APP_VERSION}
          />
        )}
      </main>

      {isAuthenticated && (
        <button 
          onClick={() => { handleSyncData(true); alert('تمت إعادة ضبط المزامنة الشاملة بنجاح!'); }}
          className="fixed bottom-10 left-10 z-[100] w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-2xl hover:rotate-180 transition-all duration-700"
        >
          {/* Fix: Use RefreshCw as it is the icon name intended and correctly available in lucide-react */}
          <RefreshCw size={28} />
        </button>
      )}
    </Layout>
  );
};

export default App;