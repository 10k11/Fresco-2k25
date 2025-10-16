import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface PassesSoldProps {
  sold: number;
  total: number;
}

const PassesSold: React.FC<PassesSoldProps> = ({ sold, total }) => {
  // Animate the sold number from 0 to the given value
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: sold },
    config: { tension: 180, friction: 12 },
  });

  // Pulse animation for "Hurry!" text
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setPulse((prev) => !prev), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="passes-sold" className="py-10 text-center">
      <div className="flex justify-center items-center gap-4 md:gap-8">
        {/* Sold Passes */}
        <div className="flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 rounded-2xl p-4 md:p-8 w-24 h-24 md:w-36 md:h-36 border border-emerald-400/30 animate-pulse">
          <animated.span className="text-4xl md:text-6xl font-bold font-orbitron text-emerald-400">
            {number.to((n) => Math.floor(n))}
          </animated.span>
          <span className="text-sm md:text-lg uppercase tracking-widest text-white">Sold</span>
        </div>

        {/* Total Passes */}
        <div className="flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 rounded-2xl p-4 md:p-8 w-24 h-24 md:w-36 md:h-36 border border-emerald-400/30">
          <span className="text-4xl md:text-6xl font-bold font-orbitron text-emerald-400">{100}</span>
          <span className="text-sm md:text-lg uppercase tracking-widest text-white">Total</span>
        </div>
      </div>

      {/* Hurry Text */}
      <p
        className={`mt-8 text-lg font-semibold border border-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-lg inline-block transition-all duration-300 ${
          pulse ? 'scale-105 text-yellow-300 shadow-lg' : 'scale-100 text-yellow-400 shadow-none'
        }`}
      >
        Hurry! Limited passes available.
      </p>
    </section>
  );
};

export default PassesSold;
