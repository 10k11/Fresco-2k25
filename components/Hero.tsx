import React, { useState, useEffect } from 'react';
import IntroAnimation from './IntroAnimation';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import PassesSold from './PassesSold';

interface HeroProps {
    onIntroFinish: () => void;
    isIntroFinished: boolean;
}

// Files placed in the project's `public/` folder are served from the root path.
// Use '/hero.jpg' (not 'public/hero.jpg') so Vite can load it correctly.
const HERO_IMAGE_URL = '/images/hero.png';

const Hero: React.FC<HeroProps> = ({ onIntroFinish, isIntroFinished }) => {
    // Show runtime errors on screen to diagnose blank page issues
    const [runtimeError, setRuntimeError] = useState<string | null>(null);

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = HERO_IMAGE_URL;

        const handleLoad = () => {
            setImageUrl(HERO_IMAGE_URL);
            setIsLoading(false);
        };

        const handleError = () => {
            setError("Failed to load hero image.");
            // Fallback background in case of error (served from public/ as /images/download.jpg)
            setImageUrl('/images/hero.png');
            setIsLoading(false);
        };
        
        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);

        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
        };
    }, []);
    
    useEffect(() => {
        if (!isLoading && imageUrl) {
            const timer = setTimeout(() => setStartAnimation(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, imageUrl]);
    
    const handleIntroComplete = () => {
        setShowIntro(false);
        onIntroFinish();
    };

    const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
    };

    useEffect(() => {
        console.log('Hero mounted');
        const handleErr = (ev: any) => {
            // support both error and unhandledrejection shapes
            const msg = ev?.message ?? ev?.reason?.message ?? String(ev);
            setRuntimeError(msg);
            console.error('Runtime error captured in Hero:', ev);
        };
        window.addEventListener('error', handleErr as EventListener);
        window.addEventListener('unhandledrejection', handleErr as EventListener);

        return () => {
            window.removeEventListener('error', handleErr as EventListener);
            window.removeEventListener('unhandledrejection', handleErr as EventListener);
        };
    }, []);

    return (
        <>
            {showIntro && <IntroAnimation onComplete={handleIntroComplete} isLoading={isLoading} />}
            {/* Error overlay to make runtime errors visible instead of a blank screen */}
            {runtimeError && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-6">
                    <div className="max-w-xl w-full bg-gray-900 text-white p-6 rounded-lg border border-red-500">
                        <h3 className="text-xl font-bold mb-2">Runtime error detected</h3>
                        <pre className="text-sm whitespace-pre-wrap break-words">{runtimeError}</pre>
                        <p className="mt-3 text-sm text-gray-300">Open the browser console for stack trace and file/line.</p>
                    </div>
                </div>
            )}

            <div className="h-screen relative flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
                    style={imageUrl ? backgroundStyle : {}}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
                </div>

                {!isLoading && imageUrl && <ParticleBackground />}

                {isLoading && (
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg font-orbitron tracking-widest">Loading Experience...</p>
                    </div>
                )}

               
                {!isLoading && imageUrl && (
                    <motion.div
                        className="relative z-10 p-4 flex flex-col items-center"
                        initial="hidden"
                        animate={startAnimation ? "visible" : "hidden"}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.25
                                }
                            }
                        }}
                    >
                        {/* Subheading */}
                        <motion.h2
                            className="text-xl md:text-2xl font-medium tracking-wide text-gray-400 uppercase"
                            variants={{
                                hidden: { opacity: 0, y: 60 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
                            }}
                        >
                            NGIT x KMEC
                        </motion.h2>

                        {/* Main heading */}
                        <motion.h1
                            className="text-7xl sm:text-6xl md:text-7xl font-extrabold my-4 text-emerald-400"
                            style={{
                                filter: 'drop-shadow(0 0 8px #39FF14)'
                            }}
                            variants={{
                                hidden: { opacity: 0, scale: 0.6, y: 80 },
                                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
                            }}
                            whileHover={{
                                scale: 1.05,
                                textShadow: "0 0 24px #39FF14"
                            }}
                        >
                            Fresco 2K25
                        </motion.h1>

                        {/* Event details */}
                       {/* Venue + Date + Time */}
<div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-3 text-base md:text-lg font-medium text-gray-300">
  
  {/* Venue */}
  <a
    href="https://www.google.com/maps/search/?api=1&query=Taberna+Club+and+Kitchen"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-white/5 hover:bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-pink-400/40 transition-all duration-300 hover:scale-[1.03]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
    </svg>
    <span>
      Venue: <span className="text-white font-semibold hover:underline">TABERNA Club & Kitchen</span>
    </span>
  </a>

  {/* Date */}
  <div className="flex items-center gap-2 bg-white/5 hover:bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 transition-all duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <span>
      Date: <span className="text-white font-semibold">5th November, 2025</span>
    </span>
  </div>

  {/* Time */}
  <div className="flex items-center gap-2 bg-white/5 hover:bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 transition-all duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>
      Time: <span className="text-white font-semibold">11:00 AM – 4:00 PM</span>
    </span>
  </div>
</div>
<br />
                        {/* Animated Price Section with Glass Card */}
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                          className="cursor-pointer flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-gray-700 shadow-md max-w-xs mx-auto transition-transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-400/50"
                          onClick={() => {
                            const el = document.getElementById('event-highlights');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {/* Main Price */}
                          <motion.span
                            initial={{ scale: 0.95 }}
                            animate={{ scale: [1.05, 1, 1.05] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-2xl md:text-3xl font-extrabold text-emerald-400 drop-shadow-[0_0_12px_#39FF14]"
                          >
                            ₹1,199
                          </motion.span>

                          {/* Previous Price Below with Bigger Strikethrough */}
                          <span className="text-gray-300 text-lg md:text-xl mt-2 line-through decoration-2 decoration-red-500 font-semibold">
                            ₹1,399
                          </span>

                          {/* Offer Text */}
                          <p className="text-yellow-400 mt-2 animate-pulse font-semibold text-sm md:text-base">
                            Limited-time offer 🔥
                          </p>
                        </motion.div>

                        {/* Passes sold widget — ensure visibility */}
                        <div className="mt-8 w-full flex justify-center">
                          <PassesSold sold={49} total={100} />
                        </div>

                    </motion.div>
                    
                )}
                
                {!isLoading && (
                    <div className="absolute bottom-10 animate-bounce">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                )}
            </div>
        </>
    );
};

export default Hero;
