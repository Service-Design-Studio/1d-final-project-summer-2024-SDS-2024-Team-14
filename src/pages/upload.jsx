import React, { useState, useEffect } from 'react';
import UploadDropdown from '../components/uploadpage/dropdown.jsx';
import '../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import { Icon } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import App from '../components/uploadpage/dragfiles.jsx';
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
    <div className="flex flex-col items-center min-h-screen py-10 bg-white">
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
            <App className="flex flex-col items-center justify-center"/>
          </div>
        <p className="text-center bg-white my-4">or</p>
        <button
          type="button"
          className="w-full py-2 text-purpleblue border-2 border-solid border-purpleblue  border-radius-19px rounded-md hover:bg-purpleblue hover:text-white hover:underline "
        >
          Scan
        </button>
      </form>
    </div>
  );
}