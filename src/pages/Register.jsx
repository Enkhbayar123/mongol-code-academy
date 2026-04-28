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

    setLoading(true);

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
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 gradient-text">Бүртгэл Үүсгэх</h2>
          <p className="text-slate-400 text-center mb-8">Бидэнтэй нэгдэж, өөрийн программчлалын аяллыг эхлүүлээрэй</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Subscription Check */}
            <div className="bg-slate-800/50 border border-sky-500/30 p-4 rounded-lg text-center">
                <p className="text-slate-300 mb-3">Биднийг дэмжиж, манай Youtube сувгийг дагаарай.</p>
                <a href="https://www.youtube.com/@MongolCodeAcademy" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition mb-4">
                    Subscribe дарах
                </a>
                <label htmlFor="subscribe" className="flex items-center justify-center text-slate-400 cursor-pointer select-none">
                    <input 
                      id="subscribe" // FIX: Added ID
                      name="subscribe" // FIX: Added Name
                      type="checkbox" 
                      className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-sky-500 focus:ring-sky-500"
                      checked={isSubscribed}
                      onChange={(e) => setIsSubscribed(e.target.checked)}
                    />
                    <span className="ml-2">Би Subscribe дарсан (Заавал дарах ёстой)</span>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">Бүтэн нэр</label>
                    <input 
                        id="fullName" 
                        type="text" 
                        name="fullName" 
                        autoComplete="name" // FIX
                        required 
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                        onChange={handleChange} 
                        value={formData.fullName} 
                    />
                </div>
                <div>
                   <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">Нас</label>
                   <input 
                        id="age" 
                        type="number" 
                        name="age" 
                        required 
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                        onChange={handleChange} 
                        value={formData.age} 
                    />
                </div>
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Мейл хаяг</label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    autoComplete="email" // FIX
                    required 
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                    onChange={handleChange} 
                    value={formData.email} 
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">Оршин буй газар</label>
                    <input 
                        id="country" 
                        type="text" 
                        name="country" 
                        autoComplete="country-name" // FIX
                        required 
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                        onChange={handleChange} 
                        value={formData.country} 
                    />
                </div>
                <div>
                   <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-2">Программчлалын туршлага</label>
                   <select 
                        id="experience" 
                        name="experience" 
                        required 
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
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
                <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-2">Манай платформыг ашиглаж буй шалтгаан (заавал биш)</label>
                <textarea 
                    id="reason" 
                    name="reason" 
                    rows="3" 
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                    onChange={handleChange} 
                    value={formData.reason}
                ></textarea>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Нууц үг (багадаа 6 оронтой)</label>
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    autoComplete="new-password" // FIX
                    required 
                    minLength="6" 
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
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
                  disabled={loading || !isSubscribed}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? 'Уншиж байна...' : 'Бүртгэл үүсгэх'}
                </button>
            </div>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Бүртгэл аль хэдийн үүсгэсэн үү? <Link to="/login" className="font-medium text-sky-400 hover:underline">Нэвтрэх</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;