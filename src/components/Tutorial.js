// src/components/Tutorial.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import CloseIcon from "../../public/images/tutorial/blueclose.svg"; // Import your close icon
import "../styles/globals.css"

const Tutorial = ({ title, steps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentImageIndex(0);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentImageIndex(0);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < steps[currentStep].images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0); // Reset to the first step when closing
    setCurrentImageIndex(0);
    if (typeof onClose === 'function') {
      onClose(); // Call the onClose function to close the modal
    } else {
      console.error('onClose is not a function');
    }
  };

  if (!steps || steps.length === 0) {
    return null; // or a fallback UI
  }

  const currentImages = steps[currentStep].images;
  const currentTexts = steps[currentStep].texts;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40">
      <div className="absolute inset-0 bg-default bg-opacity-50"></div> {/* Dimming effect */}
      <div className="relative flex flex-col bg-white rounded-xl w-[50vw] max-w-[50vw] h-[70vh] max-h-[70vh] mx-auto">
        <div className="flex h-full">
          <div className="w-1/4 flex flex-col justify-start rounded-tl-xl rounded-bl-xl" style={{ backgroundColor: '#F0F4FF' }}>
            <ul className="space-y-4 w-full font-semibold text-2xl">
              {steps.map((step, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCurrentStep(index);
                    setCurrentImageIndex(0);
                  }}
                  className={`cursor-pointer p-6 ${currentStep === index ? 'bg-darkblue text-white' : 'text-darkblue'} ${index === 0 ? 'rounded-tl-xl' : ''} ${index !== 0 && 'rounded-none'}`}
                  style={{
                    backgroundColor: currentStep === index ? '#405DB5' : '#F0F4FF',
                  }}
                >
                  {step.category}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 p-8 flex flex-col justify-between relative">
            <button onClick={handleClose} className="absolute top-0 right-0 mt-4 mr-4">
              <Image src={CloseIcon} alt="Close" className="w-10 h-10" />
            </button>
            <h1 className="block text-3xl mb-8 font-bold text-center text-darkblue">
              {steps[currentStep].title}
            </h1>
            <div className="flex justify-center items-center h-[40vh] mb-8 relative">
              <Image
                src={currentImages[currentImageIndex]}
                alt="Step Image"
                className="max-h-[40vh] w-auto rounded-lg"
                width={800}
                height={600}
              />
            </div>
            <div className="flex justify-center items-center my-4">
              {currentImages.length > 1 ? (
                currentImages.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${index === currentImageIndex ? 'bg-darkblue' : 'bg-gray-300'}`}
                    style={{ backgroundColor: index !== currentImageIndex ? '#E0E0E0' : '' }}
                  />
                ))
              ) : (
                <span className="h-2 w-2 mx-1" style={{ visibility: 'hidden' }} />
              )}
            </div>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-darkblue text-xl mb-12 px-20 text-center leading-tight max-h-[13vh] overflow-auto">
                {currentTexts[currentImageIndex]}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="bg-transparent border-none cursor-pointer text-[1em] text-darkblue flex items-center"
                >
                  <span className="mr-1 text-lg">&larr;</span>
                  Back
                </button>
              )}
              {currentImageIndex < currentImages.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="bg-transparent border-none cursor-pointer text-[1rem] text-darkblue flex items-center ml-auto"
                >
                  Next <span className="ml-1 text-lg">&rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Tutorial.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      texts: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired, // Ensure this is defined
};

export default Tutorial;
