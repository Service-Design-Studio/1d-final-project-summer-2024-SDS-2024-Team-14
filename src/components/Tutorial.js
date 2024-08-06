// src/components/Tutorial.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import CloseIcon from "../../public/images/tutorial/blueclose.svg"; // Import your close icon
import "../styles/globals.css"

const Tutorial = ({ title, steps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <div className="relative flex flex-col bg-white rounded-xl w-full lg:w-[70vw] h-[80vh] max-h-[80vh] mx-8 lg:mx-0">
        <div className="flex h-full">
          {isLargeScreen ? (
            <div className="w-1/4 flex flex-col justify-start rounded-tl-xl rounded-bl-xl bg-[#F0F4FF]">
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
          ) : null}
          <div className="w-full lg:w-3/4 p-4 lg:p-8 flex flex-col justify-between relative">
            <button onClick={handleClose} className="absolute top-0 right-0 mt-4 mr-4">
              <Image src={CloseIcon} alt="Close" className="w-10 h-10" />
            </button>
            {!isLargeScreen && (
              <select
                value={currentStep}
                onChange={(e) => {
                  setCurrentStep(parseInt(e.target.value));
                  setCurrentImageIndex(0);
                }}
                className="block w-full p-2 mb-4 mt-12 border border-gray-300 rounded text-darkblue font-bold text-3xl"
              >
                {steps.map((step, index) => (
                  <option key={index} value={index}>
                    {step.category}
                  </option>
                ))}
              </select>
            )}
            {isLargeScreen && (
              <h1 className="block text-3xl lg:mb-8 font-bold text-center text-darkblue">
                {steps[currentStep].title}
              </h1>
            )}
            <div className="flex justify-center items-center h-[45vh] lg:mb-8 relative">
              <Image
                src={currentImages[currentImageIndex]}
                alt="Step Image"
                className="max-h-[45vh] w-auto rounded-lg"
                width={800}
                height={600}
              />
            </div>
            <div className="flex justify-center items-center mb-4 lg:mt-4 lg:mb-8">
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
              <div className="text-darkblue text-xl mb-12 lg:px-20 text-center leading-tight max-h-[13vh] overflow-auto">
                <p className="min-h-[13vh]">{currentTexts[currentImageIndex]}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 flex justify-between items-center rounded-xl">
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
