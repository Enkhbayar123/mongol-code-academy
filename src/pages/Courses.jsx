import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { coursesData } from '../data/courses-data';

const Courses = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for the UI
  const [activeCourseId, setActiveCourseId] = useState(null); // Which accordion is open?
  const [selectedVideo, setSelectedVideo] = useState(null);   // Which video is playing?
  
  const navigate = useNavigate();

  // 1. Auth Protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Redirect to login if not authenticated
        navigate('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Toggle Accordion
  const toggleAccordion = (id) => {
    if (activeCourseId === id) {
      setActiveCourseId(null); // Close if already open
    } else {
      setActiveCourseId(id); // Open the clicked one
    }
  };

  // 3. Open Video Modal
  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  // 4. Close Video Modal
  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;
  }

  // If we are here, the user is logged in
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">Үнэгүй хичээлүүд</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Программчлалын суурь ойлголтоос эхлээд гол өгөгдлийн бүтцүүдийг хамарсан үнэгүй курсуудаар бат бөх суурь бий болгоорой.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {coursesData.map((course) => (
          <div 
            key={course.id} 
            className={`accordion-item bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden transition-all duration-300 ${activeCourseId === course.id ? 'active ring-1 ring-sky-500/30' : ''}`}
          >
            {/* Accordion Header */}
            <button 
              onClick={() => toggleAccordion(course.id)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{course.description}</p>
              </div>
              <svg 
                className={`w-6 h-6 text-slate-400 flex-shrink-0 transform transition-transform duration-300 ${activeCourseId === course.id ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Accordion Content */}
            <div 
              className={`accordion-content bg-black/20 transition-all duration-500 ease-in-out ${activeCourseId === course.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul className="p-2 sm:p-4 space-y-1">
                {course.lectures.map((lecture, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => openVideo(lecture.videoId)}
                      className="w-full text-left flex items-center gap-4 py-3 px-4 text-slate-300 border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/50 hover:text-white rounded-md transition-colors duration-200"
                    >
                      <svg className="w-6 h-6 text-sky-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                      </svg>
                      <span>{lecture.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={closeVideo} // Close when clicking background
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-4xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video player itself
          >
            <button 
              onClick={closeVideo} 
              className="absolute -top-4 -right-4 h-10 w-10 bg-white text-black rounded-full flex items-center justify-center z-10 text-2xl font-bold hover:scale-110 transition-transform"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full relative pt-[56.25%]">
               <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;