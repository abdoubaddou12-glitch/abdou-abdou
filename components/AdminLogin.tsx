
import React, { useState } from 'react';
import { Lock, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  isDark: boolean;
  onLogin: (password: string) => boolean;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isDark, onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className={`w-full max-w-md p-10 rounded-[3rem] border animate-slide-up bg-black/40 backdrop-blur-2xl border-emerald-500/20 shadow-2xl shadow-emerald-500/5`}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-6 shadow-xl shadow-emerald-500/30">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tighter">دخول الإدارة</h1>
          <p className="text-sm opacity-40 font-medium">يرجى إدخال كلمة السر للوصول إلى مركز التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة السر"
              className={`w-full pr-14 pl-14 py-5 rounded-2xl outline-none border transition-all font-bold text-center ${
                error 
                  ? 'border-red-500 bg-red-500/5' 
                  : 'bg-black/50 border-white/10 focus:border-emerald-500'
              }`}
              autoFocus
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30" size={20} />
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-emerald-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-black text-center animate-pulse uppercase tracking-widest">خطأ في كلمة السر!</p>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            دخول للمنصة
          </button>
        </form>

        <button 
          onClick={onCancel}
          className="w-full mt-6 py-2 text-[10px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft size={14} /> العودة للرئيسية
        </button>
      </div>
    </div>
  );
};
