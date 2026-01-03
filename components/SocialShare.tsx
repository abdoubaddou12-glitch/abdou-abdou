
import React, { useState } from 'react';
import { MessageCircle, Facebook, Twitter, Send, Copy, Check, Share2 } from 'lucide-react';

interface SocialShareProps {
  isDark: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({ isDark }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "استكشف أداة Storehalal الاحترافية لتحويل الصور والمدونة التقنية! 🚀";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'واتساب', icon: <MessageCircle size={20} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, color: 'bg-[#25D366]' },
    { name: 'فيسبوك', icon: <Facebook size={20} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'bg-[#1877F2]' },
    { name: 'X', icon: <Twitter size={20} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-[#000000]' },
    { name: 'تيليجرام', icon: <Send size={20} />, url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, color: 'bg-[#0088cc]' },
  ];

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto px-4 animate-slide-up">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 w-full">
          <div className="h-[1px] flex-grow bg-emerald-500/20"></div>
          <div className="flex items-center gap-2 opacity-50 shrink-0">
            <Share2 size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">انشر الفائدة الآن</span>
          </div>
          <div className="h-[1px] flex-grow bg-emerald-500/20"></div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 w-full">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-white font-black text-xs transition-all active:scale-95 shadow-lg ${social.color}`}
            >
              {social.icon}
              <span>{social.name}</span>
            </a>
          ))}
          
          <button 
            onClick={copyToClipboard}
            className={`col-span-2 sm:col-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-xs transition-all border shadow-md ${
              isDark 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400' 
                : 'bg-white border-emerald-100 text-emerald-600'
            }`}
          >
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
