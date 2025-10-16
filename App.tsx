
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Highlights from './components/Highlights';
import Venue from './components/Venue';
import Menu from './components/Menu';
import Booking from './components/Booking';
import Footer from './components/Footer';
import AlertPopup from './components/AlertPopup';
import Navbar from './components/Navbar';
import CreatorPage from './components/CreatorPage';
import Credits from './components/Credits';
import TermsPage from './components/TermsPage';

const App = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertClosed, setIsAlertClosed] = useState(false);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [page, setPage] = useState('home');

  useEffect(() => {
    if (page === 'home') {
      const hash = window.location.hash;
      if (hash) {
          const timer = setTimeout(() => {
              const element = document.querySelector(hash);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
          return () => clearTimeout(timer);
      }
    }
  }, [page]);


  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setIsAlertClosed(true);
  };

  const handleNavigate = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  
  const handleIntroFinish = () => {
    setIsIntroFinished(true);
    // Ensure the user is at the top of the page after the intro finishes.
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleVenueVisible = () => {
    if (!isAlertClosed && isIntroFinished) {
      setIsAlertVisible(true);
    }
  };

  if (page === 'creator') {
    return <CreatorPage onNavigate={() => handleNavigate('home')} />;
  }

  if (page === 'terms') {
    return <TermsPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} />
      <>
        <Hero 
          onIntroFinish={handleIntroFinish} 
          isIntroFinished={isIntroFinished} 
        />
        <div className="relative z-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Countdown />
            <Highlights />
            <Venue onVisible={handleVenueVisible} />
            <Menu />
            <Booking onNavigate={handleNavigate} />
            <Credits onNavigate={handleNavigate} />
          </div>
        </div>
        <Footer onNavigate={() => handleNavigate('creator')} />
        <AlertPopup isVisible={isAlertVisible} onClose={handleCloseAlert} onNavigate={handleNavigate} />
      </>
    </div>
  );
};

export default App;
