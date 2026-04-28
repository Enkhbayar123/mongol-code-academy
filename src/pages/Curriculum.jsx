import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
// Import Firestore listeners
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { problemData } from '../data/problem-data';

const Curriculum = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]); // Store solved IDs
  const navigate = useNavigate();

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

  if (loading) return <div className="text-center text-slate-400 mt-20">Loading curriculum...</div>;

  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">LeetCode - ийн бодлогууд</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Суурь ойлголтоос эхлээд ахисан түвшний сэдвүүдийг хамарсан чухал өгөгдлийн бүтэц, алгоритмын бүтэцтэй зам.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {problemData.map((categoryData, index) => (
          <div key={index} className={`accordion-item bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden transition-all duration-300 ${activeCategory === categoryData.category ? 'ring-1 ring-sky-500/30' : ''}`}>
            
            <button 
              onClick={() => toggleCategory(categoryData.category)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-semibold text-white">{categoryData.category}</span>
              <svg 
                className={`w-6 h-6 text-slate-400 flex-shrink-0 transform transition-transform duration-300 ${activeCategory === categoryData.category ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <div className={`accordion-content bg-black/20 transition-all duration-500 ease-in-out ${activeCategory === categoryData.category ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="p-2 sm:p-4 space-y-2">
                {categoryData.problems.map((p) => {
                  const isSolved = solvedProblems.includes(p.id);
                  
                  return (
                    <li key={p.id}>
                      <Link 
                        to={`/problem/${p.id}`} 
                        className={`
                          block w-full text-left py-3 px-4 rounded-md transition-all duration-200 border flex justify-between items-center group
                          ${isSolved 
                              ? "bg-green-900/20 border-green-500/50 hover:bg-green-900/30 shadow-[0_0_10px_-3px_rgba(34,197,94,0.2)]" // Solved Style
                              : "border-slate-800/50 hover:bg-slate-800/50 hover:border-sky-500/30" // Default Style
                          }
                        `}
                      >
                        <span className={`font-medium ${isSolved ? "text-green-100" : "text-slate-300 group-hover:text-white"}`}>
                            {p.name}
                        </span>
                        
                        {isSolved ? (
                            <div className="flex items-center gap-2 bg-green-500/20 px-2 py-0.5 rounded text-xs border border-green-500/40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-400 font-bold uppercase">Бодсон</span>
                            </div>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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