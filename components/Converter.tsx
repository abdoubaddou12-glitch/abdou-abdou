
import React, { useState, useRef } from 'react';
import { 
  Upload, Download, Trash2, Maximize2, 
  Loader2, RefreshCw, Lock, Unlock, Palette, Save, Ghost
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
    await new Promise(r => setTimeout(r, 800));

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

  const savingsPercent = selectedImage ? Math.max(0, Math.round(((selectedImage.size - resultSize) / selectedImage.size) * 100)) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`emerald-card p-24 md:p-40 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group ${isDark ? 'border-emerald-500/10 hover:border-emerald-500/40 bg-black/40' : 'bg-white border-emerald-500/20 hover:border-emerald-500 shadow-sm'}`}
        >
          <input type="file" ref={fileInputRef} hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
          <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
             <Upload size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black mb-3 text-center">ارفع صورتك للمعالجة الفورية</h2>
          <p className="opacity-30 font-bold uppercase tracking-[0.4em] text-[10px]">آمن • محلي • بدون رفع للدروبوكس</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-slide-up">
          <div className="lg:col-span-5">
            <div className={`emerald-card p-8 ${!isDark && 'bg-white shadow-2xl shadow-zinc-200/30'}`}>
              <div className={`relative aspect-square rounded-[2.5rem] overflow-hidden border ${isDark ? 'border-white/5 bg-zinc-900 shadow-inner' : 'border-zinc-100 bg-zinc-50'}`}>
                <img src={preview} className="w-full h-full object-contain" alt="Preview" />
                <button onClick={() => {setPreview(null); setResult(null);}} className="absolute top-5 right-5 p-3.5 bg-red-500 text-white rounded-2xl hover:scale-110 shadow-xl transition-all z-10">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 emerald-card p-10 flex flex-col min-h-[500px] ${!isDark && 'bg-white shadow-2xl shadow-zinc-200/30'}`}>
            <div className="flex gap-1.5 p-1.5 rounded-2xl bg-black/10 mb-10">
              <TabBtn active={activeTab === 'transform'} onClick={() => setActiveTab('transform')} icon={<Maximize2 size={16}/>} label="الأبعاد" />
              <TabBtn active={activeTab === 'filters'} onClick={() => setActiveTab('filters')} icon={<Palette size={16}/>} label="الفلاتر" />
              <TabBtn active={activeTab === 'output'} onClick={() => setActiveTab('output')} icon={<Save size={16}/>} label="التصدير" />
            </div>

            <div className="flex-grow">
              {activeTab === 'transform' && (
                <div className="space-y-10 animate-slide-up">
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="العرض (px)" value={width} onChange={v => setWidth(v)} isDark={isDark} />
                    <InputField label="الارتفاع (px)" value={height} onChange={v => setHeight(v)} isDark={isDark} />
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-1">قفل التناسب</span>
                       <span className="text-[11px] opacity-40 font-bold">الحفاظ على أبعاد الصورة الأصلية</span>
                    </div>
                    <button onClick={() => setLockAspectRatio(!lockAspectRatio)} className={`p-4 rounded-2xl transition-all ${lockAspectRatio ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
                      {lockAspectRatio ? <Lock size={20}/> : <Unlock size={20}/>}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'filters' && (
                <div className="space-y-8 animate-slide-up">
                  <button onClick={() => setIsGrayscale(!isGrayscale)} className={`w-full py-6 rounded-2xl border font-black text-xs transition-all flex items-center justify-center gap-3 ${isGrayscale ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10'}`}>
                    <Ghost size={20} /> تحويل للأسود والأبيض (Grayscale)
                  </button>
                </div>
              )}
              {activeTab === 'output' && (
                <div className="space-y-10 animate-slide-up">
                  <div className="grid grid-cols-2 gap-3">
                    {['avif', 'webp', 'png', 'jpeg'].map(f => (
                      <button key={f} onClick={() => setFormat(f as any)} className={`py-5 rounded-2xl font-black text-xs uppercase transition-all border ${format === f ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg' : 'bg-zinc-800/50 border-white/5 text-zinc-500'}`}>{f}</button>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end"><label className="text-[10px] font-black uppercase opacity-20 tracking-widest">جودة التصدير</label><span className="text-xl font-black italic text-emerald-500">{quality}%</span></div>
                    <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full h-1.5 bg-emerald-500/10 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 space-y-10">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-7 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <RefreshCw size={24} />}
                  بدء المعالجة الذكية
                </button>
              ) : (
                <div className="space-y-12 animate-fade-in text-center">
                  <div className="emerald-card p-8 bg-emerald-500 text-black flex items-center justify-between shadow-2xl shadow-emerald-500/40">
                     <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-1">نسبة التوفير</span>
                        <span className="text-4xl font-black italic tracking-tighter">{savingsPercent}%</span>
                     </div>
                     <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-1">الحجم الجديد</span>
                        <span className="text-2xl font-black italic tracking-tighter">{(resultSize/1024).toFixed(1)} KB</span>
                     </div>
                  </div>
                  
                  <button onClick={handleDownload} className="w-full bg-white text-black py-7 rounded-[2.5rem] font-black text-xl shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"><Download size={28} /> تحميل الملف المحسّن</button>
                  
                  {/* إعلان هادئ يظهر فقط بعد التحويل كنوع من المكافأة البصرية */}
                  {adCode && (
                    <div className="pt-4 flex flex-col items-center">
                      <AdUnit 
                        type="script" 
                        code={adCode} 
                        isDark={isDark} 
                        className="max-w-[320px]" 
                        label="مساحة ممولة"
                      />
                    </div>
                  )}
                  
                  <button onClick={() => setResult(null)} className="w-full py-2 text-[10px] font-black uppercase text-zinc-500 tracking-[0.5em] hover:text-emerald-500 transition-colors mt-4">تحويل صورة أخرى</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex-grow flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${active ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}>{icon} {label}</button>
);

const InputField = ({ label, value, onChange, isDark }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase opacity-20 tracking-widest pr-2">{label}</label>
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className={`w-full px-8 py-5 rounded-2xl border font-black text-lg text-center outline-none transition-all ${isDark ? 'bg-black/60 border-white/5 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'}`} />
  </div>
);
