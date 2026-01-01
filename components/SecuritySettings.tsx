
import React, { useState } from 'react';
import { ShieldCheck, Lock, Save, ArrowRight, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface SecuritySettingsProps {
  isDark: boolean;
  onSave: (newPassword: string) => void;
  onCancel: () => void;
  currentSavedPassword: string;
  onForceResetData: () => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSave, onCancel, currentSavedPassword }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentInput !== currentSavedPassword) {
      setError('كلمة المرور الحالية غير صحيحة!');
      return;
    }

    if (newPassword.length < 4) {
      setError('كلمة المرور قصيرة جداً.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('كلمتا المرور الجديدتان غير متطابقتين.');
      return;
    }

    onSave(newPassword);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setCurrentInput('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-slide-up">
      <div className="emerald-card p-10 border-emerald-500/10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
            <Lock size={28} />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter">تحديث الرمز السري</h3>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">تغيير وصول المسؤول</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">كلمة المرور الحالية</label>
            <input 
              type="password"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">الرمز الجديد</label>
              <input 
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold"
                placeholder="4 رموز فأكثر"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                className="absolute left-4 bottom-4 text-white/20 hover:text-emerald-500"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">تأكيد الرمز الجديد</label>
              <input 
                type={showNew ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold"
                placeholder="أعد الكتابة"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-xl text-xs font-black uppercase tracking-widest">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-black uppercase tracking-widest">
              <ShieldCheck size={18} /> تم تحديث الرمز بنجاح!
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 mt-4"
          >
            <Save size={20} />
            حفظ الرمز الجديد
          </button>
        </form>
      </div>
    </div>
  );
};
