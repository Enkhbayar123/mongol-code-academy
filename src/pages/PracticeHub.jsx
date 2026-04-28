import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const PracticeHub = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">Бодлогын сан</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Өөрийн ур чадварын түвшинд тохирох замыг сонгоно уу. Үндсэн дадлагаас эхэлж эсвэл LeetCode-ийн сорилтууд руу шууд ороорой.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Basic Practice Card */}
        <Link 
          to="/practice-basic" 
          className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
        >
          <div className="p-4 bg-sky-500/10 rounded-lg inline-block mb-4 border border-sky-500/20 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-sky-400 transition-colors">Программчлалын үндсэн дадлага</h2>
          <p className="text-slate-400 text-center">Суурь ойлголтуудыг бататгах энгийн бодлогууд.</p>
        </Link>

        {/* LeetCode Curriculum Card */}
        <Link 
          to="/curriculum" 
          className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
        >
          <div className="p-4 bg-emerald-500/10 rounded-lg inline-block mb-4 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-emerald-400 transition-colors">LeetCode-ийн бодлогууд</h2>
          <p className="text-slate-400 text-center">Ажлын ярилцлагад бэлтгэх алгоритмын бодлогууд.</p>
        </Link>
      </div>
    </div>
  );
};

export default PracticeHub;