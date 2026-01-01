
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Download, Trash2, Sliders, Image as ImageIcon, 
  Loader2, CheckCircle, RefreshCw, Maximize2, Minimize2,
  Lock, Unlock, Palette, RotateCw, FlipHorizontal, FlipVertical,
  Type, Info, Settings2
} from 'lucide-react';

interface ConverterProps {
  onConversion: () => void;
  isDark: boolean;
}

export const Converter: React.FC<ConverterProps> = ({ onConversion, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(85);
  
  // Resizing and Filters
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number>(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [isGrayscale, setIsGrayscale] = useState(false);
  
  // Advanced Download Options
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [customFilename, setCustomFilename] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setResult(null);
      setCustomFilename(file.name.split('.')[0] + '-converted');

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalAspectRatio(img.width / img.height);
      };
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspectRatio) {
      setHeight(Math.round(val / originalAspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspectRatio) {
      setWidth(Math.round(val * originalAspectRatio));
    }
  };

  const handleConvert = async () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      // Determine canvas dimensions based on rotation
      const isRotated = rotation === 90 || rotation === 270;
      const targetWidth = width || img.width;
      const targetHeight = height || img.height;
      
      canvas.width = isRotated ? targetHeight : targetWidth;
      canvas.height = isRotated ? targetWidth : targetHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Move origin to center for rotation/flip
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Apply rotation
        ctx.rotate((rotation * Math.PI) / 180);
        
        // Apply flips
        const scaleX = flipH ? -1 : 1;
        const scaleY = flipV ? -1 : 1;
        ctx.scale(scaleX, scaleY);
        
        // Apply Grayscale filter
        if (isGrayscale) {
          ctx.filter = 'grayscale(100%)';
        }
        
        // Draw the image centered
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
      }
      
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
    const finalName = customFilename || `storehalal-convert-${Date.now()}`;
    link.download = `${finalName}.${format}`;
    link.click();
  };

  const reset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setIsGrayscale(false);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  const toggleRotation = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="max-w-5xl mx-auto">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slide-up items-start">
          
          {/* Preview Section */}
          <div className={`lg:col-span-5 emerald-card p-6 overflow-hidden ${!isDark && 'bg-white'}`}>
            <div className={`relative aspect-square rounded-2xl overflow-hidden border transition-all ${isDark ? 'border-white/5 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'}`}>
              <div 
                className="w-full h-full flex items-center justify-center transition-all duration-300"
                style={{ 
                  transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                  filter: isGrayscale ? 'grayscale(100%)' : 'none'
                }}
              >
                <img src={preview} className="max-w-full max-h-full object-contain" alt="Original" />
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={reset} className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black border border-white/10 uppercase tracking-widest text-white">معاينة التعديلات</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
                 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>حجم الملف</p>
                 <p className="font-black">{(selectedImage!.size / 1024).toFixed(1)} KB</p>
               </div>
               <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
                 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? 'opacity-30' : 'text-zinc-400'}`}>أبعاد الصورة</p>
                 <p className="font-black">{width}x{height}</p>
               </div>
            </div>

            <div className="mt-6 space-y-4">
               <label className={`text-[10px] font-black uppercase tracking-widest pr-1 ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>أدوات التحرير السريع</label>
               <div className="flex gap-2">
                 <button onClick={toggleRotation} className={`flex-grow p-4 rounded-xl border flex items-center justify-center gap-2 font-black text-[10px] transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-emerald-500/10 hover:text-emerald-500' : 'bg-zinc-100 border-zinc-200 hover:bg-emerald-50 text-zinc-600 hover:text-emerald-600'}`}>
                   <RotateCw size={14} /> تدوير {rotation}°
                 </button>
                 <button onClick={() => setFlipH(!flipH)} className={`p-4 rounded-xl border flex items-center justify-center transition-all ${flipH ? 'bg-emerald-500 text-black border-transparent' : isDark ? 'bg-white/5 border-white/10' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>
                   <FlipHorizontal size={14} />
                 </button>
                 <button onClick={() => setFlipV(!flipV)} className={`p-4 rounded-xl border flex items-center justify-center transition-all ${flipV ? 'bg-emerald-500 text-black border-transparent' : isDark ? 'bg-white/5 border-white/10' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>
                   <FlipVertical size={14} />
                 </button>
               </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className={`lg:col-span-7 emerald-card p-8 flex flex-col h-full ${!isDark && 'bg-white'}`}>
            <div className="space-y-8 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Settings2 className="text-emerald-500" size={20} />
                  <h3 className="text-xl font-black italic tracking-tighter">إعدادات التحميل الاحترافية</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[9px] font-bold opacity-30 uppercase tracking-widest">
                  <Info size={12} /> معالجة فورية بدون سيرفر
                </div>
              </div>

              {/* Custom Filename */}
              <div className="space-y-4 p-6 rounded-2xl border bg-emerald-500/5 border-emerald-500/10">
                <label className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  <Type size={14} /> اسم الملف المخصص
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={customFilename}
                    onChange={(e) => setCustomFilename(e.target.value)}
                    placeholder="أدخل اسم الملف..."
                    className={`w-full px-6 py-4 rounded-xl border font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black opacity-20">.{format}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dimensions Input */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pr-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>تغيير المقاس (Px)</label>
                    <button onClick={() => setLockAspectRatio(!lockAspectRatio)} className="text-emerald-500 flex items-center gap-1 text-[9px] font-black">
                      {lockAspectRatio ? <Lock size={12} /> : <Unlock size={12} className="opacity-40" />}
                      {lockAspectRatio ? 'مقفل' : 'حر'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="number" value={width} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                        className={`w-full px-4 py-4 rounded-xl border font-bold text-center outline-none focus:border-emerald-500 transition-all ${isDark ? 'bg-black/40 border-white/10' : 'bg-zinc-50 border-zinc-200'}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black opacity-20">W</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" value={height} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                        className={`w-full px-4 py-4 rounded-xl border font-bold text-center outline-none focus:border-emerald-500 transition-all ${isDark ? 'bg-black/40 border-white/10' : 'bg-zinc-50 border-zinc-200'}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black opacity-20">H</span>
                    </div>
                  </div>
                </div>

                {/* Format Selection */}
                <div className="space-y-4">
                  <label className={`text-[10px] font-black uppercase tracking-widest pr-1 ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>الصيغة النهائية</label>
                  <div className="flex gap-2">
                    {['webp', 'png', 'jpeg'].map((f) => (
                      <button 
                        key={f}
                        onClick={() => setFormat(f as any)}
                        className={`flex-grow py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${format === f ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : isDark ? 'bg-white/5 opacity-40 hover:opacity-100 border border-white/5' : 'bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quality & Effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pr-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'opacity-40' : 'text-zinc-400'}`}>جودة الضغط (Quality)</label>
                    <span className="text-emerald-500 font-black text-sm">{quality}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-emerald-500/10 rounded-full appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="pt-4 md:pt-0">
                  <button 
                    onClick={() => setIsGrayscale(!isGrayscale)}
                    className={`w-full py-4 rounded-xl border transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest ${isGrayscale ? 'bg-emerald-500 text-black border-transparent shadow-lg shadow-emerald-500/20' : isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-600'}`}
                  >
                    <Palette size={16} /> فلاتر: {isGrayscale ? 'أبيض وأسود' : 'الألوان الأصلية'}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-12">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />}
                  تطبيق الإعدادات والتحويل
                </button>
              ) : (
                <div className="space-y-4 animate-slide-up">
                  <button 
                    onClick={handleDownload}
                    className={`w-full py-6 rounded-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] ${isDark ? 'bg-white text-black shadow-white/5' : 'bg-zinc-900 text-white shadow-zinc-900/10'}`}
                  >
                    <Download size={28} /> تحميل الملف المحول
                  </button>
                  <div className="flex items-center justify-center gap-3 text-emerald-500 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">جاهز للاستخدام الفوري</span>
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
