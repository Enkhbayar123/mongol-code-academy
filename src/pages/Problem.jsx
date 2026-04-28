import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { problemMap, problemData } from '../data/problem-data';
import CodeEditorWindow from '../components/CodeEditorWindow';
import { executeCode, LANGUAGE_VERSIONS } from '../utils/judge0';

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
  
  // Logic to find Previous/Next Problem across ALL categories
  // 1. Flatten the nested structure into a single list of problems
  const allProblems = problemData.flatMap(cat => cat.problems);
  // 2. Find index of current problem
  const currentIndex = allProblems.findIndex(p => p.id === id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  const [language, setLanguage] = useState("python");
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
        setLanguage(problem.defaultLanguage || "python");
        setCode(problem.starterCode || "");
        setConsoleOutput("Ready to run.");
        setShowSuccess(false);
        setFailureDetails(null);
    }
  }, [problem]);

  // 3. Handle Language Switching (Boilerplates)
  useEffect(() => {
    if (problem) {
        if (language === (problem.defaultLanguage || "python")) {
            setCode(problem.starterCode || "");
        } else {
            setCode(BOILERPLATES[language] || "// Write your code here");
        }
    }
  }, [language, problem]);

  if (!problem) return <div className="text-white text-center mt-20">Problem not found</div>;

  // --- SAVE PROGRESS ---
  const markProblemAsSolved = async () => {
    if (!user) {
        setConsoleOutput("User not logged in. Progress won't be saved locally.");
        return;
    }
    try {
        const userRef = doc(db, "users", user.uid);
        // Save using setDoc + merge to ensure document exists
        await setDoc(userRef, {
            solvedProblems: arrayUnion(id) 
        }, { merge: true });
        console.log(`✅ Saved progress for ${id}`);
    } catch (error) {
        console.error("❌ Error saving progress:", error);
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
            
            const result = await executeCode(code, language, testCase.input);
            
            // Output Normalization
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
            await markProblemAsSolved(); // Wait for DB save
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

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
      
      {/* --- SUCCESS MODAL --- */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <Confetti numberOfPieces={200} recycle={false} />
            <div className="bg-slate-900 border border-emerald-500/50 p-8 rounded-2xl text-center shadow-2xl animate-bounce-in max-w-md mx-4">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Баяр хүргэе!</h2>
                <div className="flex gap-4 justify-center mt-6">
                    <button onClick={() => setShowSuccess(false)} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Хаах</button>
                    {nextProblem && (
                        <Link to={`/problem/${nextProblem.id}`} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">Дараагийн бодлого</Link>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* --- FAILURE MODAL --- */}
      {failureDetails && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-red-500/50 p-8 rounded-2xl text-center shadow-2xl animate-bounce-in max-w-lg mx-4 relative">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{failureDetails.type === "Runtime Error" ? "Алдаа гарлаа!" : "Буруу хариулт"}</h2>
                <p className="text-slate-400 mb-6">Тест №{failureDetails.testCaseIndex} дээр алдаа гарлаа.</p>
                <div className="bg-black/40 border border-slate-700 rounded-lg p-4 mb-6 text-left text-sm font-mono overflow-x-auto">
                    <div className="mb-2"><span className="text-slate-500 block text-xs uppercase font-bold">Оролт:</span><span className="text-slate-200">{failureDetails.input}</span></div>
                    <div className="mb-2"><span className="text-emerald-500/70 block text-xs uppercase font-bold">Хүлээгдэж буй:</span><span className="text-emerald-400">{failureDetails.expected}</span></div>
                    <div><span className="text-red-500/70 block text-xs uppercase font-bold">Таны хариу:</span><span className="text-red-400 whitespace-pre-wrap">{failureDetails.actual}</span></div>
                </div>
                <div className="flex gap-4 justify-center">
                    {prevProblem && (<Link to={`/problem/${prevProblem.id}`} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Өмнөх бодлого</Link>)}
                    <button onClick={() => setFailureDetails(null)} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-600/20">Дахин оролдох</button>
                </div>
            </div>
        </div>
      )}

      {/* LEFT PANEL: Description & Video */}
      <div className="w-full md:w-1/2 h-full flex flex-col border-r border-slate-800 bg-slate-900">
        <div className="p-4 border-b border-slate-800 flex gap-4">
            <button onClick={() => setActiveTab('problem')} className={`text-sm font-bold ${activeTab==='problem'?'text-sky-400':'text-slate-400'}`}>Бодлого</button>
            <button onClick={() => setActiveTab('solution')} className={`text-sm font-bold ${activeTab==='solution'?'text-sky-400':'text-slate-400'}`}>Видео Тайлбар</button>
            <Link to="/curriculum" className="ml-auto text-sm text-slate-500 hover:text-white">Буцах</Link>
        </div>
        <div className="flex-grow overflow-y-auto p-6 text-slate-300">
            <h1 className="text-2xl font-bold text-white mb-4">{problem.name}</h1>
            {activeTab === 'problem' ? (
                // Description: We handle HTML content
                <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: problem.description }} />
            ) : (
                <div className="aspect-video w-full">
                    <iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${problem.videoId}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            )}
        </div>
      </div>

      {/* RIGHT PANEL: Editor & Console */}
      <div className="w-full md:w-1/2 h-full flex flex-col bg-[#1e1e1e]">
        <div className="h-12 border-b border-[#333] flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Хэл:</span>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-[#2d2d2d] text-slate-200 text-sm border border-slate-700 rounded px-2 py-1">{Object.keys(LANGUAGE_VERSIONS).map((lang) => <option key={lang} value={lang}>{lang}</option>)}</select>
            </div>
            <button onClick={handleRunCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-bold">{isRunning ? 'Running...' : 'Ажилуулах'}</button>
        </div>
        <div className="flex-grow"><CodeEditorWindow code={code} onChange={(key, value) => setCode(value)} language={language} theme="vs-dark" /></div>
        <div className="h-56 border-t border-[#333] bg-[#1e1e1e] p-4 overflow-y-auto font-mono text-sm">
            <div className="text-slate-500 mb-2 font-bold uppercase text-xs border-b border-slate-700 pb-2">Output / Console</div>
            <pre className={`whitespace-pre-wrap text-slate-300`}>{consoleOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default Problem;