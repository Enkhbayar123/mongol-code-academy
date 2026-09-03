import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

const SupervisorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTegshUhaanStudents = async () => {
      try {
        // Query Firestore users collection for Tegsh Uhaan students
        const q = query(collection(db, "users"), where("isTegshUhaan", "==", true));
        const querySnapshot = await getDocs(q);
        
        const studentList = [];
        querySnapshot.forEach((doc) => {
          studentList.push({ id: doc.id, ...doc.data() });
        });

        setStudents(studentList);
      } catch (err) {
        console.error("Error fetching students: ", err);
        setError("Failed to load student progress data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTegshUhaanStudents();
  }, []);

  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight gradient-text">
          Supervisor Dashboard
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Tracking progress and performance for Tegsh Uhaan School students.
        </p>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="w-8 h-8 rounded-full border-4 border-sky-500/30 border-t-sky-500 animate-spin"></span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center">
          {error}
        </div>
      )}

      {/* Student List Grid / Table */}
      {!loading && !error && students.length === 0 && (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/5">
          <p className="text-slate-400 font-semibold">No students found from Tegsh Uhaan School yet.</p>
        </div>
      )}

      {!loading && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/5 pointer-events-none"></div>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-100">{student.fullName || 'Unnamed Student'}</h3>
                  <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs px-2.5 py-1 rounded-xl font-semibold">
                    {student.programmingExperience || 'Beginner'}
                  </span>
                </div>
                
                <div className="space-y-2 text-xs sm:text-sm text-slate-400 mb-6">
                  <p><strong className="text-slate-300">Email:</strong> {student.email}</p>
                  <p><strong className="text-slate-300">Age:</strong> {student.age || 'N/A'}</p>
                  <p><strong className="text-slate-300">Country:</strong> {student.country || 'N/A'}</p>
                  {student.reasonForJoining && (
                    <p className="pt-2 border-t border-white/5"><strong className="text-slate-300">Goal:</strong> {student.reasonForJoining}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
                <span>Joined: {student.createdAt?.toDate ? student.createdAt.toDate().toLocaleDateString() : 'Recent'}</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupervisorDashboard;