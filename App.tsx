
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
    title: 'أسرار تحسين تجربة المستخدم في 2025',
    excerpt: 'تعرف على الاتجاهات الحديثة في تصميم الواجهات وكيفية جعل موقعك أكثر جاذبية للمستخدمين.',
    content: 'في ظل التطور المتسارع، لم تعد تجربة المستخدم مجرد ألوان وأشكال، بل أصبحت تعتمد بشكل أساسي على سرعة الاستجابة وفهم سلوك المستخدم بدقة...',
    date: '1 مارس 2024',
    author: 'أحمد محمود',
    category: 'تصميم',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '2',
    title: 'دليل المبرمج للتعامل مع الذكاء الاصطناعي',
    excerpt: 'كيف تستخدم أدوات الذكاء الاصطناعي لمضاعفة إنتاجيتك في كتابة الكود البرمجي.',
    content: 'أصبحت أدوات مثل GitHub Copilot و ChatGPT جزءاً لا يتجزأ من بيئة عمل المبرمج العصري. في هذا الدليل نستعرض أفضل الممارسات...',
    date: '28 فبراير 2024',
    author: 'سارة العلي',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
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
    try {
      const savedPosts = localStorage.getItem('blog_posts');
      if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        setPosts(parsed.length > 0 ? parsed : MOCK_POSTS);
      } else {
        setPosts(MOCK_POSTS);
        localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
      }
    } catch (e) {
      setPosts(MOCK_POSTS);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
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
    if (window.confirm('هل أنت متأكد من حذف هذه المقالة؟')) {
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
      
      <main className="min-h-[70vh]">
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <header className="mb-16 text-center">
              <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter leading-tight">
                نبني المحتوى <br/> <span className="text-indigo-600">بذكاء.</span>
              </h1>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                اكتشف مقالات معمقة في عالم التكنولوجيا والتصميم، مدعومة بأحدث تقنيات الذكاء الاصطناعي.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.filter(p => p.status === 'published').map(post => (
                <PostCard key={post.id} post={post} isDark={isDark} onClick={navigateToPost} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
            <button onClick={() => setView('home')} className="flex items-center text-indigo-600 font-bold mb-10 hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
              </svg>
              العودة للرئيسية
            </button>
            <img src={selectedPost.image} className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl mb-12 shadow-2xl" alt={selectedPost.title} />
            <div className="flex items-center mb-6 gap-4 font-bold">
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs uppercase tracking-widest">{selectedPost.category}</span>
              <span className="text-sm opacity-50">{selectedPost.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tight">{selectedPost.title}</h1>
            <div className={`prose prose-xl max-w-none leading-relaxed whitespace-pre-wrap ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
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

      <footer className={`mt-24 py-16 border-t ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-3xl font-black text-indigo-600 italic mb-4">مدونتي.</div>
          <p className="text-sm opacity-50">© {new Date().getFullYear()} جميع الحقوق محفوظة لمدونتي الاحترافية.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
