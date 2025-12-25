
import React, { useState } from 'react';
import { ShieldCheck, Lock, Save, ArrowRight, AlertTriangle } from 'lucide-react';

interface SecuritySettingsProps {
  isDark: boolean;
  onSave: (newPassword: string) => void;
  onCancel: () => void;
  currentSavedPassword: string;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ isDark, onSave, onCancel, currentSavedPassword }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentInput !== currentSavedPassword) {
      setError('كلمة المرور الحالية غير صحيحة!');
      return;
    }

    if (newPassword.length < 6) {
      setError('يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('كلمتا المرور الجديدتان غير متطابقتين.');
      return;
    }

    onSave(newPassword);
    setSuccess(true);
    setTimeout(() => onCancel(), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter">إعدادات الأمان</h1>
          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>تغيير الرقم السيري للوصول إلى لوحة تحكم عبدو ويب.</p>
        </div>
        <button onClick={onCancel} className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-all">
          <ArrowRight size={24} />
        </button>
      </div>

      <div className={`glass-card p-10 rounded-[3rem] border ${isDark ? 'border-emerald-500/20' : 'border-zinc-100'}`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
            <Lock size={28} />
          </div>
          <div className="font-black text-xl">تحديث الرمز السري</div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">كلمة المرور الحالية</label>
            <input 
              type="password"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'}`}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">الرمز الجديد</label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'}`}
                placeholder="6 أحرف فأكثر"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">تأكيد الرمز الجديد</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'}`}
                placeholder="أعد الكتابة"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-2xl text-sm font-bold animate-shake">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl text-sm font-bold">
              <ShieldCheck size={18} /> تم تحديث الرمز السري بنجاح!
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-[2rem] font-black shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 mt-4"
          >
            <Save size={20} />
            حفظ الرمز الجديد
          </button>
        </form>
      </div>
    </div>
  );
};
