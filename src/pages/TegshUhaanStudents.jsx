import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

export default function TegshUhaanStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    class: '6a',
    mustChangePassword: true
  });

  const availableClasses = ['6a', '7а', '8а', '9a', '10a', '11a', '12a'];

  // 1. Fetch @tegshuhaan.mn students from Firestore
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        where('isTegshUhaan', '==', true)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      // Sort numerically/alphabetically by email index
      list.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
      setStudents(list);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Add or Edit Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email ends with @tegshuhaan.mn
    let cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@tegshuhaan.mn')) {
      alert('Email must end with @tegshuhaan.mn');
      return;
    }

    try {
      if (editingId) {
        // Update existing student
        await updateDoc(doc(db, 'users', editingId), {
          fullName: formData.fullName.trim(),
          email: cleanEmail,
          class: formData.class,
          mustChangePassword: formData.mustChangePassword
        });
        alert('Student record updated successfully!');
      } else {
        // Create new student
        await addDoc(collection(db, 'users'), {
          fullName: formData.fullName.trim(),
          email: cleanEmail,
          class: formData.class,
          isTegshUhaan: true,
          mustChangePassword: true,
          solvedProblems: [],
          createdAt: serverTimestamp()
        });
        alert('New student added successfully!');
      }

      closeModal();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      alert('Failed to save student record.');
    }
  };

  // 3. Delete Student
  const handleDelete = async (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      try {
        await deleteDoc(doc(db, 'users', studentId));
        alert('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert('Failed to delete student.');
      }
    }
  };

  // Open modal for edit
  const openEditModal = (student) => {
    setEditingId(student.id);
    setFormData({
      fullName: student.fullName || '',
      email: student.email || '',
      class: student.class || '6a',
      mustChangePassword: student.mustChangePassword ?? true
    });
    setIsModalOpen(true);
  };

  // Reset and close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      fullName: '',
      email: '',
      class: '6a',
      mustChangePassword: true
    });
  };

  // Filter students by selected Class and Search query
  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    const matchesSearch = 
      (student.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tegsh Uhaan Students</h1>
          <p className="text-sm text-gray-500">Manage @tegshuhaan.mn student accounts by class section</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          + Add New Student
        </button>
      </div>

      {/* Class Selector Tabs & Search Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Class Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedClass('All')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              selectedClass === 'All' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({students.length})
          </button>
          {availableClasses.map(cls => {
            const count = students.filter(s => s.class === cls).length;
            return (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedClass === cls 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cls} ({count})
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading student records...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No students found for this class.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email / Account</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {student.class || 'N/A'}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {student.fullName || '—'}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-xs">
                      {student.email}
                    </td>
                    <td className="py-3 px-4">
                      {student.mustChangePassword ? (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
                          Password Reset Required
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(student)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 rounded px-2 py-1 hover:bg-indigo-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.fullName)}
                        className="text-red-600 hover:text-red-900 font-medium text-xs border border-red-200 rounded px-2 py-1 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Student' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Налжирмаа"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Username / Email (@tegshuhaan.mn)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. tegshuhaanstudent1@tegshuhaan.mn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Class Section
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="mustChangePassword"
                  checked={formData.mustChangePassword}
                  onChange={(e) => setFormData({ ...formData, mustChangePassword: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="mustChangePassword" className="text-sm text-gray-700">
                  Require Password Change on Next Login
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
                >
                  {editingId ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}