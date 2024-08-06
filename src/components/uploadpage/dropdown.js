import React, { useState } from 'react';
import Image from 'next/image';
import DropdownArrow from "../../../public/images/icons/dropdown.svg"

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex items-center w-full px-4 py-2 text-[0.9vw] font-bold text-darkblue"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          in &quot;${uploadCategory}&quot;
          <div className='pl-2'>
            <Image src={DropdownArrow} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Health
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Career
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Education
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Family
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Finance
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-[0.9vw] hover:bg-lightblue"
              role="menuitem"
            >
              Property
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
