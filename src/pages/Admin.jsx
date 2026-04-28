import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
// Import updateDoc and doc
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// ⚠️ REPLACE WITH YOUR EMAIL
const ADMIN_EMAIL = "enkhbayare111@gmail.com"; 

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else if (currentUser.email !== ADMIN_EMAIL) {
        navigate('/');
      } else {
        setUser(currentUser);
        
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribeSnapshot = onSnapshot(q, 
          (snapshot) => {
            const bookingData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(bookingData);
            setLoading(false);
          }, 
          (err) => {
            console.error("Database Error:", err);
            setError("Permission Denied.");
            setLoading(false);
          }
        );
        return () => unsubscribeSnapshot();
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // --- NEW FUNCTION: Mark as Paid ---
  const handleApprove = async (bookingId) => {
    const confirm = window.confirm("Did you receive the payment? This will mark the booking as Approved.");
    if (!confirm) return;

    try {
        const bookingRef = doc(db, "bookings", bookingId);
        await updateDoc(bookingRef, {
            status: "approved" // Changes status in database
        });
        alert("Booking Approved!");
    } catch (err) {
        console.error("Error updating:", err);
        alert("Failed to update status.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Checking permissions...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-800 text-slate-200 uppercase font-bold">
                    <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Course</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th> {/* New Column */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                {b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-white font-medium">{b.userEmail}</td>
                            <td className="px-6 py-4">
                                {b.courseName} <br/>
                                <span className="text-xs text-slate-500">{b.slotDate}</span>
                            </td>
                            <td className="px-6 py-4 text-emerald-400 font-bold">
                                {b.price?.toLocaleString()}₮
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded border text-xs font-bold uppercase
                                    ${b.status === 'approved' 
                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    }`}>
                                    {b.status}
                                </span>
                            </td>
                            {/* ACTION BUTTON */}
                            <td className="px-6 py-4">
                                {b.status !== 'approved' && (
                                    <button 
                                        onClick={() => handleApprove(b.id)}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs transition-colors"
                                    >
                                        Approve Payment
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;