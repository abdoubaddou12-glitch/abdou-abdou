
import React, { useState } from 'react';
import { MessageCircle, Facebook, Twitter, Send, Copy, Check, Share2 } from 'lucide-react';

interface SocialShareProps {
  isDark: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({ isDark }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "استكشف Storehalal - مدونتك التقنية وأداة تحويل الصور! 🚀";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'واتساب', icon: <MessageCircle size={18} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, color: 'bg-[#25D366]' },
    { name: 'فيسبوك', icon: <Facebook size={18} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'bg-[#1877F2]' },
    { name: 'تويتر', icon: <Twitter size={18} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-[#000000]' },
    { name: 'تيليجرام', icon: <Send size={18} />, url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, color: 'bg-[#0088cc]' },
  ];

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto px-4 animate-slide-up" style={{ opacity: 0 }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 w-full opacity-30">
          <div className="h-[1px] flex-grow bg-current"></div>
          <Share2 size={14} />
          <div className="h-[1px] flex-grow bg-current"></div>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-3 w-full">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-[11px] md:text-xs transition-all active:scale-95 shadow-lg px-2 md:px-5 ${social.color}`}
            >
              {social.icon}
              <span>{social.name}</span>
            </a>
          ))}
          
          <button 
            onClick={copyToClipboard}
            className={`col-span-2 md:col-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[11px] md:text-xs transition-all border shadow-sm ${
              isDark 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400' 
                : 'bg-white border-zinc-200 text-zinc-700'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
