import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

const PracticeHub = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-28 pb-16 relative min-h-[calc(100vh-80px)] flex flex-col justify-start">
      {/* Dynamic glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight gradient-text">{t('practice_title')}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          {t('practice_desc')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 w-full relative z-10">
        {/* Basic Practice Card */}
        <Link 
          to="/practice-basic" 
          className="group relative glass-card glass-card-hover p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
        >
          {/* Subtle gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/0 to-sky-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="p-5 bg-sky-500/10 rounded-2xl inline-block mb-6 border border-sky-500/20 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 text-sky-400 shadow-md shadow-sky-500/5 group-hover:shadow-sky-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-black text-slate-100 mb-3 text-center group-hover:text-sky-400 transition-colors">
            {t('practice_basic_title')}
          </h2>
          <p className="text-slate-400 text-center text-sm leading-relaxed max-w-xs">
            {t('practice_basic_desc')}
          </p>
        </Link>

        {/* LeetCode Curriculum Card */}
        <Link 
          to="/curriculum" 
          className="group relative glass-card glass-card-hover p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
        >
          {/* Subtle gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="p-5 bg-emerald-500/10 rounded-2xl inline-block mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 text-emerald-400 shadow-md shadow-emerald-500/5 group-hover:shadow-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-black text-slate-100 mb-3 text-center group-hover:text-emerald-400 transition-colors">
            {t('practice_leetcode_title')}
          </h2>
          <p className="text-slate-400 text-center text-sm leading-relaxed max-w-xs">
            {t('practice_leetcode_desc')}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PracticeHub;