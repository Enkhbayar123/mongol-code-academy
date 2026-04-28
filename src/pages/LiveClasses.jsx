// src/pages/LiveClasses.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Confetti from 'react-confetti';

// --- DATA CONFIGURATION ---
const COURSE_TYPES = [
  {
    id: 'private',
    title: 'Ганцаарчилсан сургалт',
    desc: 'Танд зориулсан тусгай хөтөлбөрөөр ганцаарчилан заана.',
    price: 75000,
    priceLabel: '75,000₮ / цаг',
    isHourly: true,
    features: ['1-on-1 Ментор', 'Тусгай хөтөлбөр', 'Код хяналт', 'Уян хатан цаг']
  },
  {
    id: 'basic-group',
    title: 'Программчлалын Үндэс',
    desc: 'Анхан шатнаас эхлэн код бичиж сурах 1 сарын эрчимжүүлсэн хөтөлбөр.',
    price: 300000,
    priceLabel: '300,000₮ / хөтөлбөр',
    isHourly: false,
    features: ['Бүлгийн сургалт', 'Анхан шатны Syntax', 'Төслүүд', 'Анимейшн']
  },
  {
    id: 'dsa-group',
    title: 'Data Structures & Algorithms',
    desc: 'LeetCode бодлого бодох арга барил, алгоритмын гүнзгийрүүлсэн сургалт.',
    price: 300000,
    priceLabel: '300,000₮ / хөтөлбөр',
    isHourly: false,
    features: ['Big O Notation', 'LeetCode аргачлал', 'Ярилцлагын бэлтгэл', 'Ахисан түвшин']
  }
];

// --- MOCK SCHEDULE DATA (Edit this!) ---
const AVAILABLE_SLOTS = {
    // For Private Tutoring: Specific Hourly Slots
    private: [
        { date: 'Лхагва, 31/12', time: '18:00 - 19:00' },
        { date: 'Лхагва, 31/12', time: '19:30 - 20:30' },
        { date: 'Пүрэв, 01/01', time: '18:00 - 19:00' },
        { date: 'Пүрэв, 01/01', time: '20:00 - 21:00' },
    ],
    // For Group Classes: Start Dates
    group: [
        { date: '11 сарын 1', time: 'Дав/Лха/Баа 18:00' },
        { date: '12 сарын 1', time: 'Дав/Лха/Баа 18:00' }
    ]
};

// --- BANK INFO FOR MANUAL PAYMENT ---
const BANK_INFO = {
    bankName: "Голомт банк",
    accountNumber: "MN820015003100000951", // ⚠️ REPLACE WITH YOUR ACCOUNT NUMBER
    accountName: "Энхбаяр Энхбаатар" // ⚠️ REPLACE WITH YOUR NAME
};

