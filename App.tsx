
import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, Image as ImageIcon, Download, X, 
  Settings2, Zap, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, CheckCircle, Info, ChevronDown
} from 'lucide-react';

interface FileItem {
  id: string;
  file: File;
  preview: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  resultUrl?: string;
  newSize?: string;
}

export default function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState('webp');
  const [quality, setQuality] = useState(80);
  const [resizeWidth, setResizeWidth] = useState<number | ''>('');
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const items: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'idle',
      progress: 0
    }));
    setFiles(prev => [...prev, ...items]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const processImage = async (item: FileItem) => {
    return new Promise<void>((resolve) => {
      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'processing', progress: 30 } : f));

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;

        if (resizeWidth && typeof resizeWidth === 'number') {
          const ratio = resizeWidth / img.width;
          width = resizeWidth;
          height = img.height * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        const mimeType = `image/${targetFormat}`;
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const sizeInKb = (blob.size / 1024).toFixed(1);
            setFiles(prev => prev.map(f => f.id === item.id ? { 
              ...f, 
              status: 'completed', 
              progress: 100, 
              resultUrl: url,
              newSize: `${sizeInKb} KB`
            } : f));
          }
          resolve();
        }, mimeType, quality / 100);
      };
      img.src = item.preview;
    });
  };

  const processAll = async () => {
    setIsProcessingAll(true);
    for (const file of files) {
      if (file.status !== 'completed') {
        await processImage(file);
      }
    }
    setIsProcessingAll(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="pt-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5 rounded-[2rem] border border-emerald-500/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <RefreshCw size={20} className="font-bold" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter">Emerald <span className="text-emerald-500">Convert</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">آمن • سريع • مجاني</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">متصل الآن</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] text-glow italic">
            حول صورك <span className="text-emerald-500">بذكاء.</span>
          </h1>
          <p className="text-xl opacity-40 font-medium max-w-2xl mx-auto leading-relaxed italic">
            أداة احترافية لتحويل صيغ الصور وتغيير أحجامها في ثوانٍ. جميع المعالجات تتم محلياً في متصفحك لضمان الخصوصية القصوى.
          </p>
        </div>

        {/* Drop Zone */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative emerald-card p-12 md:p-24 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500/60 cursor-pointer text-center transition-all overflow-hidden"
          >
            <input type="file" ref={fileInputRef} onChange={onFileSelect} multiple accept="image/*" className="hidden" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-black mb-8 shadow-2xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <Upload size={40} />
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">اسحب الصور هنا أو اضغط للرفع</h2>
              <p className="text-sm opacity-30 font-bold uppercase tracking-widest">يدعم PNG, JPG, WebP, AVIF</p>
            </div>
            
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </section>

        {files.length > 0 && (
          <div className="mt-16 space-y-8 animate-slide-up">
            {/* Global Settings Bar */}
            <div className="emerald-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-emerald-500/30 shadow-2xl shadow-emerald-500/5">
              <div className="flex flex-wrap items-center gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">تحويل إلى</label>
                  <div className="relative">
                    <select 
                      value={targetFormat} 
                      onChange={(e) => setTargetFormat(e.target.value)}
                      className="appearance-none bg-black border border-emerald-500/20 px-8 py-3 rounded-xl font-black text-sm outline-none focus:border-emerald-500 transition-all min-w-[120px]"
                    >
                      <option value="webp">WEBP</option>
                      <option value="jpeg">JPG</option>
                      <option value="png">PNG</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" size={14} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">الجودة ({quality}%)</label>
                  <input 
                    type="range" min="10" max="100" value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-40 h-1.5 bg-zinc-800 rounded-full appearance-none accent-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">العرض (اختياري)</label>
                  <input 
                    type="number" placeholder="Pixels" 
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(e.target.value ? parseInt(e.target.value) : '')}
                    className="bg-black border border-emerald-500/20 px-4 py-3 rounded-xl font-black text-sm outline-none focus:border-emerald-500 w-28" 
                  />
                </div>
              </div>

              <button 
                onClick={processAll}
                disabled={isProcessingAll}
                className="w-full md:w-auto bg-emerald-500 text-black px-12 py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {isProcessingAll ? <RefreshCw size={20} className="animate-spin" /> : <Zap size={20} fill="black" />}
                تحويل الكل الآن
              </button>
            </div>

            {/* Files List */}
            <div className="grid grid-cols-1 gap-4">
              {files.map(item => (
                <div key={item.id} className="emerald-card p-6 flex items-center justify-between border-white/5 hover:border-emerald-500/20 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                      <img src={item.preview} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 truncate max-w-[200px]">{item.file.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black opacity-30 uppercase">{(item.file.size / 1024).toFixed(1)} KB</span>
                        {item.status === 'completed' && (
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle size={10} /> تم التحويل ({item.newSize})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {item.status === 'completed' ? (
                      <a 
                        href={item.resultUrl} 
                        download={`emerald-${item.file.name.split('.')[0]}.${targetFormat}`}
                        className="p-4 bg-emerald-500 text-black rounded-xl hover:scale-110 transition-all"
                      >
                        <Download size={20} />
                      </a>
                    ) : (
                      <button 
                        onClick={() => processImage(item)}
                        className="p-4 bg-white/5 text-emerald-500 border border-emerald-500/10 rounded-xl hover:bg-emerald-500 hover:text-black transition-all"
                      >
                        <Settings2 size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => removeFile(item.id)}
                      className="p-4 bg-white/5 text-red-500 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up">
           <FeatureCard 
             icon={<ShieldCheck size={32} />} 
             title="خصوصية 100%" 
             desc="لا يتم رفع صورك لأي خادم. كل العمليات تتم داخل جهازك فقط."
           />
           <FeatureCard 
             icon={<Zap size={32} />} 
             title="سرعة خيالية" 
             desc="تحويل فوري بفضل تقنيات معالجة المتصفح الحديثة وبدون انتظار."
           />
           <FeatureCard 
             icon={<Layers size={32} />} 
             title="تعدد الصيغ" 
             desc="دعم كامل لجميع الصيغ الحديثة WebP, AVIF مع الحفاظ على الجودة."
           />
        </section>
      </main>

      <footer className="border-t border-emerald-500/10 py-20 bg-black/40">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8 opacity-40 grayscale">
            <RefreshCw size={24} />
            <span className="text-xl font-black italic tracking-tighter">Emerald Convert</span>
          </div>
          <p className="text-sm font-bold opacity-20 uppercase tracking-[0.5em] mb-4">Professional Image Processing Suite</p>
          <p className="text-[10px] font-black opacity-10">© 2024 EMERALD CONVERT. ALL RIGHTS RESERVED. POWERED BY BROWSER CLOUD.</p>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="emerald-card p-10 border-white/5 hover:border-emerald-500/20 text-center group">
    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-emerald-500 group-hover:text-black transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-black mb-4 tracking-tighter italic">{title}</h3>
    <p className="text-sm opacity-30 font-medium leading-relaxed">{desc}</p>
  </div>
);
