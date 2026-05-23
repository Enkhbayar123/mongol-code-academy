import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Changed getDoc to onSnapshot
import { auth, db } from '../firebase';
import { basicPracticeData } from '../data/basic-practice-data';
import { useLanguage } from '../context/LanguageContext';

const BasicPracticeList = () => {
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Listen for Auth
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        // 2. Listen for Real-time Database Updates (onSnapshot)
        const docRef = doc(db, "users", user.uid);
        
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const solved = data.solvedProblems || [];
                setSolvedProblems(solved);
                console.log("Real-time Solved Update:", solved);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error listening to user progress:", error);
            setLoading(false);
        });

        // Cleanup listener when component unmounts
        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="container mx-auto px-6 pt-28 pb-16 relative z-10">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight gradient-text">{t('practice_basic_title')}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          {t('basic_practice_list_desc')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 border border-white/5 shadow-2xl">
        <ul className="space-y-3">
          {basicPracticeData.map((problem) => {
            const isSolved = solvedProblems.includes(problem.id);

            return (
              <li key={problem.id}>
                <Link 
                  to={`/practice-basic/${problem.id}`}
                  className={`
                    block w-full text-left py-3 px-5 rounded-xl transition-all duration-300 border flex justify-between items-center group
                    ${isSolved 
                        ? "bg-emerald-500/10 border-emerald-500/35 hover:bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.1)]" // Solved Style
                        : "bg-white/5 border-white/5 hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-md hover:shadow-sky-500/5" // Default Style
                    }
                  `}
                >
                  <span className={`text-sm font-bold tracking-wide ${isSolved ? "text-emerald-300" : "text-slate-300 group-hover:text-white"}`}>
                    {t(problem.id + '_name')}
                  </span>
                  
                  {isSolved ? (
                     <div className="flex items-center gap-2 bg-emerald-500/20 px-3.5 py-1 rounded-xl border border-emerald-500/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">{t('solved')}</span>
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
  );
};

export default BasicPracticeList;