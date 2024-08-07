import React from 'react';

const DocumentCard = ({ document, onClick = () => {} }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
      onClick={() => onClick(document)}
    >
      <h2 className="text-lg font-semibold mb-2">{document.name}</h2>
      <p className={`text-${document.status === 'verified' ? 'green' : document.status === 'pending' ? 'yellow' : 'red'}-500`}>
        Status: {document.status}
      </p>
    </div>
  );
};

export default DocumentCard;

