import React, { useState, useEffect } from 'react';
import NaviBar from '../../components/NaviBar';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import pdfIcon from "../../../public/images/icons/pdf_icon.svg";
import docxIcon from "../../../public/images/icons/docx_icon.svg";
import picIcon from "../../../public/images/icons/pic_icon.svg";
import crossIcon from "../../../public/images/upload/cross_icon.svg";
import Link from "next/link";
import ChatBot from "@/components/ChatBot";
import axiosInstance from "@/utils/axiosInstance";
import {ReactNotifications, Store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import DropdownArrow from "../../../public/images/icons/dropdown.svg"
import ScannerIcon from "../../../public/images/icons/scanner.svg"
import UploadIcon from "../../../public/images/icons/upload_icon.svg"
import Loading from "@/components/loading";

const DocumentManager = () => {
  const [selectedCategory, setSelectedCategory] = useState('Health');
  const [statusFilter, setStatusFilter] = useState('All');
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [uploadCategory, setUploadCategory] = useState('health');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(null);
  const [showInput, setShowInput] = useState(false)
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
    setBackgroundVisible(!backgroundVisible); // Toggle background visibility
  };

  let userID;


  useEffect(() => {
    if (selectedCategory) {
      fetchDocuments();
    }
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    userID = localStorage.getItem("userID");
    try {
      await axiosInstance.post(`/document/retrieve`, {id: userID}).then((resp) => {
        setData(resp.data.documents)
    })
    } catch (error) {
      console.error(error.message);
    }
    finally {
        setTimeout(() => {
          setLoading(false);
          const message = localStorage.getItem('notificationMessage');
          const status = localStorage.getItem('status');
          if (message) {
            if (status ==="success") {
              Store.addNotification({
                title: "Success",
                message: message,
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
              });
            }
            else {
              Store.addNotification({
                title: "Error",
                message: message,
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
              });
            }
            localStorage.removeItem('notificationMessage'); // Clear the message after displaying
            localStorage.removeItem('status'); // Clear the message after displaying
          }
        }, 1500); // 1.5 seconds delay
    }
  }
  useEffect(() => {
    if (data != null) {
      const categoryDocs = data.filter(doc => doc.category === selectedCategory.toLowerCase());
      setAllCount(categoryDocs.length);
      setApprovedCount(categoryDocs.filter(doc => doc.status === 'Approved').length);
      setPendingCount(categoryDocs.filter(doc => doc.status === 'Pending').length);
      setRejectedCount(categoryDocs.filter(doc => doc.status === 'Rejected').length);
    }
  }, [data, selectedCategory]);

  useEffect(() => {
    if (data != null) {
      const filteredDocuments = data.filter(
          doc => doc.category === selectedCategory.toLowerCase() && (statusFilter === 'All' || doc.status === statusFilter)
        );

        setDocuments(filteredDocuments);
        setFilteredDocuments(filteredDocuments);

      }

  }, [selectedCategory, statusFilter, data]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setStatusFilter('All');
    setUploadCategory(category.toLowerCase());
    setDropdownOpen(false);
  };
  

  const handleStatusFilterClick = (status) => {
    setStatusFilter(status);
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleClosePreview = () => {
    setSelectedDocument(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredDocuments(documents)
    } else {
      const filtered = documents.filter(doc => doc.name.toLowerCase().includes(term.toLowerCase()));
      setFilteredDocuments(filtered);
    }
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0); // If no date, assume it's the earliest for sorting
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortConfig.key === 'lastModifiedDate') {
      const aDate = parseDate(a[sortConfig.key]);
      const bDate = parseDate(b[sortConfig.key]);
      if (aDate < bDate) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aDate > bDate) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    } else if (sortConfig.key === 'type') {
      const aType = a.name.split('.').pop().toLowerCase();
      const bType = b.name.split('.').pop().toLowerCase();
      if (aType < bType) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aType > bType) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getArrowIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? faArrowUp : faArrowDown;
    }
    return faArrowDown;
  };

  const getIconForFilename = (filename) => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'pdf':
        return { src: pdfIcon};
      case 'docx':
        return { src: docxIcon};
      case 'jpg':
      case 'png':
      case 'img':
      case 'images':
        return { src: picIcon};
      default:
        return { src: picIcon};
    }
  };


  const renderImportantInfo = (important) => {
    try {
      const parsedImportant = JSON.parse(important);
  
      if (!parsedImportant || typeof parsedImportant !== 'object') {
        throw new Error("Invalid important information structure");
      }
  
      const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  
      return (
        <div className="text-left">
          <ul className="leading-loose">
            {Object.entries(parsedImportant).map(([key, value], idx) => (
              <li key={idx}>
                <div className="flex flex-row md:text-[1.5vw] text-[4vw] font-semibold text-lightgray">{formatKey(key)}:</div>
                {Array.isArray(value) ? (
                  <ul className="ml-4">
                    {value.map((item, subIdx) => (
                      <li key={subIdx} className="md:text-[1.2vw] text-[3.5vw] text-darkblue">
                        {typeof item === 'object' ? (
                          <ul className="ml-4">
                            {Object.entries(item).map(([subKey, subValue], subSubIdx) => (
                              <li key={subSubIdx} className="flex flex-row items-baseline">
                                <div className="flex-shrink-0 md:text-[1.5vw] text-[4vw] font-semibold text-darkblue">{formatKey(subKey)}:</div>
                                <div className="pl-2 md:text-[1.2vw] text-[3.5vw] text-darkblue">{Array.isArray(subValue) ? subValue.join(', ') : subValue}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="md:text-[1.2vw] text-[3.5vw] font-semibold text-darkblue ">{item}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <ul className="ml-4">
                    {Object.entries(value).map(([subKey, subValue], subIdx) => (
                      <li key={subIdx} className="flex flex-row items-baseline ">
                        <div className="flex-shrink-0 md:text-[1.5vw] text-[4vw] font-semibold text-darkblue">{formatKey(subKey)}:</div>
                        <div className="pl-2 md:text-[1.2vw] text-[3.5vw] text-darkblue">{Array.isArray(subValue) ? subValue.join(', ') : subValue}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="md:text-[1.2vw] text-[3.5vw] text-darkblue">{value}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    } catch (error) {
      console.error("Error parsing important information:", error.message, error.stack);
      return <p>Error parsing important information</p>;
    }
  };
  
  
  return (
    <>
    <ReactNotifications />
    <div className="overflow-hidden min-h-screen flex flex-col bg-cover bg-[url('/images/background/gebirah-bluebg.png')]">
      {!loading && data &&
      <>
      <NaviBar open={open} setOpen={ setOpen} />
          {/* category button row */}
      <div className="mx-3 md:mx-10 md:mt-10 ">
        <div className="px-1.5 flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-darkblue">Documents Manager</h1>
          <div className={`md:hidden absolute top-5 right-5 flex items-center ${backgroundVisible ? 'bg-opacity-0' : 'bg-lightgray'} rounded-full px-1 md:px-3 py-1 md:py-2`}>
            <div className="flex items-center">
              <div className="cursor-pointer" onClick={toggleInput}>
                <Image className="w-[6vw] md:w-[4vw]" src="/images/icons/search.svg" alt="Search Icon" width={24} height={24}/>
              </div>
              {showInput && (
                <input
                  type="text"
                  placeholder="Search in Documents"
                  className={`flex-grow text-darkblue w-full mx-auto ml-2 bg-lightgray md:placeholder:text-[1.2vw] placeholder:text-darkblue placeholder:opacity-[79%] placeholder:text-[4vw]
                  focus:outline-none text-[4vw] md:text-[1.2vw]`}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center md:bg-lightgray rounded-full px-3 py-2">
            <Image className="w-[1.5vw]" src="/images/icons/search.svg" alt="Search Icon" width={24} height={24} />
            <input
                type="text"
                placeholder="Search in Documents"
                className="flex-grow text-darkblue bg-lightgray w-contain md:placeholder:text-[1.2vw] mx-auto ml-2 placeholder:text-darkblue placeholder:opacity-[79%]
                focus:outline-none text-[2vw] md:text-[1.2vw]"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
          <div className="flex justify-between items-center my-3 md:my-5 ml-0 mr-0 md:flex-row">
            {/* gap in btw cat buttons */}
            <div className="flex flex-wrap gap-2 pl-1.5">
              {['Health', 'Career', 'Education', 'Family', 'Finance', 'Property'].map((category) => (
                  <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`${category} py-[1vw] md:py-1.5 px-3 rounded-md font-bold text-[4vw] md:text-[1.2vw] 
                      ${selectedCategory === category ? 'bg-darkblue text-white' : 'md:bg-opacity-0 bg-white text-darkblue'}`}
                      >
                    {category}
                  </button>
              ))}
            </div>
          </div>
        <hr className="border-t-2 border-[#B0B0B0]/50 w-full my-2 md:my-4 mx-auto" />
        </div>
        {/* Upload and Category buttons container for web */}
        <div className="relative flex justify-between items-center mb-5 md:mx-7 md:flex">
          <div className="flex text-[3.5vw] mx-2 md:mx-2 md:text-[1vw]">
            <button
              onClick={() => handleStatusFilterClick('All')}
              className={`flex mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'All' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              <div className='pr-1'>{allCount}</div> <b>All</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Approved')}
              className={`flex mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Approved' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              <div className='pr-1'>{approvedCount}</div> <b>Approved</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Pending')}
              className={`flex  mx-2 py-1 md:py-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Pending' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              <div className='pr-1'>{pendingCount}</div> <b>Pending</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Rejected')}
              className={`flex mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Rejected' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              <div className='pr-1'>{rejectedCount}</div> <b>Rejected</b>
            </button>
          </div>
          <div className="fixed md:relative bottom-0 flex items-center justify-center bg-white w-full py-5 md:py-0 md:justify-end md:mx-5 md:bottom-auto md:bg-opacity-0 md:right-0">
            <Link href={`/documents/upload/${uploadCategory}`} className="upload flex items-center py-[1.1vw] md:py-[7.5px] px-4 bg-darkblue text-xl text-white rounded-l-xl font-bold upload">
              <Image src={UploadIcon} alt="Upload Icon" className="w-[8vw] md:w-[2vw] pr-2" />
              Upload
            </Link>
            <Link href={`/documents/scanner/${uploadCategory}`} className="scanner border-darkblue border border-solid flex items-center py-[0.8vw] md:py-[6.5px] px-4 bg-white text-xl text-gray rounded-r-xl font-bold scanner">
              <Image src={ScannerIcon} alt="Category Icon" className="w-[8vw] md:w-[2vw] pr-2" />
              Scan
            </Link>
            <div>
                <div className="text-left">
                <div>
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="focus:outline-none outline:none flex items-center w-full px-4 py-2 text-[0.9vw] font-bold text-darkblue"
                    id="menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className='hidden md:block md:text-[1vw]'>in &quot;{selectedCategory}&quot;</span>
                    <div className='hidden md:block md:pl-2'>
                      <Image src={DropdownArrow} />
                    </div>
                  </button>
            </div>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute top-full right-2 md:right-0 md:mb-2 mt-2 w-56 rounded-md shadow-2xl bg-white"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {['Health', 'Career', 'Education', 'Family', 'Finance', 'Property'].map((category) => (
                      <a
                        key={category}
                        href="#"
                        className={`${category} block px-4 py-2 text-[4vw] md:text-[0.9vw] hover:bg-lightblue`}
                        role="menuitem"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                    </a>
                    ))}
                  </div>
                </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
            {/* DOCUMENT CONTAINER for Web */}
            <div className="overflow-hidden bg-white rounded-xl shadow-md mx-3 md:mb-10 md:mx-10">
              <div className="flex font-bold py-3 text-[3.5vw] md:text-[1.2vw] text-darkblue">
                <div className="flex items-center"></div>
                <div className="flex items-center pl-[12vw] md:pl-[6.5vw] w-[50%] md:w-[72vw]" onClick={() => requestSort('name')}>
                  <span>Name</span>
                  <FontAwesomeIcon icon={getArrowIcon('name')} className="ml-2" />
                </div>
                <div className="flex items-center w-[22%] md:w-[14%]" onClick={() => requestSort('type')}>
                  <span>Type</span>
                  <FontAwesomeIcon icon={getArrowIcon('type')} className="ml-2" />
                </div>
                <div className="flex items-center w-[15%] md:w-[17%]" onClick={() => requestSort('lastModifiedDate')}>
                  <span className='hidden md:block'>Last Modified Date</span>
                  <span className='block md:hidden'>Date</span>
                  <FontAwesomeIcon icon={getArrowIcon('lastModifiedDate')} className="ml-2" />
                </div>
              </div>
              <div className="">
                {sortedDocuments.length > 0 ? (
                  sortedDocuments.map((document) => {
                    return (
                      <div className={`flex justify-between h-[15vw] md:h-20 border-t border-lightgray ${selectedCategory + '-document'}`} key={document.id} onClick={() => handleDocumentClick(document)}>
                        <Image className="md:w-[3vw] w-[8vw] ml-2 md:ml-8"
                          src={getIconForFilename(document.name).src}
                          alt={`${document.name} icon`}
                        />
                        <div className="flex overflow-hidden items-center flex-grow text-[4vw] w-[40%] md:w-[70%] md:text-lg">
                          <div className="overflow-hidden whitespace-nowrap text-ellipsis w-full ml-2 md:ml-5 font-bold">
                            {document.name.replace(/\.[^/.]+$/, "")} {/* Remove file extension */}
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:ml-[-10px] w-[20%] md:w-[15%]">
                          <span className="md:mr-[5vw] text-[4vw] md:text-lg text-darkblue">{document.name.split('.').pop()}</span>
                        </div>
                        <div className="mr-[1.5vw] md:mr-[4vw] flex items-center justify-center w-[30%] md:w-[15%]">
                          <span className="text-[3.5vw] md:text-lg text-darkblue">{document.lastModifiedDate}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-md md:text-lg text-center w-full py-5 text-lightgray">No documents available</div>
                )}
              </div>
            </div>
      {selectedDocument && (
        <>
          <div className="fixed top-0 left-0 w-full h-full
          bg-default justify-center bg-opacity-75 z-50 flex items-center">
            <div className="bg-white mx-auto my-auto rounded-xl md:w-2/3 h-[80%]">
              <div className ="px-6">
                <div className="flex justify-between pt-4 pb-1">
                  <h1 className="text-[2.5vw] md:text-[1.5vw] font-bold text-darkblue">{selectedDocument.name}</h1>
                  <Image className="md:w-[2vw] w-[4vw] mb-2" src={crossIcon} alt="close window" onClick={handleClosePreview}/>
                </div>
              </div>
            <hr className="border-t-1 border-[#B0B0B0]/50 w-full" />
            <div className="md:flex flex-col md:flex-row bg-white overflow-hidden w-auto h-[80%] relative">
              <div className="flex h-1/2 md:h-full md:w-[45%]">
                <div className="w-full bg-[#B0B0B0]/50 py-5 px-5">
                  {selectedDocument.file_url ? (
                    <iframe className='rounded-lg' src={selectedDocument.file_url} width="100%" height="100%"></iframe>
                  ) : (
                    <p>Document preview not available</p>
                  )}
                </div>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                {selectedDocument.important ? renderImportantInfo(selectedDocument.important) : <p>No additional information available</p>}
              </div>
              </div>
              <hr className="border-t-1 border-[#B0B0B0]/50 w-full" />
              </div>
            </div>
          <ChatBot/>
        </>
        )}
          <ChatBot/>
        </>
      }
      {loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"}/>}
      {loading && data && <Loading text={"Loading..."} />}
    </div>
      </>
  );
};

export default DocumentManager;