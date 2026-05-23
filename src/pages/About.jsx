import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-80px)] text-white pt-28 pb-16 relative overflow-hidden flex flex-col justify-start z-10">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight gradient-text">
            {t('about_title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-semibold">
            {t('about_desc')}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {/* Stat 1 */}
          <div className="glass-card rounded-3xl p-10 text-center hover:border-sky-500/25 transition-all duration-300 shadow-xl group border border-white/5">
            <p className="text-5xl font-black text-sky-400 mb-2 group-hover:scale-105 transition-transform duration-300">{t('about_stat_courses_val')}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('about_stat_courses_title')}</p>
          </div>
          {/* Stat 2 */}
          <div className="glass-card rounded-3xl p-10 text-center hover:border-purple-500/25 transition-all duration-300 shadow-xl group border border-white/5">
            <p className="text-5xl font-black text-purple-400 mb-2 group-hover:scale-105 transition-transform duration-300">{t('about_stat_students_val')}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('about_stat_students_title')}</p>
          </div>
          {/* Stat 3 */}
          <div className="glass-card rounded-3xl p-10 text-center hover:border-emerald-500/25 transition-all duration-300 shadow-xl group border border-white/5">
            <p className="text-5xl font-black text-emerald-400 mb-2 group-hover:scale-105 transition-transform duration-300">{t('about_stat_rating_val')}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('about_stat_rating_title')}</p>
          </div>
        </div>

        {/* Vision/Mission Section */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 sm:p-14 shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/5 pointer-events-none"></div>
          <div className="grid md:grid-cols-3 gap-10 items-center relative z-10">
            <div className="md:col-span-1 flex flex-col justify-center">
              <span className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2.5">Our Mission</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100 leading-snug">
                {t('about_mission_title')}
              </h2>
              <div className="w-12 h-[3px] bg-gradient-to-r from-sky-400 to-purple-500 mt-4 rounded-full"></div>
            </div>
            <div className="md:col-span-2 text-slate-300 leading-relaxed text-base sm:text-lg font-medium">
              {t('about_mission_text')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
