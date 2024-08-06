// src/components/modalContent/phonedropdown.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full mt-8 z-50">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full p-3 mb-4 mt-12 border border-gray-300 rounded-lg text-darkblue font-bold text-2xl shadow-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options[selectedValue]}
          <svg
            className={`w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414l-4.293 4.293A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDropdown;
