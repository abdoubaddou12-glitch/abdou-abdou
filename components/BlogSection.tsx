
import React from 'react';
import { Post } from '../types.ts';
import { PostCard } from './PostCard.tsx';
import { Newspaper } from 'lucide-react';

interface BlogSectionProps {
  posts: Post[];
  isDark: boolean;
  onPostClick: (post: Post) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, isDark, onPostClick }) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-32 animate-slide-up">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="text-emerald-500" size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">مدونة Storehalal</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-glow">آخر المقالات التقنية</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.filter(p => p.status === 'published').map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            isDark={isDark} 
            onClick={() => onPostClick(post)} 
          />
        ))}
      </div>
    </section>
  );
};
