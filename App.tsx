
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
    title: 'كيف تبدأ في تعلم البرمجة من الصفر؟',
    excerpt: 'دليل شامل لكل مبتدئ يرغب في دخول عالم البرمجة، مع نصائح حول اختيار اللغة الأولى ومصادر التعلم.',
    content: 'البداية دائماً هي الأصعب، ولكن مع وجود خطة واضحة ومصادر موثوقة تصبح الرحلة ممتعة. في هذا المقال سنتناول خارطة طريق شاملة للمبتدئين...',
    date: '20 مايو 2024',
    author: 'أدمن',
    category: 'تقنية',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '2',
    title: 'تأثير الألوان في تجربة المستخدم (UX)',
    excerpt: 'هل سألت نفسك يوماً لماذا تختار الشركات ألواناً محددة؟ اكتشف سيكولوجية الألوان وكيف تؤثر على سلوك المستخدم.',
    content: 'الألوان ليست مجرد زينة، بل هي أداة تواصل قوية. فاللون الأزرق يعطي انطباعاً بالثقة، بينما الأحمر يحفز على الحركة والسرعة...',
    date: '18 مايو 2024',
    author: 'أدمن',
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
    if (savedPosts && JSON.parse(savedPosts).length > 0) {
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
        status: 'published',
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
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent leading-normal">
          نكتب لنصنع المستقبل.
        </h1>
        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
          انضم إلى مجتمعنا التقني المتنامي واستمتع بمقالات حصرية حول أحدث التقنيات والابتكارات الرقمية.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 opacity-50">لا توجد مقالات حالياً..</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.filter(p => p.status === 'published').map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              isDark={isDark} 
              onClick={(id) => {
                setSelectedPost(posts.find(p => p.id === id) || null);
                setView('post');
                window.scrollTo(0, 0);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderPostDetail = () => {
    if (!selectedPost) return null;
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setView('home')}
          className="flex items-center text-indigo-500 font-bold mb-8 hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
          العودة للرئيسية
        </button>
        <img src={selectedPost.image} className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl mb-10 shadow-2xl" />
        <div className="flex items-center mb-6 space-x-reverse space-x-4">
          <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">{selectedPost.category}</span>
          <span className="text-sm opacity-60">{selectedPost.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{selectedPost.title}</h1>
        <div className={`prose prose-lg max-w-none text-xl leading-relaxed space-y-8 whitespace-pre-wrap ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
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
      
      <main>
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

      <footer className={`mt-20 py-12 border-t text-center ${isDark ? 'bg-zinc-950 border-zinc-900 text-zinc-500' : 'bg-white border-gray-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-2xl font-black text-indigo-600 mb-6 italic">مدونتي</div>
          <p className="text-sm">© {new Date().getFullYear()} جميع الحقوق محفوظة لمدونتي الاحترافية</p>
          <div className="mt-8 flex justify-center space-x-reverse space-x-8">
            <button className="hover:text-indigo-500 transition-colors">عن المدونة</button>
            <button className="hover:text-indigo-500 transition-colors">سياسة الخصوصية</button>
            <button className="hover:text-indigo-500 transition-colors">اتصل بنا</button>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
