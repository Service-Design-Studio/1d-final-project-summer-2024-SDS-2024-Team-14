import React, { useState, useEffect } from 'react';
import UploadDropdown from '../components/uploadpage/dropdown.js';
import '../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import { Icon } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import UploadFile from '../components/uploadpage/upload_file.js';
export default function Upload() {
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen py-10 bg-white">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full max-w-md px-3"
        autoComplete="on"
        noValidate={false}
      >
        <h1 className="text-4xl font-bold text-center mb-6">Upload</h1>
        <div className="mb-4">
          <UploadDropdown value={dropdownValue} onChange={handleDropdownChange} />
        </div>
          <div className= "">
            <UploadFile className="flex flex-col items-center justify-center"/>
          </div>
          <div className="flex items-center my-4 bg-white">
            <div className="flex-grow border-t border-purpleblue"></div>
            <span className="px-4 text-gray-500 font-bold">or</span>
            <div className="flex-grow border-t border-purpleblue"></div>
          </div>
        <div className='flex flex-col items-center'>
          <button
            type="button"
            className="w-48 py-2 text-purpleblue border-2 border-solid border-purpleblue rounded-3xl hover:bg-purpleblue hover:text-white hover:underline "
          >
            Scan
          </button>
        </div>
      </form>
    </div>
  );
}