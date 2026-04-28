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

// --- NEW IMPORTS ---
import Login from './pages/Login';
import Register from './pages/Register';
import LiveClasses from './pages/LiveClasses';
import Admin from './pages/Admin';
import MongolGPT from './pages/MongolGPT';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-inter">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/live-classes" element={<LiveClasses />} />
            <Route path="/practice-hub" element={<PracticeHub />} />
            <Route path="/practice-basic" element={<BasicPracticeList />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/practice-basic/:id" element={<BasicProblem />} />
            <Route path="/problem/:id" element={<Problem />} />
            
            {/* NEW ROUTE */}
            <Route path="/mongol-gpt" element={<MongolGPT />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;