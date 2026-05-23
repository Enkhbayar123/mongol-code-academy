import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => {
    return `relative transition-all duration-300 font-semibold text-sm py-2 px-4 rounded-xl flex items-center gap-1.5 ${
      isActive(path)
        ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-wider gradient-text hover:opacity-90 transition-opacity">
          Mongol Code Academy
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className={linkClass('/')}>{t('home')}</Link>
          <Link to="/courses" className={linkClass('/courses')}>{t('courses')}</Link>
          <Link to="/practice-hub" className={linkClass('/practice-hub')}>{t('practice')}</Link>
          <Link to="/about" className={linkClass('/about')}>{t('about')}</Link>
          <Link to="/contact" className={linkClass('/contact')}>{t('contact')}</Link>
          
          {/* MongolGPT Link */}
          <Link 
            to="/mongol-gpt" 
            className={`transition-all duration-300 font-black text-sm py-2 px-4 rounded-xl flex items-center gap-1.5 border ${
              isActive('/mongol-gpt')
                ? 'text-pink-400 bg-pink-500/10 border-pink-500/25 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-90 border-transparent hover:bg-white/5'
            }`}
          >
            {t('mongolgpt')}
          </Link>
          
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

          {/* Language Selector Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide">
              <span>{language === 'mn' ? '🇲🇳 MN' : language === 'ko' ? '🇰🇷 KO' : '🇺🇸 EN'}</span>
              <svg className="w-3 h-3 text-slate-400 group-hover:text-sky-400 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-36 bg-[#090d16]/95 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden backdrop-blur-xl p-1">
              <button onClick={() => changeLanguage('mn')} className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-sky-500/10 hover:text-sky-400 transition-colors flex items-center gap-2.5">
                <span>🇲🇳</span> Монгол
              </button>
              <button onClick={() => changeLanguage('ko')} className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-sky-500/10 hover:text-sky-400 transition-colors flex items-center gap-2.5">
                <span>🇰🇷</span> 한국어
              </button>
              <button onClick={() => changeLanguage('en')} className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-sky-500/10 hover:text-sky-400 transition-colors flex items-center gap-2.5">
                <span>🇺🇸</span> English
              </button>
            </div>
          </div>

          {user ? (
            <button 
              onClick={handleLogout} 
              className="text-slate-400 hover:text-red-400 transition-colors font-bold text-sm py-2 px-4 rounded-xl hover:bg-red-500/5 hover:scale-105"
            >
              {t('logout')}
            </button>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-2 px-5 rounded-xl text-sm transition-all duration-300 shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.03]">
              {t('login')}
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300 hover:text-sky-400 transition-colors p-1.5 rounded-xl bg-white/5 border border-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-6 bg-[#030712]/95 border-b border-white/5 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col space-y-2 pt-3">
            <Link to="/" className={`block py-2.5 px-3 rounded-xl text-sm font-semibold ${isActive('/') ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'}`} onClick={() => setIsMobileMenuOpen(false)}>{t('home')}</Link>
            <Link to="/courses" className={`block py-2.5 px-3 rounded-xl text-sm font-semibold ${isActive('/courses') ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'}`} onClick={() => setIsMobileMenuOpen(false)}>{t('courses')}</Link>
            <Link to="/practice-hub" className={`block py-2.5 px-3 rounded-xl text-sm font-semibold ${isActive('/practice-hub') ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'}`} onClick={() => setIsMobileMenuOpen(false)}>{t('practice')}</Link>
            <Link to="/about" className={`block py-2.5 px-3 rounded-xl text-sm font-semibold ${isActive('/about') ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'}`} onClick={() => setIsMobileMenuOpen(false)}>{t('about')}</Link>
            <Link to="/contact" className={`block py-2.5 px-3 rounded-xl text-sm font-semibold ${isActive('/contact') ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'}`} onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</Link>
            <Link to="/mongol-gpt" className={`block py-2.5 px-3 rounded-xl text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-purple-500/5`} onClick={() => setIsMobileMenuOpen(false)}>{t('mongolgpt')}</Link>
            
            <div className="border-t border-white/10 my-3"></div>
            
            {/* Mobile Language Selector */}
            <div className="px-3">
              <div className="text-xs text-slate-500 mb-2.5 uppercase font-bold tracking-wider">Language / Хэл</div>
              <div className="flex gap-2">
                <button onClick={() => { changeLanguage('mn'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${language === 'mn' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-400'}`}>🇲🇳 MN</button>
                <button onClick={() => { changeLanguage('ko'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ko' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-400'}`}>🇰🇷 KO</button>
                <button onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${language === 'en' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-400'}`}>🇺🇸 EN</button>
              </div>
            </div>

            <div className="border-t border-white/10 my-3"></div>
            
            {user ? (
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-sm font-bold text-red-400 hover:bg-red-500/5 rounded-xl">{t('logout')}</button>
            ) : (
              <Link to="/login" className="block text-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all" onClick={() => setIsMobileMenuOpen(false)}>{t('login')}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;