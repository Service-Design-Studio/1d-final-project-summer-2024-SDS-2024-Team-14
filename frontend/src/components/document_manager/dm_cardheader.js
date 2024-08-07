// // src/components/document_manager/dm_cardheader.js
// // import '@fortawesome/fontawesome-free/css/all.min.css';
// import "../../styles/globals.css"

// function CardHeader({ title, date, color }) {
//   return (
//     <div className="relative flex flex-col items-center mb-2">
//       <button className="absolute top-0 right-0 text-gray-600">
//         <i className="fas fa-ellipsis-v"></i>
//       </button>
//       <i className={`fas fa-folder text-${color}-600 text-4xl mb-2`}></i>
//       <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-${color}-600`}>{title}</h2>
//       <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-${color}-600`}>{date}</p>
//     </div>
//   );
// }

// export default CardHeader;

// src/components/document_manager/dm_cardheader.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const CardHeader = ({ iconColor }) => {
  return (
    <div className="flex justify-between items-start mb-2">
      <FontAwesomeIcon icon={faEllipsisV} color={iconColor} />
    </div>
  );
};

export default CardHeader;









