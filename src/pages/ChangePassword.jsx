import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой. (Password must be at least 6 characters.)');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Нууц үг зөрүүтэй байна. (Passwords do not match.)');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        setError('Хэрэглэгч нэвтрээгүй байна. (User not logged in.)');
        return;
      }

      // 1. Update password in Firebase Auth
      await updatePassword(user, newPassword);

      // 2. Remove force password change flag in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        mustChangePassword: false
      });

      // 3. Redirect to home/dashboard
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setError('Аюулгүй байдлын үүднээс дахин нэвтэрч орно уу. (Please log in again before changing password.)');
      } else {
        setError('Нууц үг солиход алдаа гарлаа. (Failed to update password.)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-start pt-28 pb-12 px-6 relative z-10">
      <div className="absolute inset-0 bg-radial-glow opacity-30 blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-lg">
        <div className="glass-card rounded-3xl shadow-2xl p-10 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/5 pointer-events-none"></div>
          
          <h2 className="text-3xl font-black text-center mb-2.5 tracking-tight gradient-text">
            Нууц үг шинэчлэх
          </h2>
          <p className="text-slate-400 text-center mb-8 text-sm sm:text-base font-medium">
            Тэгш ухаан сургуулийн сурагчид анхны нэвтрэлтийн дараа шинэ нууц үг тохируулах шаардлагатай.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                Шинэ нууц үг (New Password)
              </label>
              <input 
                id="newPassword"
                type="password" 
                name="newPassword" 
                required 
                minLength="6"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                Нууц үг баталгаажуулах (Confirm Password)
              </label>
              <input 
                id="confirmPassword"
                type="password" 
                name="confirmPassword" 
                required 
                minLength="6"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-4 rounded-2xl border border-red-500/15">
                {error}
              </div>
            )}

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-3.5 px-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    <span>Уншиж байна...</span>
                  </>
                ) : (
                  <span>Шинэчлэх (Update Password)</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;