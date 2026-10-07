// src/components/RequirePasswordChangeGuard.jsx
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function RequirePasswordChangeGuard({ children }) {
  const user = auth.currentUser;
  const [mustChange, setMustChange] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function checkPasswordFlag() {
      if (user && user.email?.endsWith('@tegshuhaan.mn')) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().mustChangePassword === true) {
          setMustChange(true);
          return;
        }
      }
      setMustChange(false);
    }
    checkPasswordFlag();
  }, [user]);

  if (mustChange === null) return <div>Checking credentials...</div>;

  // Block navigation and redirect if password change is pending
  if (mustChange && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  return children;
}