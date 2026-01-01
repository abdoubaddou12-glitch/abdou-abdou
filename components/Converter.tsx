
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Download, Trash2, Sliders, Image as ImageIcon, 
  Loader2, CheckCircle, RefreshCw, Maximize2, Minimize2,
  Lock, Unlock, Palette, RotateCw, FlipHorizontal, FlipVertical,
  Type, Info, Settings2, Crop, ShieldCheck, Square, Circle, 
  Layers, Ghost, Frame, Save
} from 'lucide-react';

interface ConverterProps {
  onConversion: () => void;
  isDark: boolean;
}

type SettingsTab = 'transform' | 'filters' | 'output';

export const Converter: React.FC<ConverterProps> = ({ onConversion, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>('transform');
  
  // Settings State
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number>(1);
  
  // Transform & Shape
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isCircle, setIsCircle] = useState(false);
  
  // Filters & Effects
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [watermark, setWatermark] = useState('');
  const [padding, setPadding] = useState(0);
  const [borderColor, setBorderColor] = useState('#10b981');

  // Output Settings
  const [customFilename, setCustomFilename] = useState('');
  const [stripMetadata, setStripMetadata] = useState(true);
  
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
    if (lockAspectRatio) setHeight(Math.round(val / originalAspectRatio));
  };

  const handleConvert = async () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const isRotated = rotation === 90 || rotation === 270;
      
      const baseWidth = width || img.width;
      const baseHeight = height || img.height;
      
      // Calculate final canvas size including padding
      const finalWidth = (isRotated ? baseHeight : baseWidth) + (padding * 2);
      const finalHeight = (isRotated ? baseWidth : baseHeight) + (padding * 2);
      
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 1. Draw Background/Border
        if (padding > 0) {
          ctx.fillStyle = borderColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Prepare Clipping for Circle Shape
        if (isCircle) {
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(baseWidth, baseHeight) / 2, 0, Math.PI * 2);
          ctx.clip();
        }

        // 3. Transform and Draw Image
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        
        if (isGrayscale) ctx.filter = 'grayscale(100%)';
        
        ctx.drawImage(img, -baseWidth / 2, -baseHeight / 2, baseWidth, baseHeight);
        ctx.restore();

        // 4. Draw Watermark
        if (watermark) {
          ctx.font = `${Math.max(20, baseWidth / 20)}px Tajawal`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.textAlign = 'center';
          ctx.fillText(watermark, canvas.width / 2, canvas.height - 40);
        }
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
    link.download = `${customFilename || 'image'}.${format}`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`emerald-card p-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${isDark ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'bg-white border-emerald-500/30 hover:border-emerald-500 shadow-sm'}`}
        >
          <input type="file" ref={fileInputRef} hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
          <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all text-emerald-500">
            <Upload size={40} />
          </div>
          <h2 className="text-3xl font-black mb-3">ابدأ معالجة صورك الآن</h2>
          <p className="opacity-40 font-bold uppercase tracking-widest text-xs">ادعم جودة موقعك بتحويل الصور لـ WebP</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-slide-up">
          
          {/* Left: Interactive Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`emerald-card p-6 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
              <div className={`relative aspect-square rounded-3xl overflow-hidden border ${isDark ? 'border-white/5 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'}`}>
                <div 
                  className={`w-full h-full flex items-center justify-center transition-all duration-500 ${isCircle ? 'rounded-full overflow-hidden' : ''}`}
                  style={{ 
                    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                    filter: isGrayscale ? 'grayscale(100%)' : 'none',
                    backgroundColor: padding > 0 ? borderColor : 'transparent',
                    padding: `${padding / 4}px` // Preview scaling
                  }}
                >
                  <img src={preview} className="max-w-full max-h-full object-contain" alt="Preview" />
                </div>
                {watermark && (
                  <div className="absolute bottom-10 left-0 right-0 text-center text-white/40 font-black text-xl pointer-events-none uppercase tracking-widest">
                    {watermark}
                  </div>
                )}
                <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl hover:scale-110 transition-all shadow-lg">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                 <PreviewStat label="الحجم" value={`${(selectedImage!.size / 1024).toFixed(0)} KB`} isDark={isDark} />
                 <PreviewStat label="العرض" value={`${width}px`} isDark={isDark} />
                 <PreviewStat label="الارتفاع" value={`${height}px`} isDark={isDark} />
              </div>
            </div>

            <div className={`emerald-card p-6 flex items-center justify-between ${!isDark && 'bg-white'}`}>
              <span className="text-xs font-black uppercase tracking-widest opacity-40">أدوات الشكل السريع</span>
              <div className="flex gap-2">
                <button onClick={() => setIsCircle(!isCircle)} className={`p-4 rounded-xl transition-all ${isCircle ? 'bg-emerald-500 text-black' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  <Circle size={18} />
                </button>
                <button onClick={() => { setRotation((rotation + 90) % 360) }} className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all">
                  <RotateCw size={18} />
                </button>
                <button onClick={() => setFlipH(!flipH)} className={`p-4 rounded-xl transition-all ${flipH ? 'bg-emerald-500 text-black' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  <FlipHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Tabbed Settings */}
          <div className={`lg:col-span-7 emerald-card p-10 flex flex-col min-h-[600px] ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
            {/* Tabs Header */}
            <div className="flex gap-1 p-1.5 rounded-2xl bg-black/20 mb-10">
              <TabBtn active={activeTab === 'transform'} onClick={() => setActiveTab('transform')} icon={<Maximize2 size={16}/>} label="الأبعاد والشكل" />
              <TabBtn active={activeTab === 'filters'} onClick={() => setActiveTab('filters')} icon={<Palette size={16}/>} label="الفلاتر والمؤثرات" />
              <TabBtn active={activeTab === 'output'} onClick={() => setActiveTab('output')} icon={<Save size={16}/>} label="إعدادات الملف" />
            </div>

            <div className="flex-grow">
              {activeTab === 'transform' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="grid grid-cols-2 gap-6">
                    <InputField label="العرض (Width)" value={width} onChange={(v) => handleWidthChange(v)} isDark={isDark} />
                    <InputField label="الارتفاع (Height)" value={height} onChange={(v) => setHeight(v)} isDark={isDark} disabled={lockAspectRatio} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-500">قفل النسبة والتناسب</span>
                    <button onClick={() => setLockAspectRatio(!lockAspectRatio)} className={`p-2 rounded-lg transition-all ${lockAspectRatio ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      {lockAspectRatio ? <Lock size={20}/> : <Unlock size={20}/>}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">هوامش الصورة (Padding)</label>
                    <input type="range" min="0" max="200" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-full appearance-none" />
                    {padding > 0 && (
                      <div className="flex gap-2">
                        {['#10b981', '#ffffff', '#000000', '#f43f5e', '#3b82f6'].map(c => (
                          <button key={c} onClick={() => setBorderColor(c)} className={`w-8 h-8 rounded-full border-2 ${borderColor === c ? 'border-white scale-110' : 'border-transparent'}`} style={{backgroundColor: c}} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'filters' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">العلامة المائية (نص)</label>
                    <input 
                      type="text" value={watermark} onChange={(e) => setWatermark(e.target.value)}
                      placeholder="مثال: Storehalal.shop"
                      className={`w-full px-6 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-black/40 border-white/5 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}
                    />
                  </div>
                  <button 
                    onClick={() => setIsGrayscale(!isGrayscale)}
                    className={`w-full py-5 rounded-2xl border font-black text-sm transition-all flex items-center justify-center gap-3 ${isGrayscale ? 'bg-emerald-500 text-black border-transparent' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20'}`}
                  >
                    <Ghost size={20} /> وضع الأبيض والأسود (Grayscale)
                  </button>
                </div>
              )}

              {activeTab === 'output' && (
                <div className="space-y-8 animate-slide-up">
                   <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">تعديل اسم الملف</label>
                    <input 
                      type="text" value={customFilename} onChange={(e) => setCustomFilename(e.target.value)}
                      className={`w-full px-6 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-black/40 border-white/5 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['webp', 'png', 'jpeg'].map(f => (
                      <button key={f} onClick={() => setFormat(f as any)} className={`py-4 rounded-xl font-black text-xs uppercase transition-all ${format === f ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-500" size={20} />
                      <span className="text-xs font-bold">إزالة بيانات EXIF (الخصوصية القصوى)</span>
                    </div>
                    <button onClick={() => setStripMetadata(!stripMetadata)} className={`w-10 h-5 rounded-full transition-all relative ${stripMetadata ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${stripMetadata ? 'right-6' : 'right-1'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-6 rounded-3xl font-black text-lg shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-4 group"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <RefreshCw className="group-hover:rotate-180 transition-transform duration-700" />}
                  بدء المعالجة الذكية
                </button>
              ) : (
                <div className="space-y-4">
                  <button 
                    onClick={handleDownload}
                    className="w-full bg-white text-black py-6 rounded-3xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-4 hover:scale-[1.02]"
                  >
                    <Download size={24} /> تحميل بنسخة {format.toUpperCase()}
                  </button>
                  <p className="text-center text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">تمت المعالجة بنجاح!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PreviewStat = ({ label, value, isDark }: { label: string, value: string, isDark: boolean }) => (
  <div className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
    <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1">{label}</p>
    <p className="text-sm font-black italic">{value}</p>
  </div>
);

const TabBtn = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-grow flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-white'}`}
  >
    {icon} <span className="hidden md:inline">{label}</span>
  </button>
);

const InputField = ({ label, value, onChange, isDark, disabled = false }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">{label}</label>
    <input 
      type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
      className={`w-full px-6 py-4 rounded-2xl border outline-none font-black text-center transition-all ${disabled ? 'opacity-20 cursor-not-allowed' : ''} ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-emerald-500'}`}
    />
  </div>
);
