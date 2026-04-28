import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Home = () => {
  const [user, setUser] = useState(null);
  const [showEmail, setShowEmail] = useState(false);
  const canvasRef = useRef(null);
  
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
        // Reset to empty string to prevent duplication
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

    // --- CLEANUP FUNCTION (Crucial for React Strict Mode) ---
    return () => {
        observer.disconnect(); // Stop watching scroll elements
        if (codeObserver) codeObserver.disconnect(); // Stop watching code block
        if (typeTimeout) clearTimeout(typeTimeout); // Stop the typing loop
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
            Бодлого Бод <span className="gradient-text">Кодонд мэргэш</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Суурь программчлалын үндсээс эхлээд LeetCode-ийн ахисан түвшний сорил хүртэл бид таны хүссэн технологийн ажлыг олоход шаардлагатай системтэй замыг санал болгодог.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-3">
                 Нэвтрэх / Бүртгүүлэх
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 container mx-auto px-6">
        <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-4xl font-bold mb-3">Амжилтад хүрэхэд хэрэгтэй бүхэн</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Манай платформ нь дэлхийн томоохон технологийн компаниудын ярилцлагад бэлдэх Leetcode дээрх бодлогуудыг Монгол тайлбартайгаар хүргэхэд чиглэсэн юм.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-2 transition-transform duration-300 scroll-reveal opacity-0 translate-y-8">
                <div className="p-3 bg-sky-500/10 rounded-lg inline-block mb-4 border border-sky-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Эмх цэгцтэй суралцах хөтөлбөр</h3>
                <p className="text-slate-400">Манай иж бүрэн сургалтын хөтөлбөрөөр А-гаас Я хүртэлх тодорхой замыг дагаж, бүх чухал алгоритмын ерөнхий ойлголтыг авах юм.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-2 transition-transform duration-300 scroll-reveal opacity-0 translate-y-8 delay-100">
                 <div className="p-3 bg-purple-500/10 rounded-lg inline-block mb-4 border border-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Бодлогуудын видео тайлбар</h3>
                <p className="text-slate-400">Хэзээ ч гацахгүй. Бүх асуудалд зориулсан нарийвчилсан, алхам алхамаар тайлбарласан видео хичээлээр кодын “яагаад”-г ойлгоорой.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-2 transition-transform duration-300 scroll-reveal opacity-0 translate-y-8 delay-200">
                <div className="p-3 bg-emerald-500/10 rounded-lg inline-block mb-4 border border-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Дэмжлэгтэй хамт олон</h3>
                <p className="text-slate-400">Идэвхтэй суралцагчдын сүлжээнд нэгдээрэй. Асуулт асууж, шийдлээ хуваалцаж, хувийн нийгэмлэгтээ хамтдаа өсөж хөгжөөрэй.</p>
            </div>
        </div>
      </section>

      {/* Why Follow Section */}
      <section id="why-follow" className="py-20 sm:py-32 bg-slate-900/50">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
                    <h2 className="text-4xl font-bold mb-4">Надтай холбогдож, өөрийн өсөлтөө эрчимжүүлээрэй</h2>
                    <p className="text-slate-400 mb-6 text-lg">
                        Намайг GitHub болон LinkedIn дээр дагаж мөрдөх нь зөвхөн нэвтрэх шаардлага биш—энэ нь тасралтгүй мэдлэг, карьерийн боломжууд, шууд дэмжлэг авах таны гарц юм.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="text-sky-400 mr-3 mt-1">✓</span>
                            <span className="text-slate-300"><strong className="font-semibold text-white">Онцгой сангууд руу хандах:</strong> Эхлэх код, ахисан шийдлүүд, төслийн загварууд.</span>
                        </li>
                         <li className="flex items-start">
                            <span className="text-sky-400 mr-3 mt-1">✓</span>
                             <span className="text-slate-300"><strong className="font-semibold text-white">Төслүүдийн шинэчлэлт:</strong> Миний шинэ нээлттэй эхийн төслүүд, кодын туршилтууд.</span>
                        </li>
                        <li className="flex items-start">
                             <span className="text-sky-400 mr-3 mt-1">✓</span>
                             <span className="text-slate-300"><strong className="font-semibold text-white">Мэргэжлийн сүлжээ:</strong> Миний сүлжээнд холбогдож, карьерын зөвлөмж авах.</span>
                        </li>
                    </ul>
                </div>
                
                {/* Typing Animation Container */}
                <div id="code-container" className="relative scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-2xl transform -rotate-2"></div>
                    <div className="relative bg-[#101010] p-8 rounded-2xl border border-slate-700">
                        <pre><code id="code-snippet" className="text-sm font-mono text-green-400"></code></pre>
                    </div>
                </div>
            </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 sm:py-32">
          <div className="container mx-auto px-6 text-center scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-4xl font-bold mb-4">Бидний Аяллыг Дэмжээрэй</h2>
              <p className="text-slate-400 max-w-3xl mx-auto mb-12">
                Mongol Code Academy нь Монголын ирээдүйн технологийн манлайлагчдыг бэлтгэх эрхэм зорилготой. Бидний үйл ажиллагааг дэмжиж, энэхүү өсөлт хөгжилтийн нэгэн хэсэг болох түншүүдийг хайж байна.
              </p>
              <div className="max-w-4xl mx-auto bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-2xl p-12 mb-10">
                  <p className="text-2xl font-semibold text-slate-500">Таны лого энд байрших болно</p>
              </div>
              
              {!showEmail ? (
                <button onClick={() => setShowEmail(true)} className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-emerald-500/30 inline-block">
                    Дэмжигч болох
                </button>
              ) : (
                <p className="mt-4 text-xl text-sky-400 font-semibold tracking-wider animate-bounce">
                    Enkhbayare111@gmail.com
                </p>
              )}
          </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 sm:py-32 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">Аяллаа эхлэхэд бэлэн үү?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Өнөөдрөөс өөрийн өсөлтдөө хөрөнгө оруулаарай.
                </p>
                <Link to="/register" className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-sky-500/30 inline-block">
                    Үнэгүй нэгдэх
                </Link>
            </div>
        </section>
      )}
    </div>
  );
};

export default Home;