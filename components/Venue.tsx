import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import Map from './Map';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import AnimatedDiv from './AnimatedDiv';
import ImageModal from './ImageModal';

const ReviewCard: React.FC<{ name: string; review: string; rating: number }> = ({ name, review, rating }) => (
  <div className="bg-black p-4 rounded-lg border border-gray-700">
    <div className="flex items-center mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} />
        ))}
      </div>
      <h4 className="ml-3 font-bold text-lg">{name}</h4>
    </div>
    <p className="text-gray-400">"{review}"</p>
  </div>
);

const venueImages = [
    {
        src: '/Fresco-2k25/images/Screenshot 2025-10-12 171854.png',
        alt: 'The exterior of NICOS Cafe Lounge Bar at night, with modern architecture and glowing signs.'
    },
    {
        src: '/Fresco-2k25/images/Screenshot 2025-10-12 171926.png',
        alt: 'Stylish interior of NICOS with comfortable seating and ambient lighting.'
    },
    {
        src: '/Fresco-2k25/images/Screenshot 2025-10-12 171941.png',
        alt: 'A view of the elegant bar and lounge area inside NICOS.'
    },
    {
        src: '/Fresco-2k25/images/Screenshot 2025-10-12 171954.png',
        alt: 'A vibrant seating area inside NICOS, perfect for groups.'
    }
];


interface VenueProps {
  onVisible: () => void;
}

const Venue: React.FC<VenueProps> = ({ onVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? venueImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === venueImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Coordinates for NICOS Cafe Lounge Bar
  // Source: Google Maps
  const venueLocation = {
    lat: 17.4339,
    lng: 78.4024,
  };

  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (isVisible) {
      onVisible();
    }
  }, [isVisible, onVisible]);

  return (
    <>
      <section id="venue" className="py-20 overflow-hidden" ref={sectionRef}>
        <AnimatedDiv threshold={0.2}>
          <h2 className="text-4xl font-bold text-center font-orbitron mb-12 tracking-wide">The Venue</h2>
        </AnimatedDiv>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedDiv>
            <h3 className="text-3xl font-bold text-emerald-400 mb-4">NICOS Cafe Lounge Bar</h3>
            
            {/* Image Gallery */}
            <div className="relative h-[300px] sm:h-[450px] w-full max-w-3xl mx-auto mb-8 rounded-lg overflow-hidden shadow-2xl group">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentIndex}
                  src={venueImages[currentIndex].src}
                  alt={venueImages[currentIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(currentIndex)}
                />
              </AnimatePresence>

              {/* Left Arrow */}
              <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Previous image">
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              {/* Right Arrow */}
              <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Next image">
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {venueImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-emerald-400' : 'bg-gray-500/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <h4 className="text-2xl font-bold mb-4">Google Reviews</h4>
            <div className="space-y-4">
              <ReviewCard name="Rahul K." review="Amazing ambiance and fantastic mocktails! A perfect place for a great night out without alcohol." rating={5} />
              <ReviewCard name="Priya S." review="Loved the energy and the music. The interiors are stunning. Highly recommended." rating={5} />
            </div>
          </AnimatedDiv>
          <AnimatedDiv delay={0.2}>
            <Map lat={venueLocation.lat} lng={venueLocation.lng} />
          </AnimatedDiv>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={venueImages[currentIndex].src}
        imageAlt={venueImages[currentIndex].alt}
      />
    </>
  );
};

export default Venue;