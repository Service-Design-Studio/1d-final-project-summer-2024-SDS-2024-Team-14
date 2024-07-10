// // src/components/document_manager/dm_footer.js
// // import '@fortawesome/fontawesome-free/css/all.min.css';
// import "../../styles/globals.css"

// function Footer() {
//   return (
//     <footer className="bg-white flex justify-around items-center p-4">
//       <button className="text-gray-600">
//         <i className="fas fa-bell"></i>
//       </button>
//       <button className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
//         <i className="fas fa-plus"></i>
//       </button>
//       <button className="text-gray-600">
//         <i className="fas fa-check"></i>
//       </button>
//     </footer>
//   );
// }

// export default Footer;

// src/components/document_manager/dm_footer.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from './dm_modal'; // Ensure the correct path to Modal component
import '../../styles/globals.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <footer className="custom-shadow bg-white p-4 border-t border-white shadow-xl z-10 absolute bottom-0 left-0 w-full">
        <div className="flex justify-around items-center mx-auto max-w-7xl">
          <button className="text-gray-600">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button 
            className="bg-purpleblue text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg- transition duration-300"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="text-gray-600">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </footer>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};


export default Footer;



