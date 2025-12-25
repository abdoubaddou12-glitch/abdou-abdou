
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
  ArrowRight, Sparkles, TrendingUp, Compass, Newspaper, Cpu, User
} from 'lucide-react';

// تغيير مفتاح التخزين يضمن حذف الكاش القديم فوراً
const STORAGE_KEY = 'abdou_quantum_v3';
const APP_VERSION = "3.0.0";

const MOCK_POSTS: Post[] = [
  {
    id: 'olive-2024',
    title: 'بشائر الذهب الأخضر: ثورة في إنتاج زيت الزيتون بالمغرب وانخفاض تاريخي في الأسعار',
    excerpt: 'تغطية حصرية لموسم جني الزيتون 2024 في المغرب، حيث سجلت المعاصر أرقاماً قياسية تزامناً مع تراجع الأسعار بنسبة 30%.',
    content: `يشهد المغرب هذا العام طفرة غير مسبوقة في قطاع زيت الزيتون. فبعد سنوات من القلق بسبب الجفاف، جاءت التساقطات الأخيرة لتعيد الأمل لملايين المغاربة.

لماذا ينخفض السعر الآن؟
1. وفرة العرض: المناطق الكبرى مثل قلعة السراغنة وتاونات سجلت محاصيل استثنائية.
2. السياسات الحكومية: دعم الفلاحين والآليات الحديثة قلل من تكلفة الاستخراج.
3. الرقابة: تشديد المراقبة على المضاربين ساهم في وصول الزيت مباشرة للمستهلك بأسعار معقولة.

كيف تختار الزيت الأفضل؟
ينصح الخبراء دائماً بالتوجه نحو المعاصر العصرية التي تضمن جودة عصر "البكر الممتاز" (Extra Virgin) بدرجة حموضة لا تتجاوز 0.8%.

نحن في "عبدو ويب" نبارك للمغاربة هذا الرخاء ونتمنى أن يكون فاتحة خير لباقي المواد الأساسية.`,
    date: '27 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  },
  {
    id: 'tech-morocco',
    title: 'المغرب الرقمي 2025: كيف تتحول المملكة إلى قطب عالمي للذكاء الاصطناعي؟',
    excerpt: 'تحليل لنمو الشركات الناشئة في المغرب والتوجه الجديد نحو الاستثمار في التكنولوجيا الفائقة.',
    content: `المغرب لم يعد مجرد مستهلك للتكنولوجيا، بل أصبح مصدراً لها. من خلال مجمعات تكنولوجية عالمية، تستقطب المملكة اليوم كبرى شركات البرمجة والذكاء الاصطناعي.`,
    date: '25 مارس 2024',
    author: 'عبدو',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000',
    status: 'published'
  }
];

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true); // افتراضياً الوضع الليلي لأنه أكثر احترافية
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("abdou2024");
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 3840,
    liveVisitors: 42,
    dailyEarnings: [12, 15, 18, 22, 19, 25, 30],
    ctr: "2.4%",
    cpc: "$0.12"
  });

  const syncQuantumData = (force = false) => {
    if (force) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS));
      setPosts(MOCK_POSTS);
      return;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS));
      setPosts(MOCK_POSTS);
    } else {
      setPosts(JSON.parse(saved));
    }
  };

  useEffect(() => {
    syncQuantumData();
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

      <main className="container mx-auto px-6 pt-32 pb-24">
        {currentView === 'home' && (
          <div className="space-y-32">
            {/* Hero Section */}
            <section className="animate-fade-up">
              <div 
                onClick={() => navigateToPost(featured.id)}
                className="group relative h-[80vh] w-full rounded-[3rem] overflow-hidden cursor-pointer shadow-3xl"
              >
                <img src={featured.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest">مقال الغلاف</span>
                    <span className="text-emerald-500 flex items-center gap-2 text-xs font-bold"><Sparkles size={14}/> مميز الآن</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tighter max-w-5xl">
                    {featured.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-70 mb-12 max-w-3xl font-medium leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <button className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-emerald-500 transition-colors">
                    قراءة القصة الكاملة <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </section>

            {/* Content Categories Selection */}
            <section className="flex flex-wrap justify-center gap-4">
               {['أخبار المغرب', 'تقنية', 'تطوير الذات', 'ريادة الأعمال'].map(cat => (
                 <button key={cat} className="px-8 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-bold hover:border-emerald-500 transition-all">
                   {cat}
                 </button>
               ))}
            </section>

            {/* Grid for latest posts */}
            <section>
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h2 className="text-4xl font-black mb-2 tracking-tighter">آخر المنشورات</h2>
                  <p className="opacity-40 font-bold">استكشف أحدث ما كتبناه لك</p>
                </div>
                <div className="hidden md:flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center opacity-40">←</div>
                  <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">→</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.slice(1).map(post => (
                  <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
                ))}
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="quantum-card p-12 md:p-24 text-center">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">كن أول من يعلم.</h2>
              <p className="text-xl opacity-60 mb-12 max-w-2xl mx-auto font-medium">انضم إلى أكثر من 10,000 مشترك يحصلون على ملخص أسبوعي لأهم التقنيات وأخبار المغرب.</p>
              <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 px-8 py-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-none outline-none font-bold" />
                <button className="bg-emerald-500 text-black px-12 py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/20">اشترك الآن</button>
              </div>
            </section>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <article className="max-w-5xl mx-auto animate-fade-up">
            <header className="mb-20">
               <button onClick={() => setView('home')} className="mb-12 text-xs font-black opacity-40 hover:opacity-100 flex items-center gap-2 uppercase tracking-widest">← العودة للرئيسية</button>
               <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[1] tracking-tighter text-black dark:text-white">{selectedPost.title}</h1>
               <div className="flex items-center gap-6 text-sm font-bold opacity-40">
                  <span className="flex items-center gap-2"><User size={16}/> {selectedPost.author}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{selectedPost.date}</span>
                  <span className="px-4 py-1 rounded-full border border-current">{selectedPost.category}</span>
               </div>
            </header>
            
            <div className="aspect-[21/9] rounded-[4rem] overflow-hidden mb-20 shadow-4xl">
              <img src={selectedPost.image} className="w-full h-full object-cover" />
            </div>
            
            <div className="prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-[1.9] font-medium whitespace-pre-wrap mb-32 px-4">
              {selectedPost.content}
            </div>
          </article>
        )}

        {currentView === 'login' && <AdminLogin isDark={isDark} onLogin={(p) => { if(p===adminPassword){setIsAuthenticated(true); sessionStorage.setItem('admin_auth','true'); setView('admin'); return true;} return false; }} onCancel={() => setView('home')} />}
        
        {currentView === 'admin' && isAuthenticated && (
          <AdminPanel 
            posts={posts} isDark={isDark} analytics={analytics}
            onNewPost={() => setView('editor')} 
            onEditPost={(id) => { /* Logic */ }} 
            onDeletePost={(id) => { setPosts(posts.filter(p => p.id !== id)); localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.filter(p => p.id !== id))); }}
            onOpenAdSense={() => setView('adsense-settings')}
            onOpenSecurity={() => setView('security-settings')}
            onSyncData={() => syncQuantumData(true)}
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
           <SecuritySettings isDark={isDark} currentSavedPassword={adminPassword} onSave={(p) => setAdminPassword(p)} onCancel={() => setView('admin')} onForceResetData={() => syncQuantumData(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-black mb-4 tracking-tighter">عبدو <span className="text-emerald-500">ويب.</span></h3>
            <p className="opacity-40 font-medium max-w-xs leading-relaxed">منصتكم المفضلة لاستكشاف عالم التقنية وأخبار المغرب بعيون عصرية وحيادية.</p>
          </div>
          <div className="flex gap-8 font-black text-xs uppercase tracking-widest opacity-60">
            <a href="#" className="hover:text-emerald-500">من نحن</a>
            <a href="#" className="hover:text-emerald-500">اتصل بنا</a>
            <a href="#" className="hover:text-emerald-500">سياسة الخصوصية</a>
          </div>
          <div className="text-[10px] font-black opacity-20">© 2024 ABDOUWEB QUANTUM. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
