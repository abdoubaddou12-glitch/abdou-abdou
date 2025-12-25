
import React, { useState, useEffect } from 'react';
import { Post, View } from './types';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { PostCard } from './components/PostCard';
import { AdminPanel } from './components/AdminPanel';
import { PostEditor } from './components/PostEditor';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'مستقبل الذكاء الاصطناعي في 2025',
    excerpt: 'استكشف كيف سيغير الذكاء الاصطناعي حياتنا اليومية والمهنية في السنوات القليلة القادمة.',
    content: 'الذكاء الاصطناعي لم يعد مجرد خيال علمي، بل أصبح واقعاً نعيشه. من السيارات ذاتية القيادة إلى المساعدات الشخصية الذكية، التطور لا يتوقف...',
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
    content: 'التصميم البسيط ليس غياب التصميم، بل هو جوهر الوظيفة. في هذا المقال نناقش كيف يمكن للبساطة أن تزيد من تفاعل المستخدم...',
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
      
      <main className="min-h-[80vh] container mx-auto">
        {currentView === 'home' && (
          <div className="px-6 py-12 animate-fade-in">
            <header className="mb-16 text-center">
              <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter leading-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                نكتب الإبداع.
              </h1>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                اكتشف مقالات حصرية في التكنولوجيا والتصميم، مدعومة بالذكاء الاصطناعي.
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
              العودة للرئيسية ←
            </button>
            <img src={selectedPost.image} className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl mb-12 shadow-2xl" alt={selectedPost.title} />
            <div className="flex items-center mb-6 gap-4 font-bold">
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs uppercase tracking-widest">{selectedPost.category}</span>
              <span className="text-sm opacity-50">{selectedPost.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight">{selectedPost.title}</h1>
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

      <footer className={`py-12 border-t mt-20 ${isDark ? 'bg-zinc-950 border-zinc-900 text-zinc-500' : 'bg-white border-gray-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمدونتي الاحترافية.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
