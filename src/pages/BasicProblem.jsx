// src/pages/BasicProblem.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { basicPracticeData, basicProblemMap } from '../data/basic-practice-data';
import CodeEditorWindow from '../components/CodeEditorWindow';
import { executeCode, runTestCases } from '../utils/judge0';

// Universal starter template for C++
const CPP_INITIAL_CODE = `#include <iostream>
using namespace std;

int main() {
	// your code goes here
	return 0;
}`;

export default function BasicProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = basicProblemMap[id] || basicPracticeData[0];

  // Determine the next problem for auto-progression
  const currentIndex = basicPracticeData.findIndex((p) => p.id === problem.id);
  const nextProblem =
    currentIndex !== -1 && currentIndex < basicPracticeData.length - 1
      ? basicPracticeData[currentIndex + 1]
      : null;

  // Persisted solved problems array from localStorage
  const [solvedProblems, setSolvedProblems] = useState(() => {
    try {
      const stored = localStorage.getItem('mca_solved_problems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const isSolved = solvedProblems.includes(problem.id);

  // Left pane sub-tab: 'problem' (БОДЛОГО) | 'video' (ВИДЕО ТАЙЛБАР)
  const [leftTab, setLeftTab] = useState('problem');

  // Code editor & execution state
  const [selectedLanguage, setSelectedLanguage] = useState(problem.defaultLanguage || 'python');
  const [sourceCode, setSourceCode] = useState(problem.starterCode || '');
  const [customInput, setCustomInput] = useState(
    problem.testCases && problem.testCases.length > 0 ? problem.testCases[0].input : ''
  );
  const [bottomTab, setBottomTab] = useState('testcase'); // 'testcase' | 'result'
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [batchResults, setBatchResults] = useState(null);

  // Sync state when navigating between problems
  useEffect(() => {
    if (problem) {
      if (selectedLanguage === 'cpp' || selectedLanguage === 'c++') {
        setSourceCode(CPP_INITIAL_CODE);
      } else {
        setSourceCode(problem.starterCode || '');
      }
      if (problem.testCases && problem.testCases.length > 0) {
        setCustomInput(problem.testCases[0].input);
      }
      setExecutionResult(null);
      setBatchResults(null);
      setBottomTab('testcase');
    }
  }, [problem.id]);

  const markAsSolved = (problemId) => {
    setSolvedProblems((prev) => {
      if (!prev.includes(problemId)) {
        const updated = [...prev, problemId];
        try {
          localStorage.setItem('mca_solved_problems', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      }
      return prev;
    });
  };

  // Switch between Python and C++ templates
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);

    if (newLang === 'cpp') {
      setSourceCode(CPP_INITIAL_CODE);
    } else {
      setSourceCode(problem.starterCode || '');
    }
  };

  // Execute single test case
  const handleRun = async () => {
    setIsRunning(true);
    setBottomTab('result');
    setBatchResults(null);

    try {
      const res = await executeCode(sourceCode, selectedLanguage, customInput, problem.id);
      setExecutionResult(res);
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Алдаа гарлаа.',
        status: { description: 'Runtime Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Run full suite of test cases
  const handleSubmit = async () => {
    if (!problem.testCases || problem.testCases.length === 0) return;

    setIsRunning(true);
    setBottomTab('result');
    setExecutionResult(null);

    try {
      const report = await runTestCases(
        sourceCode,
        selectedLanguage,
        problem.testCases,
        problem.id
      );
      setBatchResults(report);

      if (report.allPassed) {
        markAsSolved(problem.id);
      }
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Алдаа гарлаа.',
        status: { description: 'Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* =========================================
            LEFT HALF: EXACT MATCH TO DESIGN
           ========================================= */}
        <div className="h-[100vh] overflow-y-auto bg-[#070d19] border-r border-slate-800/80 p-8 flex flex-col">
          {/* Top Bar: Tabs & Back Button */}
          <div className="flex items-center justify-between pb-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLeftTab('problem')}
                className={`px-5 py-2 text-xs font-bold rounded-lg tracking-wider transition-all ${
                  leftTab === 'problem'
                    ? 'bg-[#003465] text-[#38bdf8] border border-[#0284c7]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white font-semibold'
                }`}
              >
                БОДЛОГО
              </button>

              <button
                onClick={() => setLeftTab('video')}
                className={`px-5 py-2 text-xs font-bold rounded-lg tracking-wider transition-all ${
                  leftTab === 'video'
                    ? 'bg-[#003465] text-[#38bdf8] border border-[#0284c7]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white font-semibold'
                }`}
              >
                ВИДЕО ТАЙЛБАР
              </button>
            </div>

            {/* Back Button to list */}
            <button
              onClick={() => navigate('/practice-basic')}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            >
              <span>&larr;</span>
              <span>Буцах</span>
            </button>
          </div>

          {/* Problem Statement Content */}
          {leftTab === 'problem' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {problem.name}
                </h1>
                {isSolved && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ✓ Бодогдсон
                  </span>
                )}
              </div>

              <div
                className="text-slate-300 text-sm leading-relaxed space-y-4 [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-4 [&_h4]:mb-1 [&_p]:text-slate-300 [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-slate-200"
                dangerouslySetInnerHTML={{ __html: problem.description }}
              />
            </div>
          )}

          {/* Video Lesson / Tutorial */}
          {leftTab === 'video' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white mb-2">{problem.name} - Видео тайлбар</h1>
              {problem.videoId ? (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${problem.videoId}`}
                    title={problem.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Одоогоор видео тайлбар ороогүй байна.</p>
              )}
            </div>
          )}
        </div>

        {/* =========================================
            RIGHT HALF: CODE EDITOR & RUNNER CONSOLE
           ========================================= */}
        <div className="flex flex-col h-[100vh] bg-[#0b1120]">
          {/* Header Controls */}
          <div className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between bg-[#080e1a]">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-700/80 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="python">Python (3.10)</option>
              <option value="cpp">C++ (GCC 11.2)</option>
            </select>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Ажиллаж байна...' : 'Ажиллуулах'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 shadow-sm"
              >
                Шалгах
              </button>
            </div>
          </div>

          {/* Monaco Code Editor with syntax highlighting distinctions */}
          <div className="flex-1 min-h-[300px] border-b border-slate-800/80">
            <CodeEditorWindow
              code={sourceCode}
              onChange={(action, data) => setSourceCode(data)}
              language={selectedLanguage === 'cpp' ? 'cpp' : 'python'}
              theme="vs-dark"
            />
          </div>

          {/* Bottom Console Panel */}
          <div className="h-64 flex flex-col bg-[#070d19]">
            {/* Console Sub-Tabs */}
            <div className="flex items-center border-b border-slate-800 px-6 space-x-4">
              <button
                onClick={() => setBottomTab('testcase')}
                className={`py-2 text-xs font-semibold border-b-2 transition-colors ${
                  bottomTab === 'testcase'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Тест жишээ
              </button>
              <button
                onClick={() => setBottomTab('result')}
                className={`py-2 text-xs font-semibold border-b-2 transition-colors ${
                  bottomTab === 'result'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Үр дүн
              </button>
            </div>

            {/* Console Body */}
            <div className="flex-1 p-5 overflow-y-auto text-xs font-mono">
              {bottomTab === 'testcase' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {problem.testCases?.slice(0, 3).map((tc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCustomInput(tc.input)}
                        className={`px-3 py-1 rounded text-xs border transition-colors ${
                          customInput === tc.input
                            ? 'bg-slate-800 border-slate-600 text-white font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        Жишээ {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">
                      Оролт (stdin):
                    </label>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      rows={3}
                      className="w-full bg-[#050913] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              )}

              {bottomTab === 'result' && (
                <div className="space-y-3">
                  {isRunning && (
                    <div className="text-slate-400 flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <span className="font-sans">Шалгаж байна...</span>
                    </div>
                  )}

                  {batchResults && !isRunning && (
                    <div>
                      {/* Success / Congratulations Banner */}
                      {batchResults.allPassed ? (
                        <div className="bg-emerald-950/40 border border-emerald-600/40 p-4 rounded-xl flex items-center justify-between shadow-sm">
                          <div>
                            <h3 className="text-base font-bold text-emerald-400 font-sans flex items-center space-x-1.5">
                              <span>Баяр хүргэе! 🎉</span>
                            </h3>
                            <p className="text-xs text-emerald-200/80 font-sans mt-0.5">
                              Бүх {batchResults.total} тест амжилттай давж, бодлого бодогдлоо.
                            </p>
                          </div>

                          {nextProblem && (
                            <button
                              onClick={() => navigate(`/practice-basic/${nextProblem.id}`)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold rounded-lg shadow transition-all flex items-center space-x-1"
                            >
                              <span>Дараагийн бодлого</span>
                              <span>&rarr;</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-sm font-bold text-rose-400">
                            Буруу хариулт
                          </span>
                          <span className="text-slate-400">
                            {batchResults.passedCount} / {batchResults.total} тест давсан
                          </span>
                        </div>
                      )}

                      {/* Error Breakdown on Failure */}
                      {!batchResults.allPassed && (
                        <div className="bg-[#050913] border border-rose-950/60 p-4 rounded-lg space-y-2">
                          {(() => {
                            const failed = batchResults.results.find((r) => !r.passed);
                            if (!failed) return null;
                            return (
                              <>
                                <p className="text-rose-400 font-semibold font-sans">
                                  Тест №{failed.testCaseIndex} дээр алдаа гарлаа:
                                </p>
                                <div>
                                  <span className="text-slate-500 block">Оролт:</span>
                                  <pre className="text-slate-300 mt-0.5">{failed.input}</pre>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">Хүлээгдэж буй:</span>
                                  <pre className="text-emerald-400 mt-0.5">{failed.expected}</pre>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">Таны хариу:</span>
                                  <pre className="text-rose-400 mt-0.5">
                                    {failed.actual || '(Хоосон)'}
                                  </pre>
                                </div>
                                {failed.stderr && (
                                  <div>
                                    <span className="text-slate-500 block">Алдааны мэдээлэл:</span>
                                    <pre className="text-rose-400 mt-0.5">{failed.stderr}</pre>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Single Run Result */}
                  {executionResult && !batchResults && !isRunning && (
                    <div className="space-y-2">
                      <span
                        className={`font-semibold ${
                          executionResult.stderr ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {executionResult.status?.description || 'Гүйцэтгэл дууслаа'}
                      </span>
                      {executionResult.stdout && (
                        <div>
                          <span className="text-slate-500 block">Гаралт (stdout):</span>
                          <pre className="bg-[#050913] p-3 rounded border border-slate-800 text-slate-200 mt-1">
                            {executionResult.stdout}
                          </pre>
                        </div>
                      )}
                      {executionResult.stderr && (
                        <div>
                          <span className="text-slate-500 block">Алдаа (stderr):</span>
                          <pre className="bg-rose-950/20 p-3 rounded border border-rose-900/40 text-rose-300 mt-1">
                            {executionResult.stderr}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {!isRunning && !executionResult && !batchResults && (
                    <p className="text-slate-500 font-sans">
                      Үр дүнг харахын тулд 'Ажиллуулах' эсвэл 'Шалгах' товчийг дарна уу.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}