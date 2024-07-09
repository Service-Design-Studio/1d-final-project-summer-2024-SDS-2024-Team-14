// src/components/document_manager/dm_card.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, bgColor, iconColor, textColor, onClick, counts }) => {
  return (
    <div 
      className={`relative p-4 rounded-lg shadow-md ${bgColor} flex flex-col justify-between items-start h-48 w-full cursor-pointer`} 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} 
    >
      <div className="absolute top-2 right-2">
        <FontAwesomeIcon icon={faFolder} className={`text-2xl ${iconColor}`} />
      </div>
      <h2 className={`text-2xl font-bold ${textColor} mb-2`}>
        {title}
      </h2>
      <div className="w-full mt-2 mb-4">
        <p className="text-lg text-darkblue mb-2">Document Status:</p>
        <div className="flex justify-between w-full">
          <span className="text-xl font-bold text-mutedgreen">{counts.verified}</span>
          <span className="text-xl font-bold text-mutedyellow">{counts.pending}</span>
          <span className="text-xl font-bold text-mutedred">{counts.rejected}</span>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <a href="#" className="text-md font-bold text-blue-600 underline">View All &gt;</a>
      </div>
    </div>
  );
}

export default Card;


