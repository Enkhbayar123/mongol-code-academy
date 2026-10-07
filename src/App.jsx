import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import PracticeHub from './pages/PracticeHub';
import BasicPracticeList from './pages/BasicPracticeList';
import Curriculum from './pages/Curriculum';
import BasicProblem from './pages/BasicProblem';
import Problem from './pages/Problem';

// --- IMPORTS ---
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import MongolGPT from './pages/MongolGPT';
import SupervisorDashboard from './pages/SupervisorDashboard';
import ExamTest1 from './pages/ExamTest1';
import ChangePassword from './pages/ChangePassword';

// Guard
import RequirePasswordChangeGuard from './components/RequirePasswordChangeGuard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#030712] relative overflow-hidden grid-bg">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* Protected Routes Enforced by Password Guard */}
            <Route path="/" element={<RequirePasswordChangeGuard><Home /></RequirePasswordChangeGuard>} />
            <Route path="/courses" element={<RequirePasswordChangeGuard><Courses /></RequirePasswordChangeGuard>} />
            <Route path="/practice-hub" element={<RequirePasswordChangeGuard><PracticeHub /></RequirePasswordChangeGuard>} />
            <Route path="/practice-basic" element={<RequirePasswordChangeGuard><BasicPracticeList /></RequirePasswordChangeGuard>} />
            <Route path="/curriculum" element={<RequirePasswordChangeGuard><Curriculum /></RequirePasswordChangeGuard>} />
            <Route path="/practice-basic/:id" element={<RequirePasswordChangeGuard><BasicProblem /></RequirePasswordChangeGuard>} />
            <Route path="/problem/:id" element={<RequirePasswordChangeGuard><Problem /></RequirePasswordChangeGuard>} />
            <Route path="/mongol-gpt" element={<RequirePasswordChangeGuard><MongolGPT /></RequirePasswordChangeGuard>} />
            <Route path="/admin" element={<RequirePasswordChangeGuard><Admin /></RequirePasswordChangeGuard>} />
            <Route path="/supervisor-dashboard" element={<RequirePasswordChangeGuard><SupervisorDashboard /></RequirePasswordChangeGuard>} />
            <Route path="/exam/semester-1" element={<RequirePasswordChangeGuard><ExamTest1 /></RequirePasswordChangeGuard>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;