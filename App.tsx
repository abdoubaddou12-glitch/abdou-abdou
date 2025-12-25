
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
    title: 'مستقبل الذكاء الاصطناعي التوليدي',
    excerpt: 'استكشاف لآخر التطورات في عالم الذكاء الاصطناعي وكيف سيغير شكل الويب في السنوات القادمة.',
    content: 'يعتبر الذكاء الاصطناعي التوليدي طفرة في عالم التكنولوجيا الحديثة، حيث يوفر إمكانيات غير مسبوقة في خلق المحتوى الرقمي...',
    date: '20 مايو 2024',
    author: 'أحمد علي',
    category: 'تقنية',
    image: 'https://picsum.photos/seed/tech/800/600',
    status: 'published'
  },
  {
    id: '2',
    title: 'أهمية التصميم المرتكز حول المستخدم',
    excerpt: 'لماذا يجب أن نضع المستخدم في قلب عملية التصميم وكيف يؤثر ذلك على نجاح المنتجات الرقمية.',
    content: 'التصميم ليس مجرد شكل جميل، بل هو تجربة متكاملة تبدأ من فهم عميق لاحتياجات المستخدمين وتوقعاتهم...',
    date: '18 مايو 2024',
    author: 'سارة خالد',
    category: 'تصميم',
    image: 'https://picsum.photos/seed/design/800/600',
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
      setPosts(JSON.parse(savedPosts));
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
      updatedPosts = posts.map(p => p.id === editingPostId ? { ...p, ...newPostData } : p);
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        author: 'المشرف',
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
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

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tight">كلمات تصنع الفرق.</h1>
        <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
          اكتشف آخر المقالات في التقنية، التصميم، وريادة الأعمال بأسلوب عصري ومحتوى متميز.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.filter(p => p.status === 'published').map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            isDark={isDark} 
            onClick={(id) => {
              setSelectedPost(posts.find(p => p.id === id) || null);
              setView('post');
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderPostDetail = () => {
    if (!selectedPost) return null;
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={() => setView('home')}
          className="flex items-center text-indigo-500 font-bold mb-8 hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
          العودة للرئيسية
        </button>
        <img src={selectedPost.image} className="w-full h-[450px] object-cover rounded-3xl mb-10 shadow-2xl" />
        <div className="flex items-center mb-6 space-x-reverse space-x-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">{selectedPost.category}</span>
          <span className="text-sm opacity-60">{selectedPost.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedPost.title}</h1>
        <div className={`prose prose-lg max-w-none ${isDark ? 'text-zinc-300' : 'text-gray-700'} leading-relaxed space-y-6 whitespace-pre-wrap`}>
          {selectedPost.content}
        </div>
      </div>
    );
  };

  return (
    <Layout isDark={isDark}>
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        setView={setView} 
        currentView={currentView}
      />
      
      <main className="transition-opacity duration-300">
        {currentView === 'home' && renderHome()}
        
        {currentView === 'post' && renderPostDetail()}
        
        {currentView === 'admin' && (
          <AdminPanel 
            posts={posts} 
            isDark={isDark} 
            onNewPost={() => {
              setEditingPostId(null);
              setView('editor');
            }} 
            onEditPost={(id) => {
              setEditingPostId(id);
              setView('editor');
            }}
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

      <footer className={`mt-20 py-10 border-t ${isDark ? 'bg-zinc-950 border-zinc-900 text-zinc-500' : 'bg-white border-gray-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2024 جميع الحقوق محفوظة - مدونتي الاحترافية</p>
          <div className="mt-4 flex justify-center space-x-reverse space-x-6 grayscale opacity-60">
            <button className="hover:text-indigo-500">تويتر</button>
            <button className="hover:text-indigo-500">لينكد إن</button>
            <button className="hover:text-indigo-500">انستجرام</button>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
