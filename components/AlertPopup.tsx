import React from 'react';

interface AlertPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ isVisible, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full max-w-lg bg-gray-900 border border-emerald-500/50 rounded-lg shadow-2xl p-8 transform transition-all duration-300 ease-out text-center
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close alert"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <h3 className="font-orbitron text-3xl font-bold text-white mb-4">
          Event Passes Are Selling Out Fast!
        </h3>
        <p className="text-gray-300 text-lg mb-8">
          Limited passes available. Secure your spot now.
        </p>
        <a
          href="https://forms.gle/JtL1PDNHg4NMV4AA9"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full block bg-emerald-500 text-black font-bold py-3 px-6 rounded-lg text-xl hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default AlertPopup;