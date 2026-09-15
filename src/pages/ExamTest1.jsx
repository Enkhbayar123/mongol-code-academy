// src/pages/ExamTest1.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { exam1Problems } from '../data/exam1Data';
import CodeEditorWindow from '../components/CodeEditorWindow';
import { executeCode, runTestCases } from '../utils/judge0';

const CPP_INITIAL_CODE = `#include <iostream>
using namespace std;

int main() {
    // your code goes here
    return 0;
}`;

export default function ExamTest1() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [activeProblemIdx, setActiveProblemIdx] = useState(0);
  const problem = exam1Problems[activeProblemIdx];

  // Initialize all problems with C++ boilerplate
  const [sourceCodes, setSourceCodes] = useState(() => {
    const initial = {};
    exam1Problems.forEach((p) => {
      initial[p.id] = CPP_INITIAL_CODE;
    });
    return initial;
  });

  const [problemStatuses, setProblemStatuses] = useState({}); // { [problemId]: 'passed' | 'failed' }
  const [customInput, setCustomInput] = useState(problem?.testCases?.[0]?.input || '');
  const [bottomTab, setBottomTab] = useState('testcase');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmittingExam, setIsSubmittingExam] = useState(false);
  const [batchResults, setBatchResults] = useState(null);
  const [executionResult, setExecutionResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Authenticate and restore previous exam submission state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'exam_submissions', `semester-1-test_${currentUser.uid}`);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.answers) {
              setSourceCodes((prev) => ({ ...prev, ...data.answers }));
            }
            if (data.statuses) {
              setProblemStatuses(data.statuses);
            }
            if (data.submittedAt) {
              setSubmitted(true);
            }
          }
        } catch (err) {
          console.error('Failed to restore submission state:', err);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update input sample on question change
  useEffect(() => {
    if (problem) {
      setCustomInput(problem.testCases?.[0]?.input || '');
      setExecutionResult(null);
      setBatchResults(null);
      setBottomTab('testcase');
    }
  }, [activeProblemIdx]);

  const currentCode = sourceCodes[problem?.id] || CPP_INITIAL_CODE;

  const handleCodeChange = (code) => {
    if (submitted) return;
    setSourceCodes((prev) => ({ ...prev, [problem.id]: code }));
  };

  // Run with custom stdin
  const handleRun = async () => {
    setIsRunning(true);
    setBottomTab('result');
    setBatchResults(null);

    try {
      const res = await executeCode(currentCode, 'cpp', customInput, problem.id);
      setExecutionResult(res);
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message,
        status: { description: 'Runtime Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Test current problem against test cases
  const handleTestCurrent = async () => {
    setIsRunning(true);
    setBottomTab('result');
    setExecutionResult(null);

    try {
      const report = await runTestCases(currentCode, 'cpp', problem.testCases, problem.id);
      setBatchResults(report);

      const status = report.allPassed ? 'passed' : 'failed';
      setProblemStatuses((prev) => ({ ...prev, [problem.id]: status }));
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message,
        status: { description: 'Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Final submission button handler: evaluates all 5 problems and writes score to Firestore
  const handleFinalExamSubmit = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Та 1-р улирлын сорилоо илгээхдээ итгэлтэй байна уу? Илгээсний дараа засах боломжгүй.'
    );
    if (!confirmed) return;

    setIsSubmittingExam(true);

    try {
      let passedCount = 0;
      const finalStatuses = {};
      const finalAnswers = { ...sourceCodes };

      // Grade every problem sequentially
      for (const p of exam1Problems) {
        const codeToGrade = sourceCodes[p.id] || CPP_INITIAL_CODE;
        const report = await runTestCases(codeToGrade, 'cpp', p.testCases, p.id);
        const didPass = report.allPassed;

        if (didPass) passedCount += 1;
        finalStatuses[p.id] = didPass ? 'passed' : 'failed';
      }

      setProblemStatuses(finalStatuses);

      // Save submission document
      const subRef = doc(db, 'exam_submissions', `semester-1-test_${user.uid}`);
      await setDoc(subRef, {
        examId: 'semester-1-test',
        examTitle: '1-р улирлын сорил',
        studentUid: user.uid,
        studentEmail: user.email,
        studentName: user.displayName || '',
        score: passedCount,
        maxScore: exam1Problems.length,
        answers: finalAnswers,
        statuses: finalStatuses,
        submittedAt: serverTimestamp()
      });

      setSubmitted(true);
      alert(`Шалгалт амжилттай хураагдлаа! Авсан оноо: ${passedCount} / ${exam1Problems.length}`);
    } catch (err) {
      console.error(err);
      alert('Шалгалт илгээхэд алдаа гарлаа: ' + err.message);
    } finally {
      setIsSubmittingExam(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-slate-400 text-sm font-sans">
        Шалгаж байна...
      </div>
    );
  }

  // Domain guard: strictly enforces @tegshuhaan.mn or supervisor email
  const isAuthorized =
    user && (user.email.endsWith('@tegshuhaan.mn') || user.email === 'enkhbayare111@gmail.com');

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-[#0b1120] border border-rose-900/60 p-8 rounded-2xl shadow-xl space-y-4">
          <span className="text-4xl block">🔒</span>
          <h1 className="text-xl font-bold text-rose-400">Хандах эрхгүй байна</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Энэхүү сорил нь зөвхөн <strong>@tegshuhaan.mn</strong> сургуулийн хаягтай сурагчдад зориулагдсан.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Нүүр хуудас руу буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800/80 px-6 flex items-center justify-between bg-[#070d19]">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
            Улирал 1 Сорил
          </span>
          <h1 className="text-base font-bold text-white hidden sm:block">5 Бодлогын шалгалт (C++)</h1>
        </div>

        {/* 1-5 Problem Selectors */}
        <div className="flex items-center space-x-2">
          {exam1Problems.map((p, idx) => {
            const status = problemStatuses[p.id];
            return (
              <button
                key={p.id}
                onClick={() => setActiveProblemIdx(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                  activeProblemIdx === idx
                    ? 'border-sky-500 bg-sky-600 text-white shadow-sm'
                    : status === 'passed'
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                    : status === 'failed'
                    ? 'border-rose-500/50 bg-rose-950/40 text-rose-300'
                    : 'border-slate-800 bg-[#0b1120] text-slate-400 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* User Info & Submit Exam Button */}
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-400 hidden md:inline">{user.email}</span>

          {!submitted ? (
            <button
              onClick={handleFinalExamSubmit}
              disabled={isSubmittingExam}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              {isSubmittingExam ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Илгээж байна...</span>
                </>
              ) : (
                <span>Шалгалт илгээх</span>
              )}
            </button>
          ) : (
            <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold rounded-xl">
              Хураагдсан ✓
            </span>
          )}
        </div>
      </header>

      {/* Main Two-Column Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: Problem Details */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#070d19] border-r border-slate-800/80 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-400">
              Бодлого {activeProblemIdx + 1} / {exam1Problems.length}
            </span>
            {problemStatuses[problem?.id] === 'passed' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ✓ Зөв бодсон
              </span>
            )}
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {problem?.name || problem?.title}
          </h2>

          <div
            className="text-slate-300 text-sm leading-relaxed space-y-4 [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-4 [&_h4]:mb-1 [&_p]:text-slate-300 [&_pre]:bg-[#050913] [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-800 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:text-slate-200"
            dangerouslySetInnerHTML={{ __html: problem?.description }}
          />
        </div>

        {/* Right: Code Editor & Execution Panels */}
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0b1120]">
          <div className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between bg-[#080e1a]">
            <span className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              C++ (GCC 11.2)
            </span>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRun}
                disabled={isRunning || submitted}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Ажиллаж байна...' : 'Ажиллуулах'}
              </button>
              <button
                onClick={handleTestCurrent}
                disabled={isRunning || submitted}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 shadow-sm"
              >
                Шалгах
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] border-b border-slate-800/80">
            <CodeEditorWindow
              code={currentCode}
              onChange={(action, data) => handleCodeChange(data)}
              language="cpp"
              theme="vs-dark"
            />
          </div>

          {/* Bottom Tabs Console */}
          <div className="h-64 flex flex-col bg-[#070d19]">
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

            <div className="flex-1 p-5 overflow-y-auto text-xs font-mono">
              {bottomTab === 'testcase' && (
                <div className="space-y-3">
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
                      {batchResults.allPassed ? (
                        <div className="bg-emerald-950/40 border border-emerald-600/40 p-4 rounded-xl flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-emerald-400 font-sans">
                              Бүх тест давлаа! 🎉
                            </h3>
                            <p className="text-xs text-emerald-200/80 font-sans mt-0.5">
                              Энэ бодлогын хариу зөв байна.
                            </p>
                          </div>
                          {activeProblemIdx < exam1Problems.length - 1 && (
                            <button
                              onClick={() => setActiveProblemIdx((prev) => prev + 1)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold rounded-lg shadow transition-all"
                            >
                              Дараагийн бодлого &rarr;
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="bg-[#050913] border border-rose-950/60 p-4 rounded-lg space-y-2">
                          <p className="text-rose-400 font-semibold font-sans">
                            {batchResults.passedCount} / {batchResults.total} тест давлаа. Алдаа гарлаа:
                          </p>
                          {(() => {
                            const failed = batchResults.results.find((r) => !r.passed);
                            if (!failed) return null;
                            return (
                              <>
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
                                  <pre className="text-rose-400 mt-0.5">{failed.actual || '(Хоосон)'}</pre>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {executionResult && !batchResults && !isRunning && (
                    <div className="space-y-2">
                      <span className={executionResult.stderr ? 'text-rose-400' : 'text-emerald-400'}>
                        {executionResult.status?.description || 'Гүйцэтгэл дууслаа'}
                      </span>
                      {executionResult.stdout && (
                        <pre className="bg-[#050913] p-3 rounded border border-slate-800 text-slate-200 mt-1">
                          {executionResult.stdout}
                        </pre>
                      )}
                      {executionResult.stderr && (
                        <pre className="bg-rose-950/20 p-3 rounded border border-rose-900/40 text-rose-300 mt-1">
                          {executionResult.stderr}
                        </pre>
                      )}
                    </div>
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