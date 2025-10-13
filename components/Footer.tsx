import React from 'react';
import MusicPlayer from './MusicPlayer';

interface FooterProps {
    onNavigate: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-black border-t border-gray-800 py-6 px-4 sm:px-6 lg:px-8 text-gray-500">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} Fresco 2K25. All Rights Reserved.</p>
                    <p>An NGIT x KMEC Collaboration.</p>
                    <div className="text-xs mt-1 text-gray-600 flex items-center justify-center md:justify-start gap-2">
                        <span>Designed & Developed by <span className="text-gray-500 font-semibold">Navale Lokesh</span>.</span>
                        <button onClick={onNavigate} className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-semibold">(Know More)</button>
                    </div>
                </div>
                <MusicPlayer />
            </div>
        </footer>
    );
};

export default Footer;
