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
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white flex justify-around items-center p-4">
      <button className="text-gray-600">
        <FontAwesomeIcon icon={faBell} />
      </button>
      <button className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button className="text-gray-600">
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </footer>
  );
};

export default Footer;

