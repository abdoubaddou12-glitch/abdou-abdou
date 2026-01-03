
import React, { useState } from 'react';
import { MessageCircle, Facebook, Twitter, Send, Copy, Check, Share2 } from 'lucide-react';

interface SocialShareProps {
  isDark: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({ isDark }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://storehalal.shop/";
  const shareText = "أفضل أداة مجانية لتحويل الصور لـ WebP و AVIF بسرعة فائقة وبخصوصية تامة! 🚀";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'واتساب', icon: <MessageCircle size={20} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, color: 'bg-[#25D366] shadow-[#25D366]/20' },
    { name: 'فيسبوك', icon: <Facebook size={20} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'bg-[#1877F2] shadow-[#1877F2]/20' },
    { name: 'X', icon: <Twitter size={20} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-[#000000] shadow-black/20' },
    { name: 'تيليجرام', icon: <Send size={20} />, url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, color: 'bg-[#0088cc] shadow-[#0088cc]/20' },
  ];

  return (
    <div className="mt-12 animate-slide-up">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-emerald-500/20"></div>
          <div className="flex items-center gap-2 opacity-40">
            <Share2 size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">شارك الأداة وادعمنا</span>
          </div>
          <div className="h-[1px] w-12 bg-emerald-500/20"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl ${social.color}`}
            >
              {social.icon}
              <span className="hidden md:inline">{social.name}</span>
            </a>
          ))}
          
          <button 
            onClick={copyToClipboard}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all border shadow-lg hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400 hover:border-emerald-500/50' 
                : 'bg-white border-emerald-100 text-emerald-600 hover:border-emerald-500'
            }`}
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
