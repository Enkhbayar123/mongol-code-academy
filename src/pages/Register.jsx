import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    country: '',
    experience: 'Beginner',
    reason: '',
    password: ''
  });
  
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSubscribed) {
      setError("Та манай YouTube сувагт Subscribe дарсан байх шаардлагатай.");
      return;
    }

    loading || setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : null,
        country: formData.country,
        programmingExperience: formData.experience,
        reasonForJoining: formData.reason,
        createdAt: new Date()
      });

      navigate('/');
      
    } catch (err) {
      console.error(err);
      let message = "Бүртгэл үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.";
      if (err.code === 'auth/email-already-in-use') {
        message = "Энэ имэйл хаяг бүртгэлтэй байна.";
      } else if (err.code === 'auth/weak-password') {
        message = "Нууц үг хэтэрхий сул байна. (6-аас дээш оронтой байх ёстой)";
      } else if (err.code === 'auth/invalid-email') {
        message = "Имэйл хаяг буруу байна.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-28 pb-16 px-6 relative z-10">
      <div className="absolute inset-0 bg-radial-glow opacity-30 blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-xl">
        <div className="glass-card rounded-3xl shadow-2xl p-10 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/5 pointer-events-none"></div>
          
          <h2 className="text-3xl font-black text-center mb-2.5 tracking-tight gradient-text">Бүртгэл Үүсгэх</h2>
          <p className="text-slate-400 text-center mb-8 text-sm sm:text-base font-semibold">Бидэнтэй нэгдэж, өөрийн программчлалын аяллыг эхлүүлээрэй</p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Subscription Check */}
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl text-center">
                <p className="text-slate-300 text-sm font-semibold mb-3.5">Биднийг дэмжиж, манай YouTube сувгийг дагаарай.</p>
                <a href="https://www.youtube.com/@MongolCodeAcademy" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl transition duration-350 shadow-md shadow-red-600/20 hover:scale-[1.03] mb-4 text-xs tracking-wider uppercase">
                    🎬 Subscribe дарах
                </a>
                <label htmlFor="subscribe" className="flex items-center justify-center text-slate-400 cursor-pointer select-none text-xs font-bold gap-2">
                    <input 
                      id="subscribe"
                      name="subscribe"
                      type="checkbox" 
                      className="h-5 w-5 rounded-lg bg-white/5 border border-white/10 text-sky-500 focus:ring-sky-500 cursor-pointer focus:outline-none"
                      checked={isSubscribed}
                      onChange={(e) => setIsSubscribed(e.target.checked)}
                    />
                    <span>Би Subscribe дарсан (Заавал дарах ёстой)</span>
                </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-300 mb-2">Бүтэн нэр</label>
                    <input 
                        id="fullName" 
                        type="text" 
                        name="fullName" 
                        autoComplete="name"
                        required 
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                        onChange={handleChange} 
                        value={formData.fullName} 
                    />
                </div>
                <div>
                   <label htmlFor="age" className="block text-sm font-semibold text-slate-300 mb-2">Нас</label>
                   <input 
                        id="age" 
                        type="number" 
                        name="age" 
                        required 
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                        onChange={handleChange} 
                        value={formData.age} 
                    />
                </div>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-slate-300 mb-2">Оршин буй газар</label>
                    <input 
                        id="country" 
                        type="text" 
                        name="country" 
                        autoComplete="country-name"
                        required 
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                        onChange={handleChange} 
                        value={formData.country} 
                    />
                </div>
                <div>
                   <label htmlFor="experience" className="block text-sm font-semibold text-slate-300 mb-2">Программчлалын туршлага</label>
                   <select 
                        id="experience" 
                        name="experience" 
                        required 
                        className="w-full px-4 py-3 rounded-2xl bg-[#080d16] border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300 cursor-pointer"
                        onChange={handleChange} 
                        value={formData.experience}
                    >
                        <option value="Beginner">Анхан түвшин</option>
                        <option value="Intermediate">Дунд түвшин</option>
                        <option value="Advanced">Ахисан түвшин</option>
                   </select>
                </div>
            </div>
            <div>
                <label htmlFor="reason" className="block text-sm font-semibold text-slate-300 mb-2">Манай платформыг ашиглаж буй шалтгаан (заавал биш)</label>
                <textarea 
                    id="reason" 
                    name="reason" 
                    rows="3" 
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                    onChange={handleChange} 
                    value={formData.reason}
                ></textarea>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">Нууц үг (багадаа 6 оронтой)</label>
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    autoComplete="new-password"
                    required 
                    minLength="6" 
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
                    onChange={handleChange} 
                    value={formData.password} 
                />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-4 rounded-2xl border border-red-500/15 animate-shake">
                {error}
              </div>
            )}

            <div>
                <button 
                  type="submit" 
                  disabled={loading || !isSubscribed}
                  className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-3.5 px-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        <span>Уншиж байна...</span>
                      </>
                    ) : (
                      <span>Бүртгэл үүсгэх</span>
                    )}
                </button>
            </div>
          </form>

          <p className="text-center text-slate-400 mt-8 text-sm font-semibold">
            Бүртгэл аль хэдийн үүсгэсэн үү? <Link to="/login" className="font-bold text-sky-400 hover:text-sky-300 transition-colors underline">Нэвтрэх</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;