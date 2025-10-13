import React, { useState, useEffect } from 'react';
import IntroAnimation from './IntroAnimation';
import ParticleBackground from './ParticleBackground';
import { Page } from '../App';

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
            setImageUrl('/Fresco-2k25/images/hero.png');
            setIsLoading(false);
        };
        
        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);

        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
        };
    }, []);
    
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
                    <div className="relative z-10 p-4 flex flex-col items-center">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-widest font-orbitron text-gray-300">
                            NGIT x KMEC
                        </h2>
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black my-4 font-orbitron text-emerald-400 animate-pulse"
                            style={{
                                filter: 'drop-shadow(0 0 2px #39FF14) drop-shadow(0 0 10px #39FF14) drop-shadow(0 0 20px #39FF14)'
                            }}>
                            Fresco 2K25
                        </h1>
                        <div className="text-xl md:text-2xl font-semibold tracking-wider bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                            <p>NICOS Cafe Lounge Bar</p>
                            <p className="text-lg">2nd Nov, 11 AM Onwards</p>
                        </div>
                    </div>
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
