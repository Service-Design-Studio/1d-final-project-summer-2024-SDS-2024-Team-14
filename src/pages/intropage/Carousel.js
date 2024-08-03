// src/pages/intropage/Carousel.js
import React from 'react';
import slides from './slides';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ currentSlide, setCurrentSlide }) => {
    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handleBack = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative mx-auto text-center">
            <div className="w-full h-auto rounded-lg overflow-hidden">
                <Image
                    src={slides[currentSlide].image}
                    alt="Slide Image"
                    id="slide-image"
                    className="w-auto h-auto max-w-full max-h-full"
                    width={600}  // Set the desired width
                    height={400}  // Set the desired height
                />
            </div>
            <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
                <p id="slide-text" className="text-gray-600">{slides[currentSlide].text}</p>
            </div>
            <button onClick={handleBack} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className="flex justify-center mt-4">
                {slides.map((_, index) => (
                    <span key={index} className={`dot h-3 w-3 bg-gray-300 rounded-full mx-1 ${index === currentSlide ? 'bg-gray-700' : ''}`} />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
