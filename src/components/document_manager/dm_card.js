import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, date, bgColor, iconColor, onClick }) => {
  // Define the counts directly within the Card component
  const counts = [
    { category: 'health', counts: { verified: 3, pending: 1, rejected: 0 } },
    { category: 'career', counts: { verified: 2, pending: 1, rejected: 1 } },
    { category: 'family', counts: { verified: 2, pending: 1, rejected: 1 } },
    { category: 'education', counts: { verified: 2, pending: 1, rejected: 1 } },
    { category: 'finance', counts: { verified: 2, pending: 1, rejected: 1 } },
    { category: 'property', counts: { verified: 2, pending: 1, rejected: 1 } },
    // Add more categories as needed with their corresponding counts
  ];

  // Find the counts for the specific category
  const categoryCounts = counts.find((item) => item.category === title.toLowerCase())?.counts;

  const handleClick = () => {
    if (onClick) {
      onClick(title);
    }
  };

  return (
    <div className={`relative p-4 sm:p-12 md:p-16 rounded-lg shadow-md ${bgColor} flex flex-col justify-center items-center cursor-pointer`} onClick={handleClick}>
      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <button className="text-gray-600 text-lg">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <FontAwesomeIcon icon={faFolder} className={`sm:text-2xl text-lg ${iconColor}`} />
      </div>
      <h2 className="text-lg sm:text-4xl font-semibold text-blue-600 text-center overflow-hidden whitespace-nowrap">
        {title}
      </h2>
      <div className="flex justify-center sm:gap-8 md:gap-8 gap-3 mt-3 w-full">
        {categoryCounts && (
          <>
            <div className="w-6 h-6 sm:h-8 sm:h-8 md:w-12 md:h-12 bg-mutedgreen rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.verified}</span>
            </div>
            <div className="w-6 h-6 sm:h-8 sm:h-8 md:w-12 md:h-12 bg-mutedyellow rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.pending}</span>
            </div>
            <div className="w-6 h-6 sm:h-8 sm:h-8 md:w-12 md:h-12 bg-mutedred rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.rejected}</span>
            </div> 
          </>
        )}
      </div>
    </div>
  );
}

export default Card;

//bg-purpleblue text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-darkpurple transition duration-300"


