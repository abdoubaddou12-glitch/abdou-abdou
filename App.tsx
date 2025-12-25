
import React, { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, TrendingUp, Shield, Globe, 
  LayoutDashboard, User, Calendar, ChevronLeft, 
  Mail, Instagram, Twitter, MessageCircle, Menu, X
} from 'lucide-react';
import { Post, View } from './types.ts';

// --- Data ---
const STORAGE_KEY = 'abdou_emerald_pro_v1';

const MOCK_POSTS: Partial<Post>[] = [
  {
    id: '1',
    title: 'انخفاض تاريخي في أسعار زيت الزيتون بالمغرب: بشرى سارة للمستهلكين في موسم 2024',
    excerpt: 'بعد طول انتظار، بدأت معاصر الزيتون في مختلف أقاليم المملكة تسجيل تراجعات ملحوظة في الأثمان نتيجة وفرة المنتوج وجودته العالية.',
    content: `بشرى سارة لكل المغاربة؛ بدأت أسعار "الذهب الأخضر" تأخذ منحى تنازلياً في معظم الأسواق الوطنية. موسم 2024/2025 يبشر بجودة استثنائية بفضل التساقطات المطرية الأخيرة التي أنقذت المحصول في اللحظات الأخيرة.

أسباب هذا الانخفاض:
1. وفرة العرض: المحاصيل في مناطق مثل قلعة السراغنة وبني ملال سجلت أرقاماً جيدة.
2. المراقبة الصارمة: لجان اليقظة تمنع المضاربات في الأسعار.
3. الجودة العالية: نسبة الحموضة منخفضة جداً هذا العام، مما يرفع جودة الزيت البكر الممتاز.

التوقعات تشير إلى أن الأسعار ستستقر في مستويات معقولة جداً مقارنة بالعام الماضي الذي شهد قفزة جنونية. نحن في "عبدو ويب" سنوافيكم بآخر الأثمنة من قلب المعاصر يوماً بيوم.`,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=2000',
    date: '30 مارس 2024',
    author: 'عبدو',
    category: 'أخبار المغرب'
  },
  {
    id: '2',
    title: 'المغرب يستعد لإطلاق أكبر مشروع لإنتاج الهيدروجين الأخضر في إفريقيا',
    excerpt: 'طموح مغربي لا يعرف الحدود في مجال الطاقة المتجددة، حيث تتجه الأنظار نحو الأقاليم الجنوبية لتكون قطباً عالمياً للطاقة النظيفة.',
    content: `يمضي المغرب قدماً في تعزيز سيادته الطاقية من خلال مشاريع ضخمة. الهيدروجين الأخضر هو رهان المستقبل، والمملكة تمتلك كل المقومات للريادة العالمية في هذا المجال.`,
    image: 'https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=2000',
    date: '28 مارس 2024',
    author: 'عبدو',
    category: 'تقنية'
  },
  {
    id: '3',
    title: 'مستقبل التجارة الإلكترونية في المغرب: كيف غير الذكاء الاصطناعي سلوك المستهلك؟',
    excerpt: 'تحولات رقمية متسارعة يشهدها السوق المغربي، حيث أصبحت منصات البيع تعتمد على تحليل البيانات لتوقع رغبات الزبناء.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000',
    date: '25 مارس 2024',
    author: 'عبدو',
    category: 'تجارة'
  }
];

// --- Components ---

// Fix: Added explicit React.FC typing to handle key and other standard React props
const Navbar: React.FC<{ setView: (view: View) => void; isAuthenticated: boolean }> = ({ setView, isAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`mx-auto max-w-6xl flex items-center justify-between px-8 py-4 rounded-[2rem] border transition-all ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-emerald-500/30 shadow-2xl scale-95' : 'bg-transparent border-transparent'
      }`}>
        <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <Zap size={20} fill="black" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter">عبدو <span className="text-emerald-500">ويب</span></span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['الرئيسية', 'المغرب', 'تقنية', 'رياضة'].map(item => (
            <button key={item} onClick={() => setView('home')} className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-emerald-500 transition-all">{item}</button>
          ))}
        </div>

        <button 
          onClick={() => setView(isAuthenticated ? 'admin' : 'login')}
          className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
        >
          <LayoutDashboard size={20} />
        </button>
      </div>
    </nav>
  );
};

