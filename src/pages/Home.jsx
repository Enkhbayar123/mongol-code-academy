import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../context/LanguageContext';
import partnerLogo from '../assets/partner-logo.png';

const Home = () => {
  const [user, setUser] = useState(null);
  const canvasRef = useRef(null);
  const { t } = useLanguage();
  
  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(56, 189, 248, 0.5)';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3. Scroll Reveal & Typing Animation (FIXED)
  useEffect(() => {
    // --- Scroll Reveal Setup ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- Typing Animation Setup ---
    const codeBlock = document.getElementById('code-snippet');
    const codeContainer = document.getElementById('code-container');
    let typeTimeout;
    let codeObserver;

    if (codeBlock && codeContainer) {
        const codeText = `// Solve Two Sum in O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return null; // No solution found
}`;
        codeBlock.innerHTML = '';
        
        let charIndex = 0;
        let isTyping = false;

        const typeCode = () => {
            if (charIndex < codeText.length) {
                codeBlock.innerHTML += codeText.charAt(charIndex);
                charIndex++;
                typeTimeout = setTimeout(typeCode, 30);
            }
        };

        codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    typeCode();
                }
            });
        }, { threshold: 0.5 });
        
        codeObserver.observe(codeContainer);
    }

    return () => {
        observer.disconnect();
        if (codeObserver) codeObserver.disconnect();
        if (typeTimeout) clearTimeout(typeTimeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Background Canvas */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-24 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            {t('hero_title_1')} <span className="gradient-text">{t('hero_title_2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            {t('hero_desc')}
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-3">
                 {t('hero_login_register')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">{t('features_title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            {t('features_desc')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card glass-card-hover p-8 rounded-2xl scroll-reveal opacity-0 translate-y-8">
                <div className="p-3 bg-sky-500/10 rounded-xl inline-block mb-5 border border-sky-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{t('feat_curriculum_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t('feat_curriculum_desc')}</p>
            </div>
            <div className="glass-card glass-card-hover p-8 rounded-2xl scroll-reveal opacity-0 translate-y-8 delay-100">
                 <div className="p-3 bg-purple-500/10 rounded-xl inline-block mb-5 border border-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{t('feat_video_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t('feat_video_desc')}</p>
            </div>
            <div className="glass-card glass-card-hover p-8 rounded-2xl scroll-reveal opacity-0 translate-y-8 delay-200">
                <div className="p-3 bg-emerald-500/10 rounded-xl inline-block mb-5 border border-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{t('feat_community_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t('feat_community_desc')}</p>
            </div>
        </div>
      </section>

      {/* Why Follow Section */}
      <section id="why-follow" className="py-24 sm:py-32 bg-[#060a13]/40 border-y border-white/5 relative z-10 backdrop-blur-sm">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
                    <h2 className="text-4xl font-extrabold mb-5 tracking-tight">{t('why_connect_title')}</h2>
                    <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                        {t('why_connect_desc')}
                    </p>
                    <ul className="space-y-5">
                        <li className="flex items-start">
                            <span className="text-sky-400 mr-4 mt-1 bg-sky-500/10 p-1 rounded-lg border border-sky-500/20 font-bold">✓</span>
                            <span className="text-slate-300 text-base leading-relaxed"><strong className="font-bold text-slate-100">{t('why_connect_item1_title')}</strong>{t('why_connect_item1_desc')}</span>
                        </li>
                         <li className="flex items-start">
                            <span className="text-sky-400 mr-4 mt-1 bg-sky-500/10 p-1 rounded-lg border border-sky-500/20 font-bold">✓</span>
                             <span className="text-slate-300 text-base leading-relaxed"><strong className="font-bold text-slate-100">{t('why_connect_item2_title')}</strong>{t('why_connect_item2_desc')}</span>
                        </li>
                        <li className="flex items-start">
                             <span className="text-sky-400 mr-4 mt-1 bg-sky-500/10 p-1 rounded-lg border border-sky-500/20 font-bold">✓</span>
                             <span className="text-slate-300 text-base leading-relaxed"><strong className="font-bold text-slate-100">{t('why_connect_item3_title')}</strong>{t('why_connect_item3_desc')}</span>
                        </li>
                    </ul>
                </div>
                
                {/* Typing Animation Container */}
                <div id="code-container" className="relative scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                    <div className="relative bg-[#080b11]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* macOS style title bar */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0d1321]/80 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 font-mono tracking-wide">twoSum.js</span>
                            <div className="w-12"></div>
                        </div>
                        
                        <div className="p-6 overflow-x-auto min-h-[300px]">
                            <pre className="font-mono text-sm leading-relaxed flex gap-4 text-[#e2e8f0]">
                                <div className="text-slate-600 select-none text-right flex flex-col font-mono text-xs pr-3 border-r border-white/5 space-y-1">
                                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                                </div>
                                <code id="code-snippet" className="text-emerald-400 font-mono block whitespace-pre"></code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-24 sm:py-32 relative z-10">
          <div className="container mx-auto px-6 text-center scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">{t('sponsors_title')}</h2>
              <p className="text-slate-400 max-w-3xl mx-auto mb-16 text-base sm:text-lg">
                {t('sponsors_desc')}
              </p>
              <div className="max-w-4xl mx-auto glass-card rounded-3xl p-16 shadow-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 blur-[100px] pointer-events-none"></div>
                  
                  {/* Partner Logo */}
                  <img src={partnerLogo} alt="Partner Logo" className="h-24 w-auto object-contain relative z-10 opacity-90 hover:opacity-100 transition-opacity" />
              </div>
          </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 sm:py-32 relative z-10 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">{t('cta_ready')}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
                    {t('cta_desc')}
                </p>
                <Link to="/register" className="bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-bold py-4.5 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/25 inline-block">
                    {t('cta_btn')}
                </Link>
            </div>
        </section>
      )}
    </div>
  );
};

export default Home;