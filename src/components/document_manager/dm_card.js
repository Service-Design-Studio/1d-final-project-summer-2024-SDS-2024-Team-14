// src/components/document_manager/dm_card.js
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
      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <button className="text-gray-600 text-lg"> {/* Adjusted icon size */}
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <FontAwesomeIcon icon={faFolder} className={`sm:text-2xl text-lg ${iconColor}`} /> {/* Adjusted icon size */}
      </div>
      <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold text-blue-600 text-center overflow-hidden whitespace-nowrap"> {/* Adjusted text size */}
        {title}
      </h2>
      <p className="text-md sm:text-xl md:text-2xl lg:text-1xl xl:text-1xl text-blue-600 text-center overflow-hidden whitespace-nowrap"> {/* Adjusted text size */}
        {date}
      </p>
    </div>
  );
}

export default Card;


