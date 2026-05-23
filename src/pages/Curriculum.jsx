import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
// Import Firestore listeners
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { problemData } from '../data/problem-data';
import { useLanguage } from '../context/LanguageContext';

const Curriculum = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]); // Store solved IDs
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Listen for Auth
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        // 2. Listen for Real-time Database Updates
        const docRef = doc(db, "users", user.uid);
        
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setSolvedProblems(data.solvedProblems || []);
                // console.log("Solved LeetCode Problems:", data.solvedProblems);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching progress:", error);
            setLoading(false);
        });

        return () => unsubscribeSnapshot();
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  if (loading) return <div className="text-center text-slate-400 mt-20">{t('courses_loading')}</div>;

  return (
    <div className="container mx-auto px-6 pt-28 pb-16 relative z-10">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight gradient-text">{t('practice_leetcode_title')}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          {t('curriculum_desc')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {problemData.map((categoryData, index) => (
          <div key={index} className={`glass-card rounded-3xl overflow-hidden transition-all duration-300 border ${activeCategory === categoryData.category ? 'border-sky-500/30 bg-slate-900/40 shadow-sky-500/5' : 'border-white/5'}`}>
            
            <button 
              onClick={() => toggleCategory(categoryData.category)}
              className="w-full flex justify-between items-center p-6 sm:p-8 text-left hover:bg-white/5 transition-all"
            >
              <span className="text-lg sm:text-xl font-bold text-slate-100">{t(categoryData.category)}</span>
              <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 flex-shrink-0 transition-all duration-300 ${activeCategory === categoryData.category ? 'rotate-180 text-sky-400 bg-sky-500/10 border-sky-500/25' : 'hover:text-slate-200'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <div className={`accordion-content bg-[#03060c]/40 transition-all duration-500 ease-in-out overflow-hidden ${activeCategory === categoryData.category ? 'max-h-[2000px] opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
              <ul className="p-5 sm:p-7 space-y-3">
                {categoryData.problems.map((p) => {
                  const isSolved = solvedProblems.includes(p.id);
                  
                  return (
                    <li key={p.id}>
                      <Link 
                        to={`/problem/${p.id}`} 
                        className={`
                          block w-full text-left py-3 px-5 rounded-xl transition-all duration-300 border flex justify-between items-center group
                          ${isSolved 
                              ? "bg-emerald-500/10 border-emerald-500/35 hover:bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.1)]" // Solved Style
                              : "bg-white/5 border-white/5 hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-md hover:shadow-sky-500/5" // Default Style
                          }
                        `}
                      >
                        <span className={`text-sm font-bold tracking-wide ${isSolved ? "text-emerald-300" : "text-slate-300 group-hover:text-white"}`}>
                            {t(p.id + '_name')}
                        </span>
                        
                        {isSolved ? (
                            <div className="flex items-center gap-2 bg-emerald-500/20 px-3.5 py-1 rounded-xl text-xs border border-emerald-500/40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-emerald-400 font-black uppercase tracking-wider">{t('solved')}</span>
                            </div>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;