import React from 'react';
import CardHeader from './dm_cardheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, date, bgColor, iconColor }) => {
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

  return (
    <div className={`relative p-4 sm:p-6 md:p-8 rounded-lg shadow-md ${bgColor} flex flex-col justify-center items-center`}>
      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <button className="text-gray-600 text-lg">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <FontAwesomeIcon icon={faFolder} className={`sm:text-2xl text-lg ${iconColor}`} />
      </div>
      <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold text-blue-600 text-center overflow-hidden whitespace-nowrap">
        {title}
      </h2>
      <p className="text-md sm:text-xl md:text-2xl lg:text-1xl xl:text-1xl text-blue-600 text-center overflow-hidden whitespace-nowrap">
        {date}
      </p>
      <div className="flex justify-center gap-5 mt-3">
        {categoryCounts && (
          <>
            <div className="w-10 h-10 bg-mutedgreen rounded-full relative flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.verified}</span>
            </div>
            <div className="w-10 h-10 bg-mutedyellow rounded-full relative flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.pending}</span>
            </div>
            <div className="w-10 h-10 bg-mutedred rounded-full relative flex items-center justify-center">
              <span className="text-white font-bold">{categoryCounts.rejected}</span>
            </div> 
          </>
        )}
      </div>
    </div>
  );
}

export default Card;




