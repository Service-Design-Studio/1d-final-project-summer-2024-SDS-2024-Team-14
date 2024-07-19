import React, { useState, useEffect } from 'react';
import UploadDropdown from '../../components/uploadpage/dropdown.js';
import '../../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import { Icon } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import UploadFile from '../../components/uploadpage/upload_file.js';
//import Header from '../../components/header.js';
import {ReactNotifications, Store} from "react-notifications-component";
import {useRouter} from "next/router";
import NaviBar from "../../components/NaviBar";

export default function Upload() {
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectedCategory, setSelectedCategory] = React.useState({ name: 'Select Category Here', icon: null });
  const router = useRouter();

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
    <>
    <ReactNotifications />
      <NaviBar />
      <div className="min-h-screen flex flex-col bg-[url('../../public/images/background/gebirah-background.jpg')] ">
        <div className='p-4 text-darkblue bold'style={{ paddingLeft: '12vw', paddingRight:'12vw'}}>
            <h1 className='text-darkblue font-bold'>Upload Document</h1>
            <p className='my-2'>Start uploading your important documents here</p>
            <p className=''>Please upload all relevant documents by selecting one or multiple files</p>
            <div className="bg-white rounded-xl shadow-xl p-8 my-8">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col justify-center w-full px-4 md:px-8 lg:px-12"
                    autoComplete="on"
                    noValidate={false}
                >
                <div className="mb-4 flex flex-row flex-col">
                    <UploadFile selectedCategory={selectedCategory} router={router} className="flex flex-col items-center justify-center" />
                </div>
                </form>
            </div>
        </div>
    
      </div>
      </>
);
}