// Fix: Added explicit React.FC typing to resolve the 'key' property error in list mapping
const PostCard: React.FC<{ post: any; onClick: (id: string) => void }> = ({ post, onClick }) => (
  <div onClick={() => onClick(post.id)} className="group cursor-pointer bg-zinc-900/50 rounded-[2.5rem] border border-emerald-500/5 hover:border-emerald-500/40 transition-all p-6 animate-in">
    <div className="relative aspect-video rounded-[1.8rem] overflow-hidden mb-6">
      <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 right-4 px-4 py-1.5 bg-emerald-500 text-black text-[9px] font-black rounded-lg uppercase tracking-widest">{post.category}</div>
    </div>
    <div className="flex items-center gap-3 text-[10px] opacity-30 font-bold mb-4">
      <Calendar size={14} className="text-emerald-500" /> {post.date}
    </div>
    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-emerald-500 transition-colors">{post.title}</h3>
    <p className="text-sm opacity-40 line-clamp-2 leading-relaxed mb-6">{post.excerpt}</p>
    <div className="pt-6 border-t border-white/5 flex items-center justify-between text-emerald-500">
      <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">اقرأ المزيد <ArrowRight size={16} /></span>
      <div className="w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center font-black italic">A</div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>(MOCK_POSTS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'abdou2024') {
      setIsAuthenticated(true);
      setView('admin');
    } else {
      alert('كلمة السر خاطئة!');
    }
  };

  const navigateToPost = (id: string) => {
    const p = posts.find(x => x.id === id);
    if (p) {
      setSelectedPost(p);
      setView('post');
      window.scrollTo(0, 0);
    }
  };

  const featured = posts[0];

  return (
    <div className="min-h-screen">
      <Navbar setView={setView} isAuthenticated={isAuthenticated} />

      <main className="container mx-auto px-6 pt-36 pb-20">
        {view === 'home' && (
          <div className="space-y-32">
            {/* Hero Section */}
            <section className="animate-in">
              <div 
                onClick={() => navigateToPost(featured.id)}
                className="group relative h-[75vh] rounded-[3rem] overflow-hidden cursor-pointer border border-emerald-500/20 shadow-2xl"
              >
                <img src={featured.image} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1 bg-emerald-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">أهم خبر</span>
                    <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold"><TrendingUp size={14} /> الأكثر قراءة</div>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-glow max-w-4xl">{featured.title}</h1>
                  <button className="bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-emerald-500/30">
                    اقرأ التفاصيل <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </section>

            {/* Feed Section */}
            <section>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">آخر التحديثات</h2>
                  <p className="opacity-40 font-bold">استكشف الأخبار الحصرية بلمسة عبدو ويب الزمردية.</p>
                </div>
                <div className="flex gap-3">
                  {['المغرب', 'تقنية'].map(cat => (
                    <button key={cat} className="px-6 py-2 rounded-xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 transition-all">{cat}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.slice(1).map(p => (
                  <PostCard key={p.id} post={p} onClick={navigateToPost} />
                ))}
              </div>
            </section>

            {/* Newsletter */}
            <section className="bg-zinc-900/50 rounded-[3rem] border border-emerald-500/10 p-12 md:p-24 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic text-glow">كن أول من يعلم.</h2>
              <p className="text-lg opacity-40 max-w-2xl mx-auto mb-14 font-medium italic">اشترك في النشرة الإخبارية لـ "عبدو ويب" لتصلك آخر المستجدات من قلب الحدث.</p>
              <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 px-8 py-5 rounded-2xl bg-black border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold" />
                <button className="bg-emerald-500 text-black px-12 py-5 rounded-2xl font-black hover:scale-105 transition-all">اشترك الآن</button>
              </div>
            </section>
          </div>
        )}

        {view === 'post' && selectedPost && (
          <article className="max-w-4xl mx-auto animate-in">
            <button onClick={() => setView('home')} className="mb-12 flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-widest group">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <ChevronLeft size={20} />
              </div>
              العودة للرئيسية
            </button>
            <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[0.95] tracking-tighter text-glow">{selectedPost.title}</h1>
            <div className="flex items-center gap-6 text-[11px] font-black opacity-30 uppercase tracking-[0.2em] mb-12">
              <span className="flex items-center gap-2 text-emerald-500"><User size={16} /> {selectedPost.author}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span>{selectedPost.date}</span>
            </div>
            <div className="aspect-video rounded-[3rem] overflow-hidden border border-emerald-500/20 mb-16 shadow-2xl">
              <img src={selectedPost.image} className="w-full h-full object-cover" />
            </div>
            <div className="prose prose-invert max-w-none text-xl leading-[2] font-medium whitespace-pre-wrap text-justify opacity-80">
              {selectedPost.content}
            </div>
          </article>
        )}

        {view === 'login' && (
          <div className="max-w-md mx-auto py-20 animate-in">
            <div className="bg-zinc-900/50 rounded-[3rem] border border-emerald-500/20 p-10 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                <Shield size={32} />
              </div>
              <h2 className="text-3xl font-black mb-4">دخول الإدارة</h2>
              <p className="text-sm opacity-40 mb-10">يرجى إدخال الرقم السري للوصول إلى لوحة التحكم.</p>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-black border border-white/10 outline-none focus:border-emerald-500 transition-all text-center font-bold"
                  placeholder="كلمة السر"
                  autoFocus
                />
                <button type="submit" className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-emerald-500/20">دخول</button>
              </form>
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="max-w-6xl mx-auto py-10 animate-in">
             <div className="flex justify-between items-center mb-16">
               <h2 className="text-5xl font-black italic tracking-tighter">مركز التحكم</h2>
               <button onClick={() => { setIsAuthenticated(false); setView('home'); }} className="px-6 py-2 rounded-xl border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">خروج</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-emerald-500/10">
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">إجمالي الزيارات</div>
                 <div className="text-4xl font-black text-emerald-500">12,450</div>
               </div>
               <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-emerald-500/10">
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">المقالات المنشورة</div>
                 <div className="text-4xl font-black text-emerald-500">{posts.length}</div>
               </div>
               <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-emerald-500/10">
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">الزوار الآن</div>
                 <div className="text-4xl font-black text-emerald-500 animate-pulse">48</div>
               </div>
             </div>
             <div className="bg-zinc-900 rounded-[3rem] border border-white/5 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black">إدارة المقالات</h3>
                  <button className="bg-emerald-500 text-black px-6 py-3 rounded-xl font-black text-xs">مقال جديد</button>
                </div>
                <div className="space-y-4">
                  {posts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-sm mb-1">{p.title}</h4>
                          <span className="text-[10px] opacity-30 font-black">{p.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg"><Globe size={18} /></button>
                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><X size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-24 bg-black/50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
          <div>
            <h3 className="text-2xl font-black italic mb-6">عبدو <span className="text-emerald-500">ويب</span></h3>
            <p className="opacity-30 leading-relaxed max-w-xs text-sm font-medium">المنصة المغربية الرائدة للأخبار والتحليلات العميقة، نقدم المحتوى بلمسة إبداعية احترافية.</p>
          </div>
          <div className="flex gap-20">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">المنصة</h4>
              <ul className="space-y-3 text-xs font-bold opacity-40">
                <li><button onClick={() => setView('home')}>الرئيسية</button></li>
                <li><button onClick={() => setView('home')}>الأخبار</button></li>
                <li><button onClick={() => setView('home')}>تواصل معنا</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">القانونية</h4>
              <ul className="space-y-3 text-xs font-bold opacity-40">
                <li><a href="#">الخصوصية</a></li>
                <li><a href="#">الشروط</a></li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">تابعنا</h4>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-emerald-500 transition-all"><Instagram size={18} /></button>
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-emerald-500 transition-all"><Twitter size={18} /></button>
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-emerald-500 transition-all"><MessageCircle size={18} /></button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20 text-[10px] font-black tracking-widest uppercase">
          <span>EMERALD PRO EDITION V5.1</span>
          <span>© 2024 ABDOUWEB. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
