
import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Sliders, Image as ImageIcon, Loader2, CheckCircle, RefreshCw } from 'lucide-react';

interface ConverterProps {
  onConversion: () => void;
  isDark: boolean;
}

export const Converter: React.FC<ConverterProps> = ({ onConversion, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.src = preview!;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL(`image/${format}`, quality / 100);
      setResult(dataUrl);
      setIsProcessing(false);
      onConversion();
    };
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `storehalal-convert-${Date.now()}.${format}`;
    link.click();
  };

  const reset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          className={`emerald-card p-20 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${isDark ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'bg-white border-emerald-500/30 hover:border-emerald-500 shadow-sm'}`}
        >
          <input type="file" ref={fileInputRef} hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl ${isDark ? 'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/10' : 'bg-emerald-50 text-emerald-600 shadow-emerald-500/5'}`}>
            <Upload size={32} />
          </div>
          <h2 className="text-2xl font-black mb-4">اسحب الصورة هنا أو اضغط للرفع</h2>
          <p className={`font-bold uppercase tracking-widest text-xs italic ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>JPG, PNG, WebP هي الصيغ المدعومة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
          <div className={`emerald-card p-6 overflow-hidden ${!isDark && 'bg-white'}`}>
            <div className={`relative aspect-square rounded-2xl overflow-hidden border ${isDark ? 'border-white/5 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'}`}>
              <img src={preview} className="w-full h-full object-contain" alt="Original" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black border border-white/10 uppercase tracking-widest text-white">الأصلية</div>
              <button onClick={reset} className="absolute top-4 right-4 p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mt-6 flex justify-between items-center px-2">
               <div>
                 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>حجم الملف</p>
                 <p className="font-black">{(selectedImage!.size / 1024).toFixed(1)} KB</p>
               </div>
               <div className="text-left">
                 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>النوع</p>
                 <p className="font-black uppercase">{selectedImage!.type.split('/')[1]}</p>
               </div>
            </div>
          </div>

          <div className={`emerald-card p-10 flex flex-col justify-between ${!isDark && 'bg-white'}`}>
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Sliders className="text-emerald-500" size={20} />
                <h3 className="text-xl font-black">إعدادات التحويل</h3>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className={`text-[10px] font-black uppercase tracking-widest pr-1 ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>الصيغة المطلوبة</label>
                  <div className="flex gap-2">
                    {['webp', 'png', 'jpeg'].map((f) => (
                      <button 
                        key={f}
                        onClick={() => setFormat(f as any)}
                        className={`flex-grow py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${format === f ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : isDark ? 'bg-white/5 opacity-40 hover:opacity-100 border border-white/5' : 'bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pr-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>الجودة (Compression)</label>
                    <span className="text-emerald-500 font-black text-sm">{quality}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-emerald-500/10 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-10">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />}
                  ابدأ التحويل الآن
                </button>
              ) : (
                <div className="space-y-4 animate-slide-up">
                  <button 
                    onClick={handleDownload}
                    className={`w-full py-5 rounded-2xl font-black shadow-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] ${isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'}`}
                  >
                    <Download size={24} /> تحميل الصورة
                  </button>
                  <div className="flex items-center justify-center gap-2 text-emerald-500 py-2">
                    <CheckCircle size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">جاهز للتحميل</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
