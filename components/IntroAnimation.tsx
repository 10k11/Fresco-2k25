import React from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
    onComplete: () => void;
    isLoading: boolean;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, isLoading }) => {
    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
                <div className="text-center">
                    <motion.h2
                        className="text-3xl md:text-5xl font-orbitron text-gray-300 tracking-widest"
                        style={{ textShadow: '0 0 8px rgba(200, 200, 200, 0.5)' }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        NGIT x KMEC
                    </motion.h2>
                    <motion.h1
                        className="text-7xl sm:text-8xl md:text-9xl font-black font-orbitron text-emerald-400"
                        style={{ filter: 'drop-shadow(0 0 2px #39FF14) drop-shadow(0 0 10px #39FF14) drop-shadow(0 0 20px #39FF14)' }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                        Fresco 2K25
                    </motion.h1>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3.5, duration: 1, ease: 'easeIn' }}
            onAnimationComplete={onComplete}
        >
            <div className="text-center">
                <motion.h2
                    className="text-3xl md:text-5xl font-orbitron text-gray-300 tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: 2.5,
                        times: [0, 0.4, 0.6, 1], // Fade in (40%), stay (20%), fade out (40%)
                        ease: 'easeInOut',
                    }}
                    style={{
                        textShadow: '0 0 8px rgba(200, 200, 200, 0.5)'
                    }}
                >
                    NGIT x KMEC
                </motion.h2>
                <motion.h1
                    className="text-7xl sm:text-8xl md:text-9xl font-black font-orbitron text-emerald-400"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 2,
                        duration: 1,
                        ease: 'easeOut'
                    }}
                    style={{
                        filter: 'drop-shadow(0 0 2px #39FF14) drop-shadow(0 0 10px #39FF14) drop-shadow(0 0 20px #39FF14)',
                    }}
                >
                    Fresco 2K25
                </motion.h1>
            </div>
            <motion.div
                className="absolute bottom-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
                <p className="text-sm text-gray-300">
                    Designed & Developed By <span className="font-bold text-emerald-400 tracking-wider font-orbitron">Navale Lokesh</span>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default IntroAnimation;