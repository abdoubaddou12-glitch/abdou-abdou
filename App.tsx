
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
    title: 'مستقبل الذكاء الاصطناعي في 2025',
    excerpt: 'استكشف كيف سيغير الذكاء الاصطناعي حياتنا اليومية والمهنية في السنوات القليلة القادمة.',
    content: 'الذكاء الاصطناعي لم يعد مجرد خيال علمي، بل أصبح واقعاً نعيشه. من السيارات ذاتية القيادة إلى المساعدات الشخصية الذكية، التطور لا يتوقف. نتوقع في عام 2025 أن تصبح النماذج اللغوية أكثر قدرة على فهم السياق البشري المعقد، مما سيحدث ثورة في قطاعات الطب، التعليم، والبرمجة.',
    date: '10 مارس 2024',
    author: 'أحمد علي',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '2',
    title: 'أهمية التصميم البسيط (Minimalism)',
    excerpt: 'لماذا يفضل المستخدمون التصميمات الهادئة والبسيطة؟ اكتشف سر نجاح واجهات المستخدم العصرية.',
    content: 'التصميم البسيط ليس غياب التصميم، بل هو جوهر الوظيفة. في هذا المقال نناقش كيف يمكن للبساطة أن تزيد من تفاعل المستخدم وتقليل الجهد الذهني المبذول لتصفح المواقع. التركيز على المساحات البيضاء، التباين الواضح، والخطوط البسيطة هو مفتاح النجاح لأي واجهة مستخدم حديثة.',
    date: '8 مارس 2024',
    author: 'سارة خالد',
    category: 'تصميم',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
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
        author: 'المشرف',
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'published',
        title: '',
        excerpt: '',
        content: '',
        category: 'تقنية',
        image: '',
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
      
      <main className="min-h-[85vh] container mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === 'home' && (
          <div className="py-12 animate-fade-in">
            <header className="mb-20 text-center">
              <h1 className="text-6xl md:text-9xl font-black mb-6 italic tracking-tighter leading-none bg-gradient-to-bl from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                نصنع المحتوى.
              </h1>
              <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                اكتشف مقالات حصرية في التكنولوجيا والتصميم، مدعومة بأحدث تقنيات الذكاء الاصطناعي.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.filter(p => p.status === 'published').map(post => (
                <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <div className="max-w-4xl mx-auto py-16 animate-fade-in">
            <button 
              onClick={() => setView('home')} 
              className="flex items-center gap-2 text-indigo-600 font-bold mb-12 hover:gap-4 transition-all"
            >
              <span>←</span> العودة للمقالات
            </button>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 h-[400px] md:h-[600px]">
              <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 right-10 left-10 text-white">
                <span className="bg-indigo-600/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                  {selectedPost.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-lg">{selectedPost.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black">
                 {selectedPost.author[0]}
               </div>
               <div>
                 <p className="font-bold text-lg leading-none mb-1">{selectedPost.author}</p>
                 <p className="text-sm opacity-50">{selectedPost.date} • 5 دقائق قراءة</p>
               </div>
            </div>
            <div className={`prose prose-zinc dark:prose-invert prose-xl max-w-none leading-relaxed whitespace-pre-wrap font-light ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
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

      <footer className={`py-16 border-t mt-32 transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-zinc-900 text-zinc-500' : 'bg-white border-zinc-100 text-zinc-400'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-black text-indigo-600 mb-4">مدونتي.</h2>
            <p className="max-w-sm">منصة تدوين متطورة تجمع بين جمال التصميم وقوة الذكاء الاصطناعي.</p>
          </div>
          <div className="flex justify-end items-center gap-8 font-bold">
             <a href="#" className="hover:text-indigo-600 transition-colors">تويتر</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">فيسبوك</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">لينكد إن</a>
          </div>
          <div className="md:col-span-2 pt-10 border-t border-zinc-800/10 text-center text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لمدونتي الاحترافية. تصميم بكل حب.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
