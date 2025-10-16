import React from 'react';
import { motion } from 'framer-motion';
import AnimatedDiv from './AnimatedDiv';
import { MdMusicNote, MdSportsEsports } from 'react-icons/md';
import { FaHeadphones } from 'react-icons/fa';
import { GiHighHeel } from 'react-icons/gi'; // Add this import

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

const HighlightCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <motion.div 
        variants={cardVariants}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-emerald-500 hover:bg-gray-800 transition-colors duration-300 ease-out text-center h-full">
        <div className="text-emerald-400 w-16 h-16 mx-auto mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 font-orbitron">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </motion.div>
);

const Highlights: React.FC = () => {
    const eventHighlights = [
        {
            icon: <GiHighHeel size={48} />, // Use high heel icon for Ramp Walk
            title: "Ramp Walk",
            description: "Showcase your style on the grand stage.",
        },
        {
            icon: <FaHeadphones size={48} />,
            title: "Live DJ",
            description: "Groove to the electrifying beats",
        },
        {
            icon: <MdMusicNote size={48} />,
            title: "Music Performances",
            description: "Enjoy captivating live music acts.",
        },
        {
            icon: <MdSportsEsports size={48} />,
            title: "Interactive Games",
            description: "Participate in fun games and enjoy",
        },
    ];

    return (
        <section id="highlights" className="py-20">
            <AnimatedDiv threshold={0.3} className="text-center">
                 <h2 className="text-4xl font-bold font-orbitron mb-12 tracking-wide">Event Highlights</h2>
            </AnimatedDiv>
            <AnimatedDiv 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                threshold={0.2}
                staggerChildren={0.1}
            >
                {eventHighlights.map((highlight, index) => (
                    <HighlightCard 
                        key={index} 
                        {...highlight} 
                    />
                ))}
            </AnimatedDiv>
        </section>
    );
};

export default Highlights;
