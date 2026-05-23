import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { problemMap, problemData } from '../data/problem-data';
import CodeEditorWindow from '../components/CodeEditorWindow';
import { executeCode, LANGUAGE_VERSIONS } from '../utils/judge0';
import { useLanguage } from '../context/LanguageContext';

// --- FIREBASE IMPORTS ---
import { doc, setDoc, arrayUnion } from "firebase/firestore"; 
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const BOILERPLATES = {
  python: `import sys\n\n# Read all input from stdin\ninput_data = sys.stdin.read().split()\n\n# Your logic here\nprint("Output")`,
  javascript: `const fs = require('fs');\nconst stdin = fs.readFileSync(0, 'utf-8');\nconsole.log(stdin);`,
  "c++": `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Code here\n    return 0;\n}`,
  java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // Code here\n    }\n}`
};

const Problem = () => {
  const { id } = useParams();
  const problem = problemMap[id];
  const { t, language } = useLanguage();
  
  // Logic to find Previous/Next Problem across ALL categories
  const allProblems = problemData.flatMap(cat => cat.problems);
  const currentIndex = allProblems.findIndex(p => p.id === id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  const [languageOption, setLanguageOption] = useState("python");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');
  const [user, setUser] = useState(null);

  // UI States
  const [showSuccess, setShowSuccess] = useState(false);
  const [failureDetails, setFailureDetails] = useState(null); 
  const [consoleOutput, setConsoleOutput] = useState("Ready to run.");

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Initialize Code & Reset States when problem ID changes
  useEffect(() => {
    if (problem) {
        setLanguageOption(problem.defaultLanguage || "python");
        setCode(problem.starterCode || "");
        setConsoleOutput("Ready to run.");
        setShowSuccess(false);
        setFailureDetails(null);
    }
  }, [problem]);

  // 3. Handle Language Switching (Boilerplates)
  useEffect(() => {
    if (problem) {
        if (languageOption === (problem.defaultLanguage || "python")) {
            setCode(problem.starterCode || "");
        } else {
            setCode(BOILERPLATES[languageOption] || "// Write your code here");
        }
    }
  }, [languageOption, problem]);

  if (!problem) return <div className="text-white text-center mt-20">Problem not found</div>;

  // --- SAVE PROGRESS ---
  const markProblemAsSolved = async () => {
    if (!user) {
        setConsoleOutput("User not logged in. Progress won't be saved locally.");
        return;
    }
    try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            solvedProblems: arrayUnion(id) 
        }, { merge: true });
        console.log(`Saved progress for ${id}`);
    } catch (error) {
        console.error("Error saving progress:", error);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setShowSuccess(false);
    setFailureDetails(null);
    setConsoleOutput("Initializing...");

    if (!problem.testCases || problem.testCases.length === 0) {
        setConsoleOutput("Warning: No test cases configured for this problem yet.");
        setIsRunning(false);
        return;
    }

    let failureFound = null;

    try {
        for (let i = 0; i < problem.testCases.length; i++) {
            const testCase = problem.testCases[i];
            setConsoleOutput(`Running Test Case ${i + 1}/${problem.testCases.length}...`);
            
            const result = await executeCode(code, languageOption, testCase.input);
            
            let rawOutput = result.stdout;
            if (rawOutput === null || rawOutput === undefined) rawOutput = "";
            
            const actual = rawOutput.toString().trim();
            const expected = testCase.output.toString().trim();
            const error = result.stderr;    

            console.log(`Test ${i+1}: Input[${testCase.input}] Expected[${expected}] Actual[${actual}] Error[${error}]`);

            if (error) {
                failureFound = { type: "Runtime Error", testCaseIndex: i + 1, input: testCase.input, expected, actual: error, isError: true };
                break;
            } else if (actual !== expected) {
                failureFound = { type: "Wrong Answer", testCaseIndex: i + 1, input: testCase.input, expected, actual: actual === "" ? "(No Output)" : actual, isError: false };
                break;
            }
        }

        if (failureFound) {
            setConsoleOutput("Execution finished."); 
            setFailureDetails(failureFound);
        } else {
            setConsoleOutput("All test cases passed! Saving progress...");
            await markProblemAsSolved();
            setShowSuccess(true);
            setConsoleOutput("All test cases passed! Progress Saved.");
        }

    } catch (err) {
        console.error(err);
        setConsoleOutput("System Error: " + err.message);
    } finally {
        setIsRunning(false);
    }
  };

  const descKey = problem.id + '_desc';
  const translatedDesc = t(descKey);
  const problemDesc = translatedDesc === descKey ? problem.description : translatedDesc;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative text-white bg-[#080c14]">
      
      {/* --- SUCCESS MODAL --- */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in">
            <Confetti numberOfPieces={200} recycle={false} />
            <div className="glass-card border-emerald-500/30 p-10 rounded-3xl text-center shadow-2xl max-w-md mx-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/5 animate-pulse">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-black text-slate-100 mb-3 tracking-tight">{t('congrats')}</h2>
                <div className="flex gap-4 justify-center mt-8">
                    <button onClick={() => setShowSuccess(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl font-bold transition-all text-sm">{t('close')}</button>
                    {nextProblem && (
                        <Link to={`/problem/${nextProblem.id}`} className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-bold transition-all text-sm shadow-md shadow-emerald-500/20">{t('next_problem')}</Link>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* --- FAILURE MODAL --- */}
      {failureDetails && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="glass-card border-red-500/30 p-10 rounded-3xl text-center shadow-2xl max-w-lg mx-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
                <div className="w-20 h-20 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/5">
                    <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h2 className="text-3xl font-black text-slate-100 mb-2.5 tracking-tight">{failureDetails.type === "Runtime Error" ? t('error_occurred') : t('wrong_answer')}</h2>
                <p className="text-slate-400 mb-6 text-sm font-semibold">
                    {language === 'mn' ? `Тест №${failureDetails.testCaseIndex} дээр алдаа гарлаа.` : 
                     language === 'ko' ? `테스트 ${failureDetails.testCaseIndex}번 실패` : 
                     `Failed on Test Case #${failureDetails.testCaseIndex}`}
                </p>
                <div className="bg-black/35 border border-white/5 rounded-2xl p-5 mb-6 text-left text-sm font-mono space-y-3.5 max-h-[30vh] overflow-y-auto">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1">{t('input')}</span>
                      <span className="text-slate-300 font-semibold">{failureDetails.input}</span>
                    </div>
                    <div>
                      <span className="text-emerald-500/80 block text-[10px] uppercase font-bold tracking-wider mb-1">{t('expected')}</span>
                      <span className="text-emerald-400 font-semibold">{failureDetails.expected}</span>
                    </div>
                    <div>
                      <span className="text-red-500/80 block text-[10px] uppercase font-bold tracking-wider mb-1">{t('your_output')}</span>
                      <span className="text-red-400 font-semibold whitespace-pre-wrap block bg-red-950/20 p-2.5 rounded-xl border border-red-500/10 mt-1">{failureDetails.actual}</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    {prevProblem && (<Link to={`/problem/${prevProblem.id}`} className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl font-bold transition-all text-sm">{t('prev_problem')}</Link>)}
                    <button onClick={() => setFailureDetails(null)} className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-bold transition-all text-sm shadow-md shadow-red-500/20">{t('retry')}</button>
                </div>
            </div>
        </div>
      )}

      {/* LEFT PANEL: Description & Video */}
      <div className="w-full md:w-1/2 h-full flex flex-col border-r border-white/5 bg-[#090e18]">
        <div className="p-4 border-b border-white/5 flex gap-4 bg-slate-950/20">
            <button 
              onClick={() => setActiveTab('problem')} 
              className={`text-xs font-extrabold tracking-wider uppercase px-4 py-2 rounded-xl transition-all ${
                activeTab === 'problem' 
                  ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-md shadow-sky-500/5' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {t('problem')}
            </button>
            <button 
              onClick={() => setActiveTab('solution')} 
              className={`text-xs font-extrabold tracking-wider uppercase px-4 py-2 rounded-xl transition-all ${
                activeTab === 'solution' 
                  ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-md shadow-sky-500/5' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {t('video_solution')}
            </button>
            <Link to="/curriculum" className="ml-auto text-xs font-bold text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 flex items-center justify-center gap-1">
              <span>←</span>
              <span>{t('back')}</span>
            </Link>
        </div>
        <div className="flex-grow overflow-y-auto p-6 text-slate-300">
            <h1 className="text-2xl font-black text-slate-100 mb-5">{t(problem.id + '_name')}</h1>
            {activeTab === 'problem' ? (
                <article className="prose prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: problemDesc }} />
            ) : (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${problem.videoId}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            )}
        </div>
      </div>

      {/* RIGHT PANEL: Editor & Console */}
      <div className="w-full md:w-1/2 h-full flex flex-col bg-[#05080e]">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-slate-950/20">
            <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs font-extrabold tracking-wider uppercase">{t('language_label')}</span>
                <select 
                  value={languageOption} 
                  onChange={(e) => setLanguageOption(e.target.value)} 
                  className="bg-[#090e18] text-slate-200 text-xs font-bold border border-white/10 rounded-xl px-3.5 py-2 cursor-pointer focus:outline-none focus:border-sky-500/40 transition-colors"
                >
                  {Object.keys(LANGUAGE_VERSIONS).map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>
            <button 
              onClick={handleRunCode} 
              disabled={isRunning} 
              className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-1.5 disabled:opacity-50"
            >
              {isRunning && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              <span>{isRunning ? t('running') : t('run')}</span>
            </button>
        </div>
        <div className="flex-grow"><CodeEditorWindow code={code} onChange={(key, value) => setCode(value)} language={languageOption} theme="vs-dark" /></div>
        <div className="h-56 border-t border-white/5 bg-[#03060c] p-5 overflow-y-auto font-mono text-sm">
            <div className="text-slate-500 mb-3.5 font-bold uppercase text-[10px] tracking-wider border-b border-white/5 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
              <span>{t('output_console')}</span>
            </div>
            <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs leading-relaxed">{consoleOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default Problem;