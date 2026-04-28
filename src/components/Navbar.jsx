import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optional: Redirect to home after logout if needed
      // window.location.href = '/'; 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold gradient-text">
          Mongol Code Academy
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-300 hover:text-sky-400 transition-colors">Нүүр</Link>
          <Link to="/courses" className="text-slate-300 hover:text-sky-400 transition-colors">Хичээлүүд</Link>
          <Link to="/live-classes" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-bold">Онлайн сургалт</Link>
          <Link to="/practice-hub" className="text-slate-300 hover:text-sky-400 transition-colors">Бодлогууд</Link>
          
          {/* NEW: MongolGPT Link */}
          <Link to="/mongol-gpt" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold hover:opacity-80 transition-opacity">
            MongolGPT
          </Link>
          
          {user ? (
            <button 
              onClick={handleLogout} 
              className="text-slate-300 hover:text-sky-400 transition-colors font-medium"
            >
              Гарах
            </button>
          ) : (
            <Link to="/login" className="text-slate-300 hover:text-sky-400 transition-colors">
              Нэвтрэх
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 bg-black/90 border-b border-slate-800">
          <Link to="/" className="block py-2 text-slate-300 hover:text-sky-400" onClick={() => setIsMobileMenuOpen(false)}>Нүүр</Link>
          <Link to="/courses" className="block py-2 text-slate-300 hover:text-sky-400" onClick={() => setIsMobileMenuOpen(false)}>Хичээлүүд</Link>
          <Link to="/practice-hub" className="block py-2 text-slate-300 hover:text-sky-400" onClick={() => setIsMobileMenuOpen(false)}>Бодлогууд</Link>
          
          {/* NEW: Mobile MongolGPT Link */}
          <Link to="/mongol-gpt" className="block py-2 text-purple-400 font-bold" onClick={() => setIsMobileMenuOpen(false)}>MongolGPT</Link>
          
          <div className="border-t border-slate-700 my-2"></div>
          
          {user ? (
            <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-slate-300 hover:text-sky-400">Гарах</button>
          ) : (
            <Link to="/login" className="block py-2 text-slate-300 hover:text-sky-400" onClick={() => setIsMobileMenuOpen(false)}>Нэвтрэх</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;