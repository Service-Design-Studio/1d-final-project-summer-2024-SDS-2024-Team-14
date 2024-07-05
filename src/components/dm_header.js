// src/components/dm_header.js
import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <button className="text-darkblue text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mr-2">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-darkblue">Document Manager</h1>
      </div>
      <button className="text-darkblue text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        <i className="fas fa-cog"></i>
      </button>
    </header>
  );
}

export default Header;
