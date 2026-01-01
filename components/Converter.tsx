
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Download, Trash2, Sliders, Image as ImageIcon, 
  Loader2, CheckCircle, RefreshCw, Maximize2, Minimize2,
  Lock, Unlock, Palette, RotateCw, FlipHorizontal, FlipVertical,
  Type, Info, Settings2, ShieldCheck, Square, Circle, 
  Layers, Ghost, Frame, Save, Scissors
} from 'lucide-react';

interface ConverterProps {
  onConversion: (savedKB: number) => void;
  isDark: boolean;
}

type SettingsTab = 'transform' | 'filters' | 'output';

export const Converter: React.FC<ConverterProps> = ({ onConversion, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>('transform');
  
  // Basic Settings
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number>(1);
  
  // Transform
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isCircle, setIsCircle] = useState(false);
  const [roundedCorners, setRoundedCorners] = useState(0);
  
  // Effects
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [watermark, setWatermark] = useState('');
  const [padding, setPadding] = useState(0);
  const [borderColor, setBorderColor] = useState('#10b981');

  // Output
  const [customFilename, setCustomFilename] = useState('');
  
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
    
    await new Promise(r => setTimeout(r, 600));

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = preview;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isRotated = rotation === 90 || rotation === 270;
      const targetWidth = width || img.width;
      const targetHeight = height || img.height;
      
      const drawWidth = targetWidth;
      const drawHeight = targetHeight;
      
      const canvasWidth = (isRotated ? drawHeight : drawWidth) + (padding * 2);
      const canvasHeight = (isRotated ? drawWidth : drawHeight) + (padding * 2);
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // 1. Fill Background
      if (padding > 0) {
        ctx.fillStyle = borderColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      } else if (format !== 'jpeg') {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // 2. Shape Clipping
      if (isCircle || roundedCorners > 0) {
        ctx.beginPath();
        if (isCircle) {
          ctx.arc(canvasWidth / 2, canvasHeight / 2, Math.min(drawWidth, drawHeight) / 2, 0, Math.PI * 2);
        } else {
          const r = roundedCorners;
          const x = (canvasWidth - drawWidth) / 2;
          const y = (canvasHeight - drawHeight) / 2;
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + drawWidth, y, x + drawWidth, y + drawHeight, r);
          ctx.arcTo(x + drawWidth, y + drawHeight, x, y + drawHeight, r);
          ctx.arcTo(x, y + drawHeight, x, y, r);
          ctx.arcTo(x, y, x + drawWidth, y, r);
        }
        ctx.closePath();
        ctx.clip();
      }

      // 3. Transformation
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      
      if (isGrayscale) {
        ctx.filter = 'grayscale(100%)';
      }
      
      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      // 4. Watermark
      if (watermark) {
        ctx.save();
        ctx.font = `bold ${Math.max(16, drawWidth / 20)}px Tajawal`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(watermark, canvasWidth / 2, canvasHeight - (padding + 20));
        ctx.restore();
      }
      
      const dataUrl = canvas.toDataURL(`image/${format}`, quality / 100);
      setResult(dataUrl);
      
      const stringLength = dataUrl.split(',')[1].length;
      const sizeInBytes = Math.floor(stringLength * 0.75);
      setResultSize(sizeInBytes);
      
      const savedKB = (selectedImage.size - sizeInBytes) / 1024;
      
      setIsProcessing(false);
      onConversion(Math.max(0, savedKB));
    };
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `${customFilename || 'storehalal-img'}.${format}`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-12">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`emerald-card p-10 sm:p-20 md:p-32 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${isDark ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'bg-white border-emerald-500/30 hover:border-emerald-500 shadow-sm'}`}
        >
          <input type="file" ref={fileInputRef} hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
          <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all text-emerald-500">
            <Upload size={36} className="md:w-12 md:h-12" />
          </div>
          <h2 className="text-xl md:text-4xl font-black mb-3 text-center">ارفع صورتك للمعالجة الفورية</h2>
          <p className="opacity-40 font-bold uppercase tracking-widest text-[9px] md:text-xs">يدعم الصيغ: PNG, JPEG, WEBP, GIF وغيرها</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start animate-slide-up">
          
          {/* Preview Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`emerald-card p-4 md:p-8 ${!isDark && 'bg-white shadow-xl shadow-zinc-200/50'}`}>
              <div className={`relative aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden border ${isDark ? 'border-white/5 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'}`}>
                <div 
                  className={`w-full h-full flex items-center justify-center transition-all duration-500 ${isCircle ? 'rounded-full overflow-hidden' : ''}`}
                  style={{ 
                    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                    filter: isGrayscale ? 'grayscale(100%)' : 'none',
                    backgroundColor: padding > 0 ? borderColor : 'transparent',
                    padding: `${padding / 6}px`,
                    borderRadius: isCircle ? '100%' : `${roundedCorners / 4}px`
                  }}
                >
                  <img src={preview} className="max-w-full max-h-full object-contain" alt="Preview" />
                </div>
                <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-all shadow-xl">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                 <PreviewStat label="الحجم" value={`${(selectedImage!.size / 1024).toFixed(0)} KB`} isDark={isDark} />
                 <PreviewStat label="العرض" value={`${width}px`} isDark={isDark} />
                 <PreviewStat label="الارتفاع" value={`${height}px`} isDark={isDark} />
              </div>
            </div>

            <div className={`emerald-card p-4 md:p-6 flex items-center justify-between ${!isDark && 'bg-white'}`}>
              <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">تحكم هندسي</span>
              <div className="flex gap-2">
                <button onClick={() => { setIsCircle(!isCircle); setRoundedCorners(0); }} className={`p-3 rounded-xl transition-all ${isCircle ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-500'}`}><Circle size={20} /></button>
                <button onClick={() => setRotation((rotation + 90) % 360)} className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"><RotateCw size={20} /></button>
                <button onClick={() => setFlipH(!flipH)} className={`p-3 rounded-xl transition-all ${flipH ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-500'}`}><FlipHorizontal size={20} /></button>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className={`lg:col-span-7 emerald-card p-6 md:p-12 flex flex-col min-h-[500px] md:min-h-[600px] ${!isDark && 'bg-white'}`}>
            <div className="flex gap-1 p-1.5 rounded-2xl bg-black/10 md:bg-black/20 mb-8 md:mb-12 overflow-x-auto no-scrollbar">
              <TabBtn active={activeTab === 'transform'} onClick={() => setActiveTab('transform')} icon={<Maximize2 size={16}/>} label="الأبعاد" />
              <TabBtn active={activeTab === 'filters'} onClick={() => setActiveTab('filters')} icon={<Palette size={16}/>} label="المؤثرات" />
              <TabBtn active={activeTab === 'output'} onClick={() => setActiveTab('output')} icon={<Save size={16}/>} label="التصدير" />
            </div>

            <div className="flex-grow">
              {activeTab === 'transform' && (
                <div className="space-y-8 md:space-y-10 animate-slide-up">
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <InputField label="العرض (px)" value={width} onChange={handleWidthChange} isDark={isDark} />
                    <InputField label="الارتفاع (px)" value={height} onChange={v => setHeight(v)} isDark={isDark} disabled={lockAspectRatio} />
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs font-black uppercase text-emerald-500 tracking-wider">قفل التناسب</span>
                      <span className="text-[8px] opacity-40 font-bold">يحافظ على أبعاد الصورة الأصلية</span>
                    </div>
                    <button onClick={() => setLockAspectRatio(!lockAspectRatio)} className={`p-3 rounded-xl transition-all ${lockAspectRatio ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                      {lockAspectRatio ? <Lock size={20}/> : <Unlock size={20}/>}
                    </button>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between"><label className="text-[10px] font-black uppercase opacity-40">تدوير الحواف</label><span className="text-[10px] font-black text-emerald-500">{roundedCorners}px</span></div>
                    <input type="range" min="0" max="500" value={roundedCorners} disabled={isCircle} onChange={e => setRoundedCorners(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-full appearance-none disabled:opacity-20 cursor-pointer" />
                  </div>
                </div>
              )}

              {activeTab === 'filters' && (
                <div className="space-y-8 md:space-y-10 animate-slide-up">
                  <div className="space-y-5">
                    <div className="flex justify-between"><label className="text-[10px] font-black uppercase opacity-40">إضافة حواف ملونة</label><span className="text-[10px] font-black text-emerald-500">{padding}px</span></div>
                    <input type="range" min="0" max="150" value={padding} onChange={e => setPadding(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer" />
                    {padding > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {['#10b981', '#ffffff', '#000000', '#f43f5e', '#3b82f6', '#fbbf24'].map(c => (
                          <button key={c} onClick={() => setBorderColor(c)} className={`w-9 h-9 rounded-full border-2 ${borderColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`} style={{backgroundColor: c}} />
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => setIsGrayscale(!isGrayscale)} className={`w-full py-5 rounded-2xl border font-black text-sm flex items-center justify-center gap-4 transition-all ${isGrayscale ? 'bg-emerald-500 text-black border-transparent shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10 hover:bg-emerald-500/10'}`}>
                    <Ghost size={20} /> تفعيل فلتر مونوكروم
                  </button>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase opacity-40">نص العلامة المائية</label>
                    <input type="text" value={watermark} onChange={e => setWatermark(e.target.value)} placeholder="مثال: @Storehalal" className={`w-full px-6 py-4 rounded-2xl border outline-none font-bold text-base ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-emerald-500'}`} />
                  </div>
                </div>
              )}

              {activeTab === 'output' && (
                <div className="space-y-8 md:space-y-10 animate-slide-up">
                   <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase opacity-40">اسم الملف عند التحميل</label>
                    <input type="text" value={customFilename} onChange={e => setCustomFilename(e.target.value)} className={`w-full px-6 py-4 rounded-2xl border outline-none font-bold text-base ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-emerald-500'}`} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase opacity-40">صيغة التصدير</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['webp', 'png', 'jpeg'].map(f => (
                        <button key={f} onClick={() => setFormat(f as any)} className={`py-4 rounded-xl font-black text-xs uppercase transition-all ${format === f ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'}`}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center"><label className="text-[10px] font-black uppercase opacity-40">جودة الضغط (Quality)</label><span className="text-emerald-500 font-black text-xs">{quality}%</span></div>
                    <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer" />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-10 md:mt-16">
              {!result ? (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 md:py-7 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-4 group disabled:opacity-50 shadow-2xl shadow-emerald-500/20 active:scale-95"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-700" />}
                  بدء المعالجة والتصدير
                </button>
              ) : (
                <div className="space-y-4">
                  <button onClick={handleDownload} className="w-full bg-white text-black py-5 md:py-7 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all active:scale-95"><Download size={26} /> تحميل الملف الحاهز ({(resultSize/1024).toFixed(1)} KB)</button>
                  <button onClick={() => setResult(null)} className="w-full py-4 text-[10px] font-black uppercase text-zinc-500 hover:text-emerald-500 transition-all tracking-widest">إعادة ضبط الإعدادات</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PreviewStat = ({ label, value, isDark }: any) => (
  <div className={`p-3 md:p-5 rounded-xl md:rounded-[1.5rem] border text-center flex flex-col justify-center ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-100 shadow-sm'}`}>
    <p className="text-[7px] md:text-[9px] font-black uppercase opacity-30 mb-1">{label}</p>
    <p className="text-[10px] md:text-base font-black italic truncate">{value}</p>
  </div>
);

const TabBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex-grow flex items-center justify-center gap-2 py-3 md:py-4 px-4 rounded-xl text-[9px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>{icon} <span className="hidden xs:inline">{label}</span></button>
);

const InputField = ({ label, value, onChange, isDark, disabled = false }: any) => (
  <div className="space-y-2.5">
    <label className="text-[10px] font-black uppercase opacity-40 pr-2">{label}</label>
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} disabled={disabled} className={`w-full px-6 py-4 rounded-2xl border outline-none font-black text-center text-base md:text-xl transition-all ${disabled ? 'opacity-20 cursor-not-allowed bg-zinc-800' : 'focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/5'} ${isDark ? 'bg-black/40 border-white/5 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`} />
  </div>
);
