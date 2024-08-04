// src/components/Tutorial.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import CloseIcon from "../../public/images/tutorial/blueclose.svg"; // Import your close icon
import "../styles/globals.css"

const Tutorial = ({ title, steps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleClose = () => {
    setCurrentStep(0); // Reset to the first step when closing
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex bg-white rounded-xl w-7/10 max-w-[70%] h-[90vh] mx-auto">
        <div className="w-1/4 flex flex-col justify-start rounded-tl-xl rounded-bl-xl" style={{ backgroundColor: '#F0F4FF' }}>
          {/* Adjust font size of content column here */}
          <ul className="space-y-4 w-full font-semibold text-2xl"> {/* Change text-lg to adjust the font size */}
            {steps.map((step, index) => (
              <li
                key={index}
                onClick={() => setCurrentStep(index)}
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
            <Image src={CloseIcon} alt="Close" className="w-10 h-10" /> {/* Increased the size */}
          </button>
          <h1 className="block text-3xl mb-4 font-bold text-center text-darkblue">
            {steps[currentStep].title}
          </h1>
          <Image
            src={steps[currentStep].image}
            alt="Step Image"
            className="h-[26vw] w-auto mx-auto rounded-lg"
            width={800}
            height={600}
          />
          <div className="flex justify-center items-center my-4">
            {steps.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${index === currentStep ? 'bg-darkblue' : 'bg-gray-300'}`} style={{ backgroundColor: index !== currentStep ? '#E0E0E0' : '' }}
              />
            ))}
          </div>
          <div className="flex-grow flex items-center justify-center">
            <p className="text-darkblue text-xl mb-12 px-20 text-center leading-tight max-h-[20vh] overflow-auto">
              {steps[currentStep].text}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="bg-transparent border-none cursor-pointer text-[1em] text-darkblue flex items-center" // Adjust text-lg to change the size of the Back button
              >
                <span className="mr-1 text-lg">&larr;</span> {/* Adjust text-xl to change the size of the arrow */}
                Back
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="bg-transparent border-none cursor-pointer text-[1rem] text-darkblue flex items-center ml-auto" // Adjust text-lg to change the size of the Next button
              >
                Next <span className="ml-1 text-lg">&rarr;</span> {/* Adjust text-xl to change the size of the arrow */}
              </button>
            )}
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
      image: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Tutorial;
