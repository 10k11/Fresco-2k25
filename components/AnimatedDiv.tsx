import React from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AnimatedDivProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    threshold?: number;
    staggerChildren?: number;
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, className, delay = 0, threshold = 0.1, staggerChildren }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
        threshold: threshold,
        triggerOnce: true,
    });

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: delay,
                staggerChildren: staggerChildren
            }
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedDiv;
