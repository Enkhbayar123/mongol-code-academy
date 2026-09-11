// src/pages/BasicPracticeList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { basicPracticeData } from '../data/basic-practice-data';

export default function BasicPracticeList() {
  const [solvedIds, setSolvedIds] = useState([]);

  // Load persistent solved problem IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mca_solved_problems');
      if (stored) {
        setSolvedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Filter out compilation/overview items (like bp-16) for count calculations
  const countableProblems = basicPracticeData.filter((p) => p.testCases && p.testCases.length > 0);
  const solvedCount = countableProblems.filter((p) => solvedIds.includes(p.id)).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-12 px-6 sm:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
                RGB7 Суурь Дасгалууд
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Анхан шатны дадлага
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Програмчлалын суурь чадвар олгох SPOJ RGB7 системийн бодлогууд
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800/80 shadow-sm flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">
                Бодогдсон: <span className="text-emerald-400 font-bold">{solvedCount}</span> / {countableProblems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Problems List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {basicPracticeData.map((problem) => {
            const isSolved = solvedIds.includes(problem.id);
            const isCompilation = !problem.testCases || problem.testCases.length === 0;

            return (
              <Link
                key={problem.id}
                to={`/practice-basic/${problem.id}`}
                className="group p-5 rounded-2xl bg-[#0b1120] border border-slate-800/70 hover:border-sky-500/50 hover:bg-[#0d1629] transition-all duration-200 flex items-center justify-between shadow-sm"
              >
                <div className="space-y-2 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/30">
                      {problem.id.toUpperCase()}
                    </span>

                    {isSolved && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                        <span>✓</span>
                        <span>Бодогдсон</span>
                      </span>
                    )}

                    {isCompilation && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                        Нэгтгэл видео
                      </span>
                    )}
                  </div>

                  <h2 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {problem.name}
                  </h2>

                  {problem.spojLink && (
                    <span className="text-xs text-slate-500 block truncate">
                      SPOJ код: RGB7{problem.id.replace('bp-', '').padStart(3, '0')}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 text-slate-500 group-hover:text-sky-400 text-xs font-semibold shrink-0 transition-colors">
                  <span>{isCompilation ? 'Үзэх' : 'Бодох'}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}