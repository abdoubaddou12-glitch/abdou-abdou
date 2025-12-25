
import React, { useState, useEffect } from 'react';
import { Post, View } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PostCard } from './components/PostCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { PostEditor } from './components/PostEditor.tsx';

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

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
        setView={setView} 
        currentView={currentView}
      />
      
      <main className="pt-32 pb-20 hero-gradient min-h-screen container mx-auto px-4 md:px-8">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <section className="text-center mb-24 py-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-black uppercase tracking-widest border border-indigo-500/20">
                منصة عبدو ويب 2024
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
                عالمك الرقمي يبدأ <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                  من هنا.
                </span>
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                اكتشف آخر أخبار المغرب التقنية، استراتيجيات الأفلييت، ودروس تطوير الذات بأسلوب عصري ومحتوى ذكي.
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-600/30 transition-all">
                  ابدأ القراءة
                </button>
                <button className={`px-8 py-4 rounded-2xl font-black border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-200 hover:bg-white'}`}>
                  عن عبدو
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.filter(p => p.status === 'published').map(post => (
                <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <div className="max-w-4xl mx-auto py-10 animate-fade-in">
            <button 
              onClick={() => setView('home')} 
              className="group flex items-center gap-3 text-indigo-600 font-black mb-12 hover:pr-4 transition-all"
            >
              <span>←</span> العودة للمقالات
            </button>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-12 aspect-video">
              <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 right-10 left-10">
                <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-white/70 text-sm font-bold">
                  <span>بواسطة {selectedPost.author}</span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>
            </div>
            <div className={`prose prose-zinc dark:prose-invert prose-2xl max-w-none leading-loose whitespace-pre-wrap font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {selectedPost.content}
            </div>
          </div>
        )}

        {currentView === 'admin' && (
          <AdminPanel 
            posts={posts} 
            isDark={isDark} 
            onNewPost={() => { setEditingPostId(null); setView('editor'); }} 
            onEditPost={(id) => { setEditingPostId(id); setView('editor'); }}
            onDeletePost={handleDeletePost}
          />
        )}

        {currentView === 'editor' && (
          <PostEditor 
            isDark={isDark}
            post={editingPostId ? posts.find(p => p.id === editingPostId) : undefined}
            onSave={handleSavePost}
            onCancel={() => setView('admin')}
          />
        )}
      </main>

      <footer className={`py-20 border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent mb-6">عبدو ويب.</h2>
            <p className={`max-w-md leading-loose font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              المنصة المغربية الأولى التي تدمج بين التكنولوجيا وتطوير الذات، لنصنع جيلاً رقمياً قادراً على المنافسة عالمياً.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6">روابط سريعة</h4>
            <ul className={`space-y-4 text-sm font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">أخبار التقنية</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">دليل الأفلييت</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">تطوير الذات</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6">تواصل معنا</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">T</div>
              <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">F</div>
              <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">I</div>
            </div>
          </div>
          <div className="md:col-span-4 pt-12 border-t border-zinc-800/10 text-center text-xs font-black opacity-40">
            © {new Date().getFullYear()} عبدو ويب | ABDOUWEB - جميع الحقوق محفوظة لمحبي الإبداع.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