const LiveClasses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // State for Booking Flow
  const [step, setStep] = useState(1); // 1: Course, 2: Schedule, 3: Confirm
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setStep(2);
    setSelectedSlot(null);
  };

  const handleBooking = async () => {
    if (!user) {
        alert("Та захиалга өгөхийн тулд нэвтрэх шаардлагатай.");
        navigate('/login');
        return;
    }
    
    setLoading(true);
    try {
        // Save booking to Firestore
        await addDoc(collection(db, "bookings"), {
            userId: user.uid,
            userEmail: user.email,
            courseId: selectedCourse.id,
            courseName: selectedCourse.title,
            price: selectedCourse.price,
            slotDate: selectedSlot.date,
            slotTime: selectedSlot.time,
            status: 'pending', // Pending payment
            createdAt: serverTimestamp()
        });
        
        setSuccess(true);
        setStep(3);
    } catch (error) {
        console.error("Booking Error:", error);
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
        setLoading(false);
    }
  };

  // --- RENDER STEP 1: Course Selection ---
  const renderStep1 = () => (
    <div className="grid md:grid-cols-3 gap-6">
        {COURSE_TYPES.map((course) => (
            <div key={course.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer flex flex-col" onClick={() => handleCourseSelect(course)}>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{course.desc}</p>
                <div className="space-y-2 mb-6">
                    {course.features.map((f, i) => (
                        <div key={i} className="flex items-center text-xs text-slate-300">
                            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            {f}
                        </div>
                    ))}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-emerald-400 font-bold">{course.priceLabel}</span>
                    <button className="bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors">Сонгох</button>
                </div>
            </div>
        ))}
    </div>
  );

  // --- RENDER STEP 2: Schedule Selection ---
  const renderStep2 = () => {
    // Determine which slots to show based on course type
    const slots = selectedCourse.id === 'private' ? AVAILABLE_SLOTS.private : AVAILABLE_SLOTS.group;
    
    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm">← Буцах</button>
            
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-1">Цагаа сонгоно уу</h3>
                <p className="text-slate-400 text-sm mb-6">
                    {selectedCourse.title} - <span className="text-emerald-400">{selectedCourse.priceLabel}</span>
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {slots.map((slot, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-4 rounded-lg border text-left transition-all ${
                                selectedSlot === slot 
                                ? 'bg-emerald-600 border-emerald-500 text-white' 
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                            }`}
                        >
                            <div className="font-bold">{slot.date}</div>
                            <div className={`text-sm ${selectedSlot === slot ? 'text-emerald-100' : 'text-slate-500'}`}>{slot.time}</div>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleBooking}
                    disabled={!selectedSlot || loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/20"
                >
                    {loading ? 'Уншиж байна...' : 'Захиалга баталгаажуулах'}
                </button>
            </div>
        </div>
    );
  };

  // --- RENDER STEP 3: Success & Payment Instructions ---
  const renderStep3 = () => (
    <div className="max-w-xl mx-auto text-center py-10">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">Захиалга үүслээ!</h2>
        <p className="text-slate-400 mb-8">
            Таны суудал баталгаажсан боловч <strong>төлбөр хүлээгдэж байна</strong>.
        </p>

        {/* PAYMENT INSTRUCTIONS BOX */}
        <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-xl text-left mb-8 shadow-lg shadow-emerald-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                ТӨЛБӨР ТӨЛӨХ
            </div>

            <p className="text-slate-400 text-sm mb-4">
                Доорх данс руу төлбөрөө шилжүүлснээр таны бүртгэл бүрэн баталгаажих болно.
            </p>

            <div className="bg-black/40 p-4 rounded-lg border border-slate-800 mb-4 font-mono text-sm">
                <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Банк:</span>
                    <span className="text-white font-medium">{BANK_INFO.bankName}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Данс:</span>
                    <span className="text-emerald-400 font-bold text-lg select-all">{BANK_INFO.accountNumber}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Хүлээн авагч:</span>
                    <span className="text-white">{BANK_INFO.accountName}</span>
                </div>
                <div className="border-t border-slate-700 my-2 pt-2 flex justify-between">
                    <span className="text-slate-500">Дүн:</span>
                    <span className="text-emerald-400 font-bold">{selectedCourse.price?.toLocaleString()}₮</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">Гүйлгээний утга:</span>
                    <span className="text-yellow-400 font-bold select-all bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                        {user.email}
                    </span>
                </div>
            </div>

            <p className="text-xs text-slate-500 italic text-center">
                * Гүйлгээний утга дээр <strong>и-мэйл хаягаа</strong> заавал бичнэ үү.
            </p>
        </div>

        <div className="flex gap-4 justify-center">
            <button onClick={() => { setStep(1); setSuccess(false); }} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
                Өөр захиалга хийх
            </button>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-lg shadow-emerald-600/20">
                Нүүр хуудас руу буцах
            </button>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-16">
      {success && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">Онлайн Сургалт</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Танд тохирох сургалтын төрлөө сонгон цагаа захиалаарай.
        </p>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default LiveClasses;