// src/Modal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faQrcode } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div id='popupmenu' className="bg-white rounded-lg p-6 w-3/5 max-w-md relative shadow-lg">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <div className="space-y-4">
          <div className="text-lg font-bold text-center text-purpleblue">Upload</div>
          <button id='files' className="w-full py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faFile} className="mr-2" /> {/* File Icon */}
            Files
          </button>
          <button id='scan' className="w-full py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faQrcode} className="mr-2" /> {/* Upload Icon */}
            Scan Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;







