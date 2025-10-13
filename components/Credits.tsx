import React from 'react';
import { Page } from '../App';
import AnimatedDiv from './AnimatedDiv';

interface CreditsProps {
    onNavigate: (page: Page) => void;
}

const Credits: React.FC<CreditsProps> = ({ onNavigate }) => {
    return (
        <section id="credits" className="py-16 text-center">
            <AnimatedDiv threshold={0.3}>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-lg text-gray-300">
                        Designed & Developed By <br />
                        <span className="font-bold text-emerald-400 tracking-wider font-orbitron">Navale Lokesh</span>
                    </p>
                    <button
                        onClick={() => onNavigate('creator')}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-semibold mt-1"
                    >
                        (Know More)
                    </button>
                </div>
            </AnimatedDiv>
        </section>
    );
};

export default Credits;
