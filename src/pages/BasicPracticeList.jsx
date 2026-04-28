import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Changed getDoc to onSnapshot
import { auth, db } from '../firebase';
import { basicPracticeData } from '../data/basic-practice-data';

const BasicPracticeList = () => {
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const navigate = useNavigate();

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
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">Программчлалын үндсэн дадлага</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Суурь чадваруудыг эзэмшихэд тань туслах бодлогын видео тайлбарууд.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900/70 border border-slate-800 rounded-lg p-4">
        <ul className="space-y-3">
          {basicPracticeData.map((problem) => {
            const isSolved = solvedProblems.includes(problem.id);

            return (
              <li key={problem.id}>
                <Link 
                  to={`/practice-basic/${problem.id}`}
                  className={`
                    block w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border flex justify-between items-center group
                    ${isSolved 
                        ? "bg-gradient-to-r from-emerald-900/40 to-slate-900/40 border-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]" // Solved Style
                        : "bg-slate-800/30 border-slate-700 hover:bg-slate-800 hover:border-sky-500/50" // Default Style
                    }
                  `}
                >
                  <span className={`font-semibold text-lg ${isSolved ? "text-emerald-100" : "text-slate-300 group-hover:text-white"}`}>
                    {problem.name}
                  </span>
                  
                  {isSolved ? (
                     <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Бодсон</span>
                     </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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