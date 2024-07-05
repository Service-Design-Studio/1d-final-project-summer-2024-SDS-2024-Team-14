// src/components/document_manager/dm_card.js
import React from 'react';
import CardHeader from './dm_cardheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEllipsisV } from '@fortawesome/free-solid-svg-icons';


// const Card = ({ bgColor, iconColor, title, date }) => {
//   return (
//     <div className={`p-4 rounded-lg flex flex-col ${bgColor}`}>
//       <CardHeader iconColor={iconColor} />
//       <FontAwesomeIcon icon={faFolder} color={iconColor} size="2x" />
//       <h2 className={`text-xl font-semibold ${iconColor}`}>{title}</h2>
//       <p className={`text-base ${iconColor}`}>{date}</p>
//     </div>
//   );
// };

// export default Card;

const Card = ({ title, date, bgColor, iconColor }) => {
  return (
    <div className={`relative p-4 sm:p-6 md:p-8 rounded-lg shadow-md ${bgColor} flex flex-col justify-center items-center`}>
      <div className="absolute top-4 left-4">
        <button className="text-gray-600 text-lg"> {/* Adjusted icon size */}
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <FontAwesomeIcon icon={faFolder} className={`text-2xl ${iconColor}`} /> {/* Adjusted icon size */}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-blue-600 text-center mt-12 overflow-hidden whitespace-nowrap"> {/* Adjusted text size */}
        {title}
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-600 text-center overflow-hidden whitespace-nowrap"> {/* Adjusted text size */}
        {date}
      </p>
    </div>
  );
}

export default Card;