import React, { useState, useEffect } from 'react';
import IntroAnimation from './IntroAnimation';
import ParticleBackground from './ParticleBackground';
import { Page } from '../App';
import { motion } from 'framer-motion';

interface HeroProps {
    onIntroFinish: () => void;
    isIntroFinished: boolean;
}

// Files placed in the project's `public/` folder are served from the root path.
// Use '/hero.jpg' (not 'public/hero.jpg') so Vite can load it correctly.
const HERO_IMAGE_URL = '/images/hero.png';

const Hero: React.FC<HeroProps> = ({ onIntroFinish, isIntroFinished }) => {
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

    return (
        <>
            {showIntro && <IntroAnimation onComplete={handleIntroComplete} isLoading={isLoading} />}
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
                        <motion.div
                            className="text-base md:text-lg font-medium tracking-wide bg-black bg-opacity-30 px-4 py-2 rounded-md text-gray-200 text-center"
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
                            }}
                        >
                            <p>NICOS Cafe Lounge Bar</p>
                            <p>2nd Nov, 11 AM Onwards</p>
                        </motion.div>
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
