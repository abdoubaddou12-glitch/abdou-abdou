
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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] border animate-fade-in ${
        isDark ? 'bg-zinc-950 border-emerald-500/20' : 'bg-white border-zinc-100 shadow-2xl shadow-emerald-500/10'
      }`}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-6 shadow-xl shadow-emerald-500/30">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">دخول الإدارة</h1>
          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>يرجى إدخال كلمة السر للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة السر"
              className={`w-full px-12 py-4 rounded-2xl outline-none border transition-all ${
                error 
                  ? 'border-red-500 bg-red-500/5' 
                  : isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'
              }`}
              autoFocus
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center animate-pulse">كلمة السر خاطئة، حاول مرة أخرى!</p>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-4 rounded-2xl font-black shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
          >
            دخول للمنصة
          </button>
        </form>

        <button 
          onClick={onCancel}
          className="w-full mt-4 py-2 text-sm font-bold opacity-40 hover:opacity-100 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} /> العودة للرئيسية
        </button>
      </div>
    </div>
  );
};
