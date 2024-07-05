// src/components/document_manager/dm_card.js
// import CardHeader from './dm_cardheader';
// import "../../styles/globals.css"

// function Card({ title, date, color }) {
//  return (
//    <div className={`bg-${color}-100 p-4 rounded-lg flex flex-col relative`}>
//      <CardHeader title={title} date={date} color={color} />
//    </div>
//  );
//}

//export default Card;


// src/components/document_manager/dm_card.js
import React from 'react';
import CardHeader from './dm_cardheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Card = ({ bgColor, iconColor, title, date }) => {
  return (
    <div className={`p-4 rounded-lg flex flex-col ${bgColor}`}>
      <CardHeader iconColor={iconColor} />
      <FontAwesomeIcon icon={faFolder} color={iconColor} size="2x" />
      <h2 className={`text-xl font-semibold ${iconColor}`}>{title}</h2>
      <p className={`text-base ${iconColor}`}>{date}</p>
    </div>
  );
};

export default Card;

