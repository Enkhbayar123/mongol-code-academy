import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { coursesData } from '../data/courses-data';
import { useLanguage } from '../context/LanguageContext';

const Courses = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  
  // State for the UI
  const [activeCourseId, setActiveCourseId] = useState(null); // Which accordion is open?
  const [selectedVideo, setSelectedVideo] = useState(null);   // Which video is playing?
  
  const navigate = useNavigate();

  // 1. Auth Protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Redirect to login if not authenticated
        navigate('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Toggle Accordion
  const toggleAccordion = (id) => {
    if (activeCourseId === id) {
      setActiveCourseId(null); // Close if already open
    } else {
      setActiveCourseId(id); // Open the clicked one
    }
  };

  // 3. Open Video Modal
  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  // 4. Close Video Modal
  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide">{t('courses_loading')}</span>
        </div>
      </div>
    );
  }

  // If we are here, the user is logged in
  return (
    <div className="container mx-auto px-6 pt-28 pb-16 relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight gradient-text">{t('courses_title')}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          {t('courses_desc')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {coursesData.map((course) => {
          const isOpen = activeCourseId === course.id;
          return (
            <div 
              key={course.id} 
              className={`glass-card rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-md shadow-xl border ${
                isOpen ? 'border-sky-500/30 bg-slate-900/40 shadow-sky-500/5' : 'border-white/5 hover:border-white/15'
              }`}
            >
              {/* Accordion Header */}
              <button 
                onClick={() => toggleAccordion(course.id)}
                className="w-full flex justify-between items-start sm:items-center p-6 sm:p-8 text-left transition-colors"
              >
                <div className="pr-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 transition-colors">
                    {t(course.id)}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2.5 leading-relaxed max-w-2xl">
                    {t(`${course.id}-desc`)}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 mt-1.5 sm:mt-0 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-sky-400 bg-sky-500/10 border-sky-500/25 shadow-md shadow-sky-500/10' : 'hover:text-slate-200'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[1000px] border-t border-white/5' : 'max-h-0'
                }`}
              >
                <ul className="p-5 sm:p-7 space-y-3 bg-[#03060c]/40">
                  {course.lectures.map((lecture, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => openVideo(lecture.videoId)}
                        className="w-full text-left flex items-center gap-4 py-4 px-5 text-slate-300 hover:text-white rounded-2xl transition-all duration-300 bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/10 group shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-md shadow-sky-500/5">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">{t(lecture.title)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in"
          onClick={closeVideo}
        >
          <div 
            className="bg-[#030712] border border-white/10 rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeVideo} 
              className="absolute top-4 right-4 h-9 w-9 bg-slate-900/60 hover:bg-white/10 border border-white/10 text-white rounded-xl flex items-center justify-center z-10 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full relative pt-[56.25%]">
               <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;