import React, { useState, useEffect } from 'react';
import UploadDropdown from '../../../components/uploadpage/dropdown.js';
import '../../../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import { Icon } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import UploadFile from '../../../components/uploadpage/upload_file.js';
//import Header from '../../components/header.js';
import {ReactNotifications, Store} from "react-notifications-component";
import {useRouter} from "next/router";
import documentDecoration from "../../../../public/images/upload/document_decoration.svg";
import Image from "next/image";
import EnableId from "../../../../public/images/enable_id_logo.svg";
import ChatBot from "@/components/ChatBot";

export default function Upload() {
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
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
      <div className="min-h-screen flex flex-col bg-[url('../../public/images/background/gebirah-bluebg.png')] md:px-[12vw] px-[2vw]">
          {/*<NaviBar />*/}
          <div className="md:flex md:items-center pt-4 ml-4">
            <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
          </div>
          <div className='p-4 text-darkblue'>
              <div className="flex flex-row justify-between">
                  <div className="inline-block">
                    <h1 className='text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]'>Upload <span className="capitalize">{router.query.category}</span> Document</h1>
                    <p className='md:my-2 text-[4vw] md:text-[1.5vw] my-4'>Start uploading your important documents here</p>
                    <p className='text-[4vw] md:text-[1.5vw] md:mb-0 mb-[5vw]'>Please upload all relevant documents by selecting one or multiple files</p>
                  </div>
                  <div className="w-[13vw] mr-[4vw] md:inline-block hidden">
                      <Image src={documentDecoration} alt="Document Decoration"/>
                  </div>
              </div>
            <div className="bg-white rounded-xl shadow-xl px-4 mb-8 mt-4">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col justify-center w-full md:px-8 lg:px-12"
                    autoComplete="on"
                    noValidate={false}
                >
                <div className="mb-4 flex flex-col">
                    <UploadFile selectedCategory={router.query.category} router={router} className="flex flex-col items-center justify-center" />
                </div>
                </form>
            </div>
        </div>
    
      </div>
    <ChatBot/>
      </>
);
}
