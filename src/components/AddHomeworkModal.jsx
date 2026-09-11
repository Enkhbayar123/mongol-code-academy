// src/components/AddHomeworkModal.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { basicPracticeData } from '../data/basic-practice-data';

export default function AddHomeworkModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [assignedClass, setAssignedClass] = useState('8а');
  const [dueDate, setDueDate] = useState('');
  const [selectedProblemIds, setSelectedProblemIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Filter problems that have test cases
  const availableProblems = basicPracticeData.filter(
    (p) => p.testCases && p.testCases.length > 0
  );

  const toggleProblem = (id) => {
    setSelectedProblemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProblemIds.length === availableProblems.length) {
      setSelectedProblemIds([]);
    } else {
      setSelectedProblemIds(availableProblems.map((p) => p.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Даалгаврын нэрийг оруулна уу.');
      return;
    }
    if (selectedProblemIds.length === 0) {
      setErrorMsg('Ядаж нэг бодлого сонгоно уу.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'homeworks'), {
        title: title.trim(),
        assignedClass,
        problemIds: selectedProblemIds,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdAt: serverTimestamp()
      });

      // Reset form
      setTitle('');
      setSelectedProblemIds([]);
      setDueDate('');
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg('Даалгавар үүсгэхэд алдаа гарлаа: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Шинэ гэрийн даалгавар нэмэх</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Бодлогуудыг сонгоод сурагчдад даалгавар болгон оноох
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-semibold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 text-xs bg-rose-950/40 border border-rose-900/50 text-rose-300 rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Даалгаврын нэр <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Жишээ: Долоо хоног 1 - Шугаман алгоритм"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#050913] border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Class & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Анги сонгох
              </label>
              <select
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                className="w-full bg-[#050913] border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="all">Бүх анги</option>
                <option value="8а">8а анги</option>
                <option value="8б">8б анги</option>
                <option value="9а">9а анги</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Дуусах хугацаа (Заавал биш)
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#050913] border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Problem Selector Checkbox List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Бодлогууд сонгох ({selectedProblemIds.length} сонгогдсон)
              </label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                {selectedProblemIds.length === availableProblems.length
                  ? 'Бүгдийг болих'
                  : 'Бүгдийг сонгох'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-2 bg-[#050913] border border-slate-800 rounded-xl">
              {availableProblems.map((problem) => {
                const checked = selectedProblemIds.includes(problem.id);
                return (
                  <label
                    key={problem.id}
                    onClick={() => toggleProblem(problem.id)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors text-xs select-none ${
                      checked
                        ? 'bg-sky-950/40 border border-sky-800/40 text-white'
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}} // handled by parent label click
                      className="rounded border-slate-700 text-sky-600 focus:ring-0"
                    />
                    <span className="font-mono text-sky-400 font-bold">
                      {problem.id.toUpperCase()}
                    </span>
                    <span className="truncate">{problem.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </form>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-end space-x-3 bg-[#080e1a]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Цуцлах
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-sm disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Хадгалж байна...</span>
              </>
            ) : (
              <span>Даалгавар үүсгэх</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}