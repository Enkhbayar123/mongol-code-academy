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
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 gradient-text">Буцаад тавтай морил</h2>
          <p className="text-slate-400 text-center mb-8">Нэвтрээд программчлалын аяллаа үргэлжлүүлээрэй</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* Added htmlFor */}
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Мейл хаяг</label>
              <input 
                id="email"               // FIX: ID added
                type="email" 
                name="email" 
                autoComplete="email"     // FIX: Autocomplete added
                required 
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              {/* Added htmlFor */}
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Нууц үг</label>
              <input 
                id="password"            // FIX: ID added
                type="password" 
                name="password" 
                autoComplete="current-password" // FIX: Autocomplete added
                required 
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                {error}
              </div>
            )}

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Уншиж байна...' : 'Нэвтрэх'}
              </button>
            </div>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Бүртгэл байхгүй юу? - <Link to="/register" className="font-medium text-sky-400 hover:underline">Бүртгэл үүсгэх</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;