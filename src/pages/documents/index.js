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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uploadCategory, setUploadCategory] = useState('health');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [data, setData] = useState(null);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  let userID;


  useEffect(() => {
    if (selectedCategory) {
      fetchDocuments();
    }
      const message = localStorage.getItem('notificationMessage');
      const status = localStorage.getItem('status');
      if (message) {
          if (status==="success") {
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
  }, []);

  const fetchDocuments = async () => {

    userID = localStorage.getItem("userID");
    try {
      await axiosInstance.post(`/document/retrieve`, {id: userID}).then((resp) => {
        setData(resp.data.documents)
    })
    } catch (error) {
      console.error(error.message);
    };
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

        setTotalPages(Math.ceil(filteredDocuments.length / itemsPerPage));
      }

  }, [selectedCategory, statusFilter, currentPage, data]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setStatusFilter('All');
    setCurrentPage(1);
    setUploadCategory(category.toLowerCase());
  };

  const handleStatusFilterClick = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
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
      return (
        <div className="">
          {Object.keys(parsedImportant).map((key, index) => (
          <div key={key}>
            {index !== 0 && <div className="mt-2"></div>} {/* Add margin before each new header */}
            <strong className="md:text-[1.5vw] text-[3.5vw] font-semibold text-lightgray">
              {key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}:
            </strong>
            <ul className="leading-loose">
              {Array.isArray(parsedImportant[key])
                ? parsedImportant[key].map((item, idx) => (
                    <li key={idx} className="md:text-[1vw] text-[3vw] text-darkblue">
                      {typeof item === 'object' ? (
                        <>
                         {Object.keys(item).map((itemKey) => (
                            <div key={itemKey} className="ml-4">
                              <strong>{itemKey.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}:</strong>
                              {` ${Array.isArray(item[itemKey]) ? item[itemKey].join(', ') : item[itemKey]}`}
                            </div>
                          ))}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))
                : <span className="md:text-[1.2vw] text-[3.2vw] text-darkblue">{parsedImportant[key]}</span>}
            </ul>
          </div>
          ))}
        </div>
      );
    } catch (error) {
      return <p>Error parsing important information</p>;
    }
  };

  return (
    <>
    <ReactNotifications />
    <div className="overflow-hidden min-h-screen flex flex-col bg-cover bg-[url('/images/background/gebirah-bluebg.png')]">
      <NaviBar open={open} setOpen={ setOpen} />
          {/* category button row */}
      <div className="mx-3 md:mx-10 md:mt-10">
        <div className="px-1.5 flex flex-row justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold text-darkblue">Documents Manager</h1>
          <Image className="md:hidden w-[4vw]" src="/images/icons/search.svg" alt="Search Icon" width={24} height={24} />
          <div open={open} setOpen={setOpen} className="hidden md:flex items-center bg-lightgray rounded-full px-3 py-2">
            <Image className="w-[1.5vw]" src="/images/icons/search.svg" alt="Search Icon" width={24} height={24} />
            <input
                type="text"
                placeholder="Search in Documents"
                className="flex-grow text-darkblue w-contain bg-lightgray md:placeholder:text-[1.2vw] mx-auto ml-2 placeholder:text-darkblue placeholder:opacity-[79%]
                focus:outline-none text-[2vw] md:text-[1.2vw]"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
          <div className="flex justify-between items-center my-5 ml-0 mr-0 md:flex-row">
            {/* gap in btw cat buttons */}
            <div className="category-buttons flex flex-wrap gap-2 pl-1.5">
              {['Health', 'Career', 'Education', 'Family', 'Finance', 'Property'].map((category) => (
                  <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      // CATEGORY BUTTONS
                      className={`py-0.5 px-2 md:py-1.5 md:px-3 rounded-md font-bold text-[3vw] md:text-[1.2vw] 
                  ${selectedCategory === category ? 'bg-darkblue text-white' : 'bg-white md:bg-opacity-0 text-darkblue'}`}
                  >
                    {category}
                  </button>
              ))}
            </div>
          </div>
        <hr className="border-t-2 border-[#B0B0B0]/50 w-full my-4 mx-auto" />
        </div>

        {/* Upload and Category buttons container for web */}
        <div className="flex justify-between items-center mb-5 mx-2 md:mx-10 md:flex">
          <div className="flex text-[3vw] md:text-[1vw]">
            <button
              onClick={() => handleStatusFilterClick('All')}
              className={`mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'All' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {allCount} <b>All</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Approved')}
              className={`mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Approved' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {approvedCount} <b>Approved</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Pending')}
              className={`mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Pending' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {pendingCount} <b>Pending</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Rejected')}
              className={`mx-2 py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-xl ${statusFilter === 'Rejected' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {rejectedCount} <b>Rejected</b>
            </button>
          </div>
          <div className="hidden md:flex md:gap-4 md:items-center">
            <Link href={`/documents/upload/${uploadCategory}`} className="flex items-center py-2 px-4 bg-darkblue text-white rounded-xl font-bold">
              <Image src="/images/icons/upload_icon.svg" alt="Upload Icon" width={24} height={24} className="w-[2vw] pr-2" />
              Upload
            </Link>
            <Link href={`/documents/scanner/${uploadCategory}`} className="flex items-center py-2 px-4 bg-darkblue text-white rounded-xl font-bold">
              <Image src="/images/icons/scanner.svg" alt="Category Icon" width={24} height={24} className="w-[2vw] pr-2" />
              Scanner
            </Link>
          </div>
        </div>
      {/* DOCUMENT CONTAINER for Web */}
      <div className="overflow-hidden bg-white rounded-xl shadow-md mx-3 md:mb-10 md:mx-10">
        <div className="flex font-bold py-3 text-[2.5vw] md:text-[0.8vw] text-darkblue">
          <div className="flex items-center w-50 md:w-80"></div>
          <div className="flex items-center pl-5 w-[50%] md:w-[70%]" onClick={() => requestSort('name')}>
            <span>Name</span>
            <FontAwesomeIcon icon={getArrowIcon('name')} className="ml-2" />
          </div>
          <div className="flex items-center w-[15%]" onClick={() => requestSort('type')}>
            <span>Type</span>
            <FontAwesomeIcon icon={getArrowIcon('type')} className="ml-2" />
          </div>
          <div className="flex items-center md:w-[15%]" onClick={() => requestSort('lastModifiedDate')}>
            <span>Last Modified Date</span>
            <FontAwesomeIcon icon={getArrowIcon('lastModifiedDate')} className="ml-2" />
          </div>
        </div>
        <div className="">
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map((document) => {
              return (
                <div className="flex justify-between h-20 border-t border-lightgray text-lg" key={document.id} onClick={() => handleDocumentClick(document)}>
                  <Image className="md:w-[3vw] w-[5vw] ml-8"
                    src={getIconForFilename(document.name).src}
                    alt={`${document.name} icon`}
                  />
                  <div className="flex items-center flex-grow text-lg">
                    <div className="ml-5 font-bold">
                      {document.name.replace(/\.[^/.]+$/, "")} {/* Remove file extension */}
                    </div>
                  </div>
                  <div className={`flex items-center ml-[-10px]`} style={{ width: '15%' }}>
                    <span className="text-lg text-darkblue">{document.name.split('.').pop()}</span>
                  </div>
                  <div className="flex items-center" style={{ width: '15%' }}>
                    <span className="text-lg text-darkblue">{document.lastModifiedDate}</span>
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
            <div className="bg-white mx-auto my-auto rounded-xl w-2/3 h-[80%]">
              <div className ="px-6">
                <div className="flex justify-between pt-4 pb-1">
                  <h1 className="text-[2.5vw] md:text-[1.5vw] font-bold text-darkblue">{selectedDocument.name}</h1>
                  <Image className="md:w-[2vw] w-[4vw] mb-2" src={crossIcon} alt="close window" onClick={handleClosePreview}/>
                </div>
              </div>
            <hr className="border-t-1 border-[#B0B0B0]/50 w-full" />
            <div className="flex bg-white overflow-hidden w-auto h-[80%] relative">
              <div className="flex w-1/2">
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
    </div>
      </>
  );
};

export default DocumentManager;