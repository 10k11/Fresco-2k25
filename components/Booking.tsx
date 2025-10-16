
import React from 'react';
import { CalendarIcon, PhoneIcon } from './icons';
import AnimatedDiv from './AnimatedDiv';

const Booking = ({ onNavigate }) => {
    return (
        <section id="booking" className="py-20 text-center">
            <AnimatedDiv threshold={0.2}>
                <h2 className="text-4xl font-bold font-orbitron mb-6">Don't Miss Out!</h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Secure your spot for an unforgettable experience. Passes are limited!</p>
            </AnimatedDiv>
            
            <AnimatedDiv threshold={0.2} delay={0.1}>
                <button 
                    onClick={() => onNavigate('terms')}
                    className="inline-block bg-emerald-500 text-black font-bold text-2xl px-12 py-4 rounded-lg hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30">
                    Book Your Pass
                </button>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
                    <a
                        href="https://www.google.com/calendar/render?action=TEMPLATE&text=Fresco%202K25&dates=20251102T110000/20251102T170000&ctz=Asia/Kolkata&details=Join%20us%20for%20Fresco%202K25%2C%20a%20premier%20non-alcoholic%20event%20hosted%20by%20NGIT%20x%20KMEC.%20Alcohol%20is%20strictly%20prohibited.&location=NICOS%20Cafe%20Lounge%20Bar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-emerald-400 border border-emerald-500/50 px-6 py-3 rounded-lg hover:bg-emerald-500/20 transition-colors duration-300">
                        <CalendarIcon className="w-5 h-5 mr-3" />
                        <span>Add to Calendar</span>
                    </a>
                </div>
            </AnimatedDiv>

            <AnimatedDiv threshold={0.2} delay={0.2} className="mt-16 border-t border-gray-700 pt-10">
                <h3 className="text-3xl font-bold font-orbitron mb-8">Contact Us</h3>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-lg">
                    <a href="tel:+917416439810" className="flex items-center hover:text-emerald-400 transition-colors">
                        <PhoneIcon className="w-5 h-5 mr-2" />
                        <span>Ngit Coordinator : 7416439810</span>
                    </a>
                    <a href="tel:+916301785105" className="flex items-center hover:text-emerald-400 transition-colors">
                         <PhoneIcon className="w-5 h-5 mr-2" />
                        <span>KMEC Coordinator: 6301785105</span>
                    </a>
                </div>
            </AnimatedDiv>
        </section>
    );
};

export default Booking;
