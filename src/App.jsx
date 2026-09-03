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
import SupervisorDashboard from './pages/SupervisorDashboard'; // Added Supervisor Dashboard import

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
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/practice-hub" element={<PracticeHub />} />
            <Route path="/practice-basic" element={<BasicPracticeList />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/practice-basic/:id" element={<BasicProblem />} />
            <Route path="/problem/:id" element={<Problem />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mongol-gpt" element={<MongolGPT />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} /> {/* Added Supervisor Dashboard Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;