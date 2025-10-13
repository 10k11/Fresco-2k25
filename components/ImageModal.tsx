import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    imageAlt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, imageAlt }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
                    >
                        <img src={imageUrl} alt={imageAlt} className="object-contain w-full h-full rounded-lg" />
                    </motion.div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-emerald-400 transition-colors"
                        aria-label="Close full-screen image view"
                    >
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;
