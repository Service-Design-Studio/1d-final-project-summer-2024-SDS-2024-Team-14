// // src/components/dm_header.js
// import { faFolder } from "@fortawesome/free-solid-svg-icons";
// import "../styles/globals.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// function Header() {
//   return (
//     <header className="flex items-center justify-between mb-4">
//       <div className="flex items-center">
//         <button className="text-darkblue text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mr-2">
//           <FontAwesomeIcon icon="fas fa-folder"/>
//           <i className="fas fa-arrow-left"></i>
//         </button>
//         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-darkblue">Document Manager</h1>
//       </div>
//       <button className="text-darkblue text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
//         <i className="fas fa-cog"></i>
//       </button>
//     </header>
//   );
// }

// export default Header;

// src/components/dm_header.js
// components/Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const Header = ({ title, backButton = "/" }) => {
    title = title.charAt(0).toUpperCase() + title.slice(1)
  return (
    <header className="flex items-center justify-between mb-12">
      <Link href={backButton} className='text-blue-600'>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </Link>
      <h1 className="text-xl md:text-3xl font-bold text-darkblue font-bold">{title}</h1>
      <button className="text-blue-600">
        <FontAwesomeIcon icon={faCog} size="lg" />
      </button>
    </header>
  );
};

export default Header;


