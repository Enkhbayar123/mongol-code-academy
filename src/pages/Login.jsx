import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      console.error(err);
      let message = "Таны нэвтрэх хаяг эсвэл нууц үг буруу байна.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = "Имэйл эсвэл нууц үг буруу байна.";
      } else if (err.code === 'auth/too-many-requests') {
        message = "Хэт олон удаа оролдлоо. Түр хүлээгээд дахин оролдоно уу.";
      }
      setError(message);
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
          
          <h2 className="text-3xl font-black text-center mb-2.5 tracking-tight gradient-text">Буцаад тавтай морил</h2>
          <p className="text-slate-400 text-center mb-8 text-sm sm:text-base font-medium">Нэвтрээд программчлалын аяллаа үргэлжлүүлээрэй</p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Мейл хаяг</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                autoComplete="email"
                required 
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">Нууц үг</label>
              <input 
                id="password"
                type="password" 
                name="password" 
                autoComplete="current-password"
                required 
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                onChange={handleChange}
                value={formData.password}
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
                  <span>Нэвтрэх</span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-slate-400 mt-8 text-sm font-semibold">
            Бүртгэл байхгүй юу? - <Link to="/register" className="font-bold text-sky-400 hover:text-sky-300 transition-colors underline">Бүртгэл үүсгэх</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;