import React from 'react';
import { Page } from '../App';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons';

interface CreatorPageProps {
    onNavigate: (page: Page) => void;
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
    >
        {icon}
    </a>
);

const CreatorPage: React.FC<CreatorPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="container mx-auto max-w-2xl text-center">
                <h1 className="text-5xl md:text-6xl font-bold font-orbitron mb-8 tracking-wide text-emerald-400">
                    Navale Lokesh
                </h1>
                
                 <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
    Hi! I’m a <span className="text-emerald-400 font-semibold">second-year student at NGIT</span>,  
    passionate about <span className="text-emerald-400 font-semibold">web designing</span> and <span className="text-emerald-400 font-semibold">video editing</span>.  
    I love creating visually appealing and interactive digital experiences, whether it's designing modern websites or editing engaging videos.  
    Currently, I’m focused on improving my skills in <span className="text-emerald-400 font-semibold">frontend development</span>, <span className="text-emerald-400 font-semibold">graphic design</span>, and <span className="text-emerald-400 font-semibold">motion graphics</span>.
  </p>
  <br />

                <div className="flex justify-center items-center gap-8 mb-16">
                    <SocialLink href="https://github.com/LOKI1106" icon={<GithubIcon className="w-8 h-8" />} label="GitHub" />
                    <SocialLink href="https://in.linkedin.com/in/lokesh-navale" icon={<LinkedinIcon className="w-8 h-8" />} label="LinkedIn" />
                    <SocialLink href="https://www.instagram.com/lokii.i2p/" icon={<InstagramIcon className="w-8 h-8" />} label="Instagram" />
                </div>

                <button
                    onClick={() => onNavigate('home')}
                    className="bg-emerald-500 text-black font-bold text-xl px-10 py-3 rounded-lg hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
                >
                    Back to Event
                </button>
            </div>
        </div>
    );
};

export default CreatorPage;