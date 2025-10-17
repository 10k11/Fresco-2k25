import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import AnimatedDiv from './AnimatedDiv';

const CountdownItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 rounded-2xl p-4 md:p-8 w-24 h-24 md:w-36 md:h-36 border border-emerald-500/30">
        <span className="text-4xl md:text-6xl font-bold font-orbitron text-emerald-400">{value < 0 ? 0 : value}</span>
        <span className="text-sm md:text-lg uppercase tracking-widest">{label}</span>
    </div>
);

const Countdown: React.FC = () => {
    const { days, hours, minutes, seconds } = useCountdown('2025-11-05T11:00:00');

    return (
        <section id="countdown" className="py-20 text-center">
            <AnimatedDiv threshold={0.3}>
                <h2 className="text-4xl font-bold font-orbitron mb-10 tracking-wide">The Wait is Almost Over</h2>
                <div className="flex justify-center items-center gap-4 md:gap-8">
                    <CountdownItem value={days} label="Days" />
                    <CountdownItem value={hours} label="Hours" />
                    <CountdownItem value={minutes} label="Minutes" />
                    <CountdownItem value={seconds} label="Seconds" />
                </div>
                <p className="mt-8 text-lg text-red-500 font-semibold border border-red-500 bg-red-500/10 px-4 py-2 rounded-lg inline-block">
                    Alcohol Strictly Prohibited
                </p>
            </AnimatedDiv>
        </section>
    );
};

export default Countdown;
