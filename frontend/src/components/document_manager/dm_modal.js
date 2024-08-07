// src/Modal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faQrcode } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";


const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-0 right-0 flex justify-center">
      <div id='popupmenu' className="popupmenu bg-white rounded-xl py-2 w-3/5 max-w-md relative shadow-xl border-[#B0B0B0]/50 border-2">
        <button className="md:text-[1.3vw] text-[7vw] absolute top-0 right-4 md:top-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <div className="space-y-4">
          <div className="text-lg font-bold text-center text-purpleblue">Upload</div>
          <Link href={`/documents/upload`} id="files" className="files w-full py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faFile} className="mr-2" /> {/* File Icon */}
            Files
          </Link>
          <Link href={`/documents/scanner`} id="scanner" className="scanner dw-full py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faQrcode} className="mr-2" /> {/* Category Icon */}
            Scan Document
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;







