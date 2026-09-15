// src/pages/SupervisorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import AddHomeworkModal from '../components/AddHomeworkModal';
import { basicPracticeData } from '../data/basic-practice-data';
import { exportGradesToExcel } from '../utils/gradeExporter';

export default function SupervisorDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [examSubmissions, setExamSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('homework'); // 'homework' | 'exams'
  const [activeClass, setActiveClass] = useState(null); // null = Classes Overview, string = Selected Class Drilldown
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth monitoring
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for users, homeworks, and exam submissions
  useEffect(() => {
    const usersQuery = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(
      usersQuery,
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filter ONLY @tegshuhaan.mn accounts or accounts with isTegshUhaan flag
        const tegshUhaanStudents = userList.filter(
          (u) =>
            (u.email && u.email.toLowerCase().endsWith('@tegshuhaan.mn')) ||
            u.isTegshUhaan === true
        );

        // Sort alphabetically by name
        tegshUhaanStudents.sort((a, b) => {
          const nameA = a.fullName || a.name || '';
          const nameB = b.fullName || b.name || '';
          return nameA.localeCompare(nameB, 'mn');
        });

        setStudents(tegshUhaanStudents);
        setLoading(false);
      },
      (err) => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      }
    );

    const hwQuery = query(collection(db, 'homeworks'), orderBy('createdAt', 'desc'));
    const unsubscribeHw = onSnapshot(
      hwQuery,
      (snapshot) => {
        const hwList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setHomeworks(hwList);
      },
      (err) => {
        console.error('Failed to fetch homeworks:', err);
      }
    );

    const submissionsQuery = collection(db, 'exam_submissions');
    const unsubscribeSubmissions = onSnapshot(
      submissionsQuery,
      (snapshot) => {
        const subList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setExamSubmissions(subList);
      },
      (err) => {
        console.error('Failed to fetch exam submissions:', err);
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeHw();
      unsubscribeSubmissions();
    };
  }, []);

  // All homework is unified across all classes
  const getAssignedHomeworkProblems = () => {
    const problemIds = new Set();
    homeworks.forEach((hw) => {
      (hw.problemIds || []).forEach((pid) => problemIds.add(pid));
    });
    return Array.from(problemIds);
  };

  // Compute individual student progress
  const calculateStudentProgress = (student) => {
    const assignedIds = getAssignedHomeworkProblems();
    if (assignedIds.length === 0) return { percent: 100, completed: 0, total: 0 };

    const solvedList = student.solvedProblems || [];
    const completedCount = assignedIds.filter((pid) => solvedList.includes(pid)).length;
    const percent = Math.round((completedCount / assignedIds.length) * 100);

    return {
      percent,
      completed: completedCount,
      total: assignedIds.length
    };
  };

  // Match exam submission for a student
  const getStudentExam = (student) => {
    return examSubmissions.find(
      (sub) =>
        sub.studentUid === student.id ||
        sub.studentUid === student.uid ||
        sub.id.includes(student.id) ||
        (student.email && sub.studentEmail && sub.studentEmail.toLowerCase() === student.email.toLowerCase())
    );
  };

  // Group students by class
  const classGroups = students.reduce((acc, student) => {
    const className = student.class || 'Анги тодорхойгүй';
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(student);
    return acc;
  }, {});

  const sortedClassNames = Object.keys(classGroups).sort((a, b) => a.localeCompare(b, 'mn'));

  // Calculate average completion rate for a class
  const getClassAverage = (studentList, className) => {
    if (!studentList || studentList.length === 0) return 0;
    const sum = studentList.reduce((acc, s) => acc + calculateStudentProgress(s).percent, 0);
    return Math.round(sum / studentList.length);
  };

  // Export to Excel handler
  const handleExportSpreadsheet = () => {
    if (!students.length) {
      alert('Бүртгэлтэй сурагч олдсонгүй.');
      return;
    }
    exportGradesToExcel(students, classGroups, calculateStudentProgress, getStudentExam);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Багшийн удирдлагын хэсэг
              </span>
              {currentUser && (
                <span className="text-xs text-slate-400">({currentUser.email})</span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
              {activeClass ? (
                <>
                  <button
                    onClick={() => setActiveClass(null)}
                    className="text-slate-400 hover:text-white transition-colors text-2xl"
                    title="Бүх анги руу буцах"
                  >
                    &larr;
                  </button>
                  <span>{activeClass} ангийн сурагчид</span>
                </>
              ) : (
                <span>TegshUhaan Сургалтын ангиуд</span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {activeClass
                ? `${activeClass} ангийн сурагчдын даалгаврын биелэлт болон шалгалтын оноо`
                : 'Анги дээр дарж тухайн ангийн сурагчдын явц, шалгалтын дүнг харна уу'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {activeClass && (
              <button
                onClick={() => setActiveClass(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                &larr; Бүх анги
              </button>
            )}

            {/* Excel Export Button */}
            <button
              onClick={handleExportSpreadsheet}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              <span>📊</span>
              <span>Excel тайлан татах</span>
            </button>

            {/* Add Homework Button */}
            <button
              onClick={() => setIsHwModalOpen(true)}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              <span>+</span>
              <span>Гэрийн даалгавар нэмэх</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3">
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'homework'
                ? 'bg-sky-600 text-white shadow'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Гэрийн даалгавар
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'exams'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>1-р улирлын сорил</span>
            <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px]">
              {examSubmissions.length} шалгалт
            </span>
          </button>
        </div>

        {/* Global Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Нийт ангиуд</span>
            <p className="text-2xl font-black text-white mt-1">{sortedClassNames.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Бүртгэлтэй сурагчид</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{students.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Нийт даалгавар</span>
            <p className="text-2xl font-black text-sky-400 mt-1">{homeworks.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Шалгалт өгсөн</span>
            <p className="text-2xl font-black text-rose-400 mt-1">{examSubmissions.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center items-center space-x-3 text-slate-400 text-sm">
            <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <span>Мэдээллийг ачаалж байна...</span>
          </div>
        ) : !activeClass ? (
          /* =========================================================
             VIEW 1: CLASS LIST (GRID OF CLASSES)
             ========================================================= */
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Анги сонгох</h2>

            {sortedClassNames.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#0b1120] border border-slate-800/80 text-center text-slate-400 text-sm">
                Бүртгэлтэй анги одоогоор алга байна.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedClassNames.map((className) => {
                  const classStudents = classGroups[className];
                  const avgPercent = getClassAverage(classStudents, className);
                  const assignedHwCount = homeworks.filter(
                    (hw) => !hw.assignedClass || hw.assignedClass === 'all' || hw.assignedClass === className
                  ).length;
                  const examsTakenCount = classStudents.filter((s) => getStudentExam(s)).length;

                  return (
                    <div
                      key={className}
                      onClick={() => setActiveClass(className)}
                      className="p-6 rounded-2xl bg-[#0b1120] border border-slate-800/80 hover:border-sky-500/60 hover:bg-[#0e1629] cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 shadow-sm group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                            Анги
                          </span>
                          <h3 className="text-2xl font-black text-white mt-2 group-hover:text-sky-300 transition-colors">
                            {className}
                          </h3>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                          {classStudents.length} сурагч
                        </span>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-800/60">
                        {activeTab === 'homework' ? (
                          <>
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-400">Дундаж биелэлт:</span>
                              <span className={avgPercent >= 80 ? 'text-emerald-400' : 'text-sky-400'}>
                                {avgPercent}%
                              </span>
                            </div>

                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  avgPercent >= 80 ? 'bg-emerald-500' : 'bg-sky-500'
                                }`}
                                style={{ width: `${avgPercent}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                              <span>Оноосон даалгавар: {assignedHwCount}</span>
                              <span className="text-sky-400 font-semibold group-hover:underline">
                                Нээж үзэх &rarr;
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-400">Шалгалт өгсөн явц:</span>
                              <span className={examsTakenCount === classStudents.length ? 'text-emerald-400' : 'text-rose-400'}>
                                {examsTakenCount} / {classStudents.length}
                              </span>
                            </div>

                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                              <div
                                className="h-full rounded-full bg-rose-500 transition-all duration-500"
                                style={{
                                  width: `${classStudents.length ? (examsTakenCount / classStudents.length) * 100 : 0}%`
                                }}
                              />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                              <span>Сорилын дүнг харах</span>
                              <span className="text-rose-400 font-semibold group-hover:underline">
                                Нээж үзэх &rarr;
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* =========================================================
             VIEW 2: STUDENTS INSIDE SELECTED CLASS
             ========================================================= */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {activeClass} ангийн сурагчид ({classGroups[activeClass]?.length || 0})
              </h2>
              <button
                onClick={() => setActiveClass(null)}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                &larr; Бүх ангийн жагсаалт руу буцах
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(classGroups[activeClass] || []).map((student) => {
                const { percent, completed, total } = calculateStudentProgress(student);
                const exam = getStudentExam(student);

                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80 hover:border-sky-500/60 hover:bg-[#0e1629] cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                          {student.class} анги
                        </span>
                        {activeTab === 'exams' ? (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              exam
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}
                          >
                            {exam ? 'Өгсөн' : 'Өгөөгүй'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            @tegshuhaan
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        {student.fullName || student.name || 'Нэргүй'}
                      </h3>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{student.email}</p>
                    </div>

                    {activeTab === 'homework' ? (
                      <div className="space-y-2 pt-2 border-t border-slate-800/60">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Даалгаврын гүйцэтгэл:</span>
                          <span
                            className={
                              percent === 100
                                ? 'text-emerald-400 font-bold'
                                : percent >= 50
                                ? 'text-sky-400'
                                : 'text-amber-400'
                            }
                          >
                            {percent}% ({completed}/{total})
                          </span>
                        </div>

                        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              percent === 100
                                ? 'bg-emerald-500'
                                : percent >= 50
                                ? 'bg-sky-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Сорилын оноо:</span>
                        {exam ? (
                          <span className="text-xs font-black text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                            {exam.score} / {exam.maxScore || 5} ({Math.round(((exam.score || 0) / (exam.maxScore || 5)) * 100)}%)
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 font-semibold">Илгээгээгүй</span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                      <span>Нийт бодсон: {(student.solvedProblems || []).length}</span>
                      <span className="text-sky-400 font-semibold group-hover:underline">Дэлгэрэнгүй &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#080e1a]">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-xl font-extrabold text-white">
                      {selectedStudent.fullName || selectedStudent.name || 'Нэргүй'}
                    </h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      {selectedStudent.class} анги
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedStudent.email}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* 1. Exam Performance Card */}
                {(() => {
                  const exam = getStudentExam(selectedStudent);
                  return (
                    <div className="p-4 rounded-xl bg-[#070d19] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          1-р улирлын сорилын үр дүн
                        </span>
                        {exam ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Хураагдсан
                          </span>
                        ) : (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            Өгөөгүй
                          </span>
                        )}
                      </div>

                      {exam ? (
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#050913] p-3 rounded-lg border border-slate-800">
                            <span className="text-[11px] text-slate-400 block">Бодсон тоо</span>
                            <span className="text-xl font-extrabold text-emerald-400">
                              {exam.score} / {exam.maxScore || 5}
                            </span>
                          </div>
                          <div className="bg-[#050913] p-3 rounded-lg border border-slate-800">
                            <span className="text-[11px] text-slate-400 block">Амжилт</span>
                            <span className="text-xl font-extrabold text-sky-400">
                              {Math.round(((exam.score || 0) / (exam.maxScore || 5)) * 100)}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500">Сурагч сорилын хариуг хараахан илгээгээгүй байна.</p>
                      )}
                    </div>
                  );
                })()}

                {/* 2. Homework Overview Stats */}
                {(() => {
                  const { percent, completed, total } = calculateStudentProgress(selectedStudent);
                  return (
                    <div className="p-4 rounded-xl bg-[#070d19] border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Гэрийн даалгаврын биелэлт</span>
                        <span className="text-2xl font-black text-white">{percent}%</span>
                      </div>
                      <div className="text-right text-xs text-slate-400 space-y-1">
                        <div>
                          Даалгавар: <span className="text-sky-400 font-bold">{completed}</span> / {total}
                        </div>
                        <div>
                          Нийт бодсон бодлого: <span className="text-emerald-400 font-bold">{(selectedStudent.solvedProblems || []).length}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. Assigned Homework Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">Оноосон даалгаврууд ({selectedStudent.class} анги)</h3>
                  {(() => {
                    const assignedIds = getAssignedHomeworkProblems();
                    if (assignedIds.length === 0) {
                      return <p className="text-xs text-slate-500">Одоогоор энэ ангид даалгавар оноогоогүй байна.</p>;
                    }

                    return (
                      <div className="space-y-2">
                        {assignedIds.map((pid) => {
                          const isDone = (selectedStudent.solvedProblems || []).includes(pid);
                          const problemMeta = basicPracticeData.find((p) => p.id === pid);

                          return (
                            <div
                              key={pid}
                              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                                    isDone ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-500'
                                  }`}
                                >
                                  {isDone ? '✓' : '✗'}
                                </span>
                                <span className="font-mono font-bold text-sky-400">{pid.toUpperCase()}</span>
                                <span className="text-white font-medium">
                                  {problemMeta ? problemMeta.name : 'Суурь бодлого'}
                                </span>
                              </div>
                              <span className="font-semibold text-[11px]">
                                {isDone ? 'Бодогдсон' : 'Хийгээгүй'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* 4. All Solved Problems List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">
                    Бүх бодсон бодлогууд ({(selectedStudent.solvedProblems || []).length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedStudent.solvedProblems || []).length === 0 ? (
                      <span className="text-xs text-slate-500">Одоогоор бодлого бодоогүй байна.</span>
                    ) : (
                      selectedStudent.solvedProblems.map((pid) => (
                        <span
                          key={pid}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-emerald-400"
                        >
                          {pid.toUpperCase()}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-800 flex justify-end bg-[#080e1a]">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal to Add Homework */}
        <AddHomeworkModal
          isOpen={isHwModalOpen}
          onClose={() => setIsHwModalOpen(false)}
          onCreated={() => {
            console.log('Homework successfully added');
          }}
        />
      </div>
    </div>
  );
}