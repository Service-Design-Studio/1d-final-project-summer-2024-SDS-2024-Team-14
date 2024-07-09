import React, { useState, useEffect } from 'react';
import UploadDropdown from '../../components/uploadpage/dropdown.js';
import '../../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import { Icon } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import UploadFile from '../../components/uploadpage/upload_file.js';
import Header from '../../components/header.js';

export default function Upload() {
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectedCategory, setSelectedCategory] = React.useState({ name: 'Select Category Here', icon: null });

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
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full max-w-screen-lg px-4 md:px-8 lg:px-12"
        autoComplete="on"
        noValidate={false}
      >
        <Header title="Upload" backButton="/documents"/>
        <div className="flex items-center justify-center md:mb-4 mb-6">
          <UploadDropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} value={dropdownValue} onChange={handleDropdownChange} />
        </div>
        <div className="mb-4">
          <UploadFile selectedCategory={selectedCategory} className="flex flex-col items-center justify-center" />
        </div>
      </form>
      
    </div>
  );
}