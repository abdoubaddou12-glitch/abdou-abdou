
import React, { useState, useRef } from 'react';
import { 
  Upload, Download, Trash2, Maximize2, 
  Loader2, RefreshCw, Lock, Unlock, Palette, Save, Ghost,
  Share2, Twitter, Facebook, MessageCircle, Send
} from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

interface ConverterProps {
  onConversion: (savedKB: number) => void;
  isDark: boolean;
  adCode?: string;
}

type SettingsTab = 'transform' | 'filters' | 'output';

export const Converter: React.FC<ConverterProps> = ({ onConversion, isDark, adCode }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>('transform');
  
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg' | 'avif'>('webp');
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number>(1);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setResult(null);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalAspectRatio(img.width / img.height);
      };
    }
  };

  const handleConvert = async () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1000));

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width || img.width;
      canvas.height = height || img.height;
      
      if (isGrayscale) ctx.filter = 'grayscale(100%)';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = format === 'avif' ? 'image/avif' : `image/${format}`;
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);
      setResult(dataUrl);
      
      const stringLength = dataUrl.split(',')[1].length;
      const sizeInBytes = Math.floor(stringLength * 0.75);
      setResultSize(sizeInBytes);
      setIsProcessing(false);
      onConversion((selectedImage.size - sizeInBytes) / 1024);
    };
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `storehalal-convert.${format}`;
    link.click();
  };

  const shareUrl = "https://storehalal.shop/";
  const shareText = "جرب هذه الأداة الاحترافية لتحويل الصور مجاناً وبخصوصية تامة! 🚀";

  const socialLinks = [
    { name: 'WhatsApp', icon: <MessageCircle size={18} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, color: 'hover:bg-green-500' },
    { name: 'Facebook', icon: <Facebook size={18} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'hover:bg-blue-600' },
    { name: 'X', icon: <Twitter size={18} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'hover:bg-zinc-700' },
    { name: 'Telegram', icon: <Send size={18} />, url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, color: 'hover:bg-sky-500' },
  ];

  const savingsPercent = selectedImage ? Math.max(0, Math.round(((selectedImage.size - resultSize) / selectedImage.size) * 100)) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`emerald-card p-20 md:p-32 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${isDark ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'bg-white border-emerald-500/30 hover:border-emerald-500 shadow-sm'}`}
        >
          <input type="file" ref={fileInputRef} hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
          <Upload size={48} className="text-emerald-500 mb-8 group-hover:scale-110 transition-transform" />
          <h2 className="text-3xl font-black mb-3 text-center">ارفع صورتك للمعالجة الفورية</h2>
          <p className="opacity-40 font-bold uppercase tracking-widest text-xs">آمن، سريع، وبخصوصية كاملة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-slide-up">
          <div className="lg:col-span-5">
            <div className={`emerald-card p-8 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
              <div className={`relative aspect-square rounded-[2.5rem] overflow-hidden border ${isDark ? 'border-white/5 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'}`}>
                <img src={preview} className="w-full h-full object-contain" alt="Preview" />
                <button onClick={() => {setPreview(null); setResult(null);}} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-all z-10">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 emerald-card p-10 flex flex-col min-h-[500px] ${!isDark && 'bg-white'}`}>
            <div className="flex gap-1 p-1.5 rounded-2xl bg-black/10 mb-8">
              <TabBtn active={activeTab === 'transform'} onClick={() => setActiveTab('transform')} icon={<Maximize2 size={16}/>} label="الأبعاد" />
              <TabBtn active={activeTab === 'filters'} onClick={() => setActiveTab('filters')} icon={<Palette size={16}/>} label="الفلاتر" />
              <TabBtn active={activeTab === 'output'} onClick={() => setActiveTab('output')} icon={<Save size={16}/>} label="التصدير" />
            </div>

            <div className="flex-grow">
              {activeTab === 'transform' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="العرض (px)" value={width} onChange={v => setWidth(v)} isDark={isDark} />
                    <InputField label="الارتفاع (px)" value={height} onChange={v => setHeight(v)} isDark={isDark} />
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-[10px] font-black uppercase text-emerald-500">قفل التناسب</span>
                    <button onClick={() => setLockAspectRatio(!lockAspectRatio)} className={`p-3 rounded-xl ${lockAspectRatio ? 'bg-emerald-500 text-black' : 'bg-zinc-800'}`}>
                      {lockAspectRatio ? <Lock size={20}/> : <Unlock size={20}/>}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'filters' && (
                <div className="space-y-8 animate-slide-up">
                  <button onClick={() => setIsGrayscale(!isGrayscale)} className={`w-full py-5 rounded-xl border font-black text-xs ${isGrayscale ? 'bg-emerald-500 text-black' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10'}`}>
                    <Ghost size={18} className="inline ml-2" /> تحويل للأسود والأبيض
                  </button>
                </div>
              )}
              {activeTab === 'output' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="grid grid-cols-2 gap-2">
                    {['avif', 'webp', 'png', 'jpeg'].map(f => (
                      <button key={f} onClick={() => setFormat(f as any)} className={`py-4 rounded-xl font-black text-[10px] uppercase ${format === f ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>{f}</button>
                    ))}
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between"><label className="text-[10px] font-black uppercase opacity-40">الجودة</label><span className="text-emerald-500">{quality}%</span></div>
                    <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 space-y-8">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-6 rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <RefreshCw size={22} />}
                  بدء معالجة الصورة
                </button>
              ) : (
                <div className="space-y-10 animate-fade-in text-center">
                  <div className="emerald-card p-6 bg-emerald-500 text-black flex items-center justify-between">
                     <span className="text-3xl font-black">{savingsPercent}% توفير</span>
                     <span className="font-bold">{(resultSize/1024).toFixed(1)} KB</span>
                  </div>
                  
                  <button 
                    onClick={handleDownload} 
                    className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
                  >
                    <Download size={26} /> تحميل الصورة الآن
                  </button>

                  {/* Ads directly under the download area */}
                  {adCode && (
                    <div className="pt-4 flex flex-col items-center">
                       <AdUnit type="script" code={adCode} isDark={isDark} label="محتوى إعلاني" className="max-w-[300px]" />
                    </div>
                  )}

                  <button onClick={() => setResult(null)} className="w-full py-2 text-[9px] font-black uppercase text-zinc-500 tracking-[0.3em] hover:text-emerald-500 transition-colors">تحويل صورة جديدة</button>
                </div>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="mt-12 pt-8 border-t border-emerald-500/10">
               <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-3 opacity-30">
                    <Share2 size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">شارك الأداة مع أصدقائك</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks.map((social) => (
                      <a 
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                          isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-zinc-50 border-zinc-100 text-zinc-400'
                        } ${social.color} hover:text-white hover:scale-110 hover:-translate-y-1 shadow-sm`}
                        title={`مشاركة عبر ${social.name}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex-grow flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${active ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500'}`}>{icon} {label}</button>
);

const InputField = ({ label, value, onChange, isDark }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase opacity-40 pr-2">{label}</label>
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className={`w-full px-6 py-4 rounded-2xl border font-black text-center ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'}`} />
  </div>
);
