// src/pages/Problem.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problemData, problemMap } from '../data/problem-data';
import CodeEditorWindow from '../components/CodeEditorWindow';
import { executeCode, runTestCases } from '../utils/judge0';

const CPP_STARTER_TEMPLATES = {
  'find-closest-number-to-zero': `#include <iostream>
#include <vector>
#include <cmath>
#include <sstream>

using namespace std;

int findClosestNumber(vector<int>& nums) {
    // Write your code here
    return 0;
}

int main() {
    int val;
    vector<int> nums;
    while (cin >> val) {
        nums.push_back(val);
    }
    if (nums.empty()) {
        cout << 0;
        return 0;
    }
    cout << findClosestNumber(nums);
    return 0;
}`,
  'merge-strings-alternatively': `#include <iostream>
#include <string>

using namespace std;

string mergeAlternately(string word1, string word2) {
    // Write your code here
    return "";
}

int main() {
    string word1, word2;
    if (cin >> word1 >> word2) {
        cout << mergeAlternately(word1, word2);
    }
    return 0;
}`,
  'contains-duplicate': `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

bool containsDuplicate(vector<int>& nums) {
    // Write your code here
    return false;
}

int main() {
    string s;
    if (getline(cin, s)) {
        // Simple parser for [1,2,3,1] or space separated
        for (char &c : s) {
            if (c == '[' || c == ']' || c == ',') c = ' ';
        }
        stringstream ss(s);
        int val;
        vector<int> nums;
        while (ss >> val) nums.push_back(val);
        cout << (containsDuplicate(nums) ? "true" : "false");
    }
    return 0;
}`,
  'valid-anagram': `#include <iostream>
#include <string>

using namespace std;

bool isAnagram(string s, string t) {
    // Write your code here
    return false;
}

int main() {
    string s, t;
    if (cin >> s >> t) {
        cout << (isAnagram(s, t) ? "true" : "false");
    }
    return 0;
}`,
  'two-sum': `#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    string line;
    if (getline(cin, line)) {
        for (char &c : line) {
            if (c == '[' || c == ']' || c == ',') c = ' ';
        }
        stringstream ss(line);
        int val;
        vector<int> nums;
        while (ss >> val) nums.push_back(val);
        int target;
        if (cin >> target) {
            vector<int> res = twoSum(nums, target);
            if (res.size() == 2) {
                cout << "[" << res[0] << "," << res[1] << "]";
            } else {
                cout << "[]";
            }
        }
    }
    return 0;
}`,
  default: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    // Write your code here
    return 0;
}`
};

export default function Problem() {
  const { id } = useParams();
  const problem = problemMap[id] || problemData[0].problems[0];

  const [selectedLanguage, setSelectedLanguage] = useState(problem.defaultLanguage || 'python');
  const [sourceCode, setSourceCode] = useState(problem.starterCode || '');
  const [customInput, setCustomInput] = useState(
    problem.testCases && problem.testCases.length > 0 ? problem.testCases[0].input : ''
  );
  const [activeTab, setActiveTab] = useState('testcase'); // 'testcase' | 'result'
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [batchResults, setBatchResults] = useState(null);

  useEffect(() => {
    if (problem) {
      if (selectedLanguage === 'cpp' || selectedLanguage === 'c++') {
        setSourceCode(CPP_STARTER_TEMPLATES[problem.id] || CPP_STARTER_TEMPLATES.default);
      } else {
        setSourceCode(problem.starterCode || '');
      }
      if (problem.testCases && problem.testCases.length > 0) {
        setCustomInput(problem.testCases[0].input);
      }
      setExecutionResult(null);
      setBatchResults(null);
    }
  }, [problem.id]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);

    if (newLang === 'cpp') {
      setSourceCode(CPP_STARTER_TEMPLATES[problem.id] || CPP_STARTER_TEMPLATES.default);
    } else {
      setSourceCode(problem.starterCode || '');
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setActiveTab('result');
    setBatchResults(null);

    try {
      const res = await executeCode(sourceCode, selectedLanguage, customInput, problem.id);
      setExecutionResult(res);
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Execution error occurred.',
        status: { description: 'Runtime Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem.testCases || problem.testCases.length === 0) return;

    setIsRunning(true);
    setActiveTab('result');
    setExecutionResult(null);

    try {
      const report = await runTestCases(
        sourceCode,
        selectedLanguage,
        problem.testCases,
        problem.id
      );
      setBatchResults(report);
    } catch (err) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Evaluation error occurred.',
        status: { description: 'Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Navigation Header */}
      <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <Link
            to="/PracticeHub"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            &larr; Бүх бодлого
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-medium">
            {problem.category}
          </span>
          <h1 className="text-base font-semibold text-white truncate max-w-md">
            {problem.name}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="bg-slate-800 text-slate-200 text-sm font-medium border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="python">Python (3.10)</option>
            <option value="cpp">C++ (GCC 11.2)</option>
          </select>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
          >
            {isRunning ? 'Ажиллаж байна...' : 'Ажиллуулах'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors disabled:opacity-50"
          >
            Шалгах
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Column: Problem Details & Video Solution */}
        <div className="h-full overflow-y-auto border-r border-slate-800 p-6 space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {problem.id}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{problem.name}</h2>
          </div>

          {problem.videoId && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${problem.videoId}`}
                title={problem.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div
            className="prose prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-headings:text-slate-200 text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        </div>

        {/* Right Column: Code Editor & Output Tabs */}
        <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950">
          <div className="flex-1 min-h-[300px] border-b border-slate-800">
            <CodeEditorWindow
              code={sourceCode}
              onChange={(action, data) => setSourceCode(data)}
              language={selectedLanguage === 'cpp' ? 'cpp' : 'python'}
            />
          </div>

          <div className="h-64 flex flex-col bg-slate-900">
            <div className="flex items-center border-b border-slate-800 px-4 space-x-4 bg-slate-900/60">
              <button
                onClick={() => setActiveTab('testcase')}
                className={`py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'testcase'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Тест жишээ
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'result'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Үр дүн
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto text-sm">
              {activeTab === 'testcase' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {problem.testCases?.slice(0, 3).map((tc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCustomInput(tc.input)}
                        className={`px-3 py-1 rounded text-xs font-medium border ${
                          customInput === tc.input
                            ? 'bg-slate-800 border-slate-600 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        Жишээ {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Оролт (stdin):
                    </label>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'result' && (
                <div className="space-y-3 font-mono text-xs">
                  {isRunning && (
                    <div className="text-slate-400 flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>Шалгаж байна...</span>
                    </div>
                  )}

                  {batchResults && !isRunning && (
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span
                          className={`text-base font-bold ${
                            batchResults.allPassed ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {batchResults.allPassed ? 'Зөв хариулт (Accepted)' : 'Буруу хариулт'}
                        </span>
                        <span className="text-slate-400">
                          {batchResults.passedCount} / {batchResults.total} тест давсан
                        </span>
                      </div>

                      {!batchResults.allPassed && (
                        <div className="bg-slate-950 border border-rose-950/60 p-3 rounded-lg space-y-2">
                          {(() => {
                            const failed = batchResults.results.find((r) => !r.passed);
                            if (!failed) return null;
                            return (
                              <>
                                <p className="text-rose-400 font-semibold">
                                  Тест №{failed.testCaseIndex} дээр алдаа гарлаа:
                                </p>
                                <div>
                                  <span className="text-slate-500 block">Оролт:</span>
                                  <pre className="text-slate-300">{failed.input}</pre>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">Хүлээгдэж буй:</span>
                                  <pre className="text-emerald-400">{failed.expected}</pre>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">Таны хариу:</span>
                                  <pre className="text-rose-400">{failed.actual || '(Хоосон)'}</pre>
                                </div>
                                {failed.stderr && (
                                  <div>
                                    <span className="text-slate-500 block">Алдааны мэдээлэл:</span>
                                    <pre className="text-rose-400">{failed.stderr}</pre>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {executionResult && !batchResults && !isRunning && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-semibold ${
                            executionResult.stderr
                              ? 'text-rose-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {executionResult.status?.description || 'Гүйцэтгэл дууслаа'}
                        </span>
                      </div>
                      {executionResult.stdout && (
                        <div>
                          <span className="text-slate-500 block">Гаралт (stdout):</span>
                          <pre className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-200 mt-1">
                            {executionResult.stdout}
                          </pre>
                        </div>
                      )}
                      {executionResult.stderr && (
                        <div>
                          <span className="text-slate-500 block">Алдаа (stderr):</span>
                          <pre className="bg-rose-950/30 p-2.5 rounded border border-rose-900/50 text-rose-300 mt-1">
                            {executionResult.stderr}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {!isRunning && !executionResult && !batchResults && (
                    <p className="text-slate-500">Үр дүнг харахын тулд 'Ажиллуулах' эсвэл 'Шалгах' товчийг дарна уу.</p>
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