import React, { useState, useEffect } from 'react';
import NaviBar from '../../components/NaviBar';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import pdfIcon from "../../../public/images/icons/pdf_icon.svg";
import docxIcon from "../../../public/images/icons/docx_icon.svg";
import picIcon from "../../../public/images/icons/pic_icon.svg";
import {mockData} from "@/components/verification/mockdata";
import Link from "next/link";

const categories = ['health', 'career', 'education', 'family', 'finance', 'property'];

const counts = categories.map(category => {
  const categoryDocs = mockData.filter(doc => doc.category === category);
  const verified = categoryDocs.filter(doc => doc.status === 'verified').length;
  const pending = categoryDocs.filter(doc => doc.status === 'pending').length;
  const rejected = categoryDocs.filter(doc => doc.status === 'rejected').length;
  return {
    category,
    counts: {
      verified,
      pending,
      rejected
    }
  };
});

console.log(counts);

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('health');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (selectedCategory) {
      fetchDocuments(selectedCategory, statusFilter, currentPage, itemsPerPage);
    }
  }, [selectedCategory, statusFilter, currentPage]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, documents]);

  const fetchDocuments = async (category, status, page, limit) => {
    try {
      console.log(mockData)
      const filteredDocuments = mockData.filter(
        doc => doc.category === category.toLowerCase() && (status === 'All' || doc.status === status)
      );

      setDocuments(filteredDocuments);
      setFilteredDocuments(filteredDocuments);

      if (status === 'All') {
        const categoryDocs = mockData.filter(doc => doc.category === category.toLowerCase());
        setAllCount(categoryDocs.length);
        setApprovedCount(categoryDocs.filter(doc => doc.status === 'Approved').length);
        setPendingCount(categoryDocs.filter(doc => doc.status === 'Pending').length);
        setRejectedCount(categoryDocs.filter(doc => doc.status === 'Rejected').length);
      }

      setTotalPages(Math.ceil(filteredDocuments.length / limit));
    } catch (error) {
      console.error(error);
    }
  };

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
        return { src: pdfIcon, width: 45, height: 45 };
      case 'docx':
        return { src: docxIcon, width: 45, height: 45 };
      case 'jpg':
      case 'png':
      case 'img':
      case 'images':
        return { src: picIcon, width: 30, height: 30 };
      default:
        return { src: '/images/icons/default_icon.svg', width: 30, height: 30 };
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(doc => doc.name.toLowerCase().includes(term.toLowerCase()));
      setFilteredDocuments(filtered);
    }
  };

  const renderImportantInfo = (important) => {
    try {
      const parsedImportant = JSON.parse(important);
      return (
        <div className="important-info">
          {Object.keys(parsedImportant).map((key, index) => (
            <div key={key}>
              {index !== 0 && <div className="mt-5"></div>} {/* Add margin before each new header */}
              <strong className="text-lg text-lightgray">{key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}:</strong>
              <ul className="leading-loose">
                {Array.isArray(parsedImportant[key])
                  ? parsedImportant[key].map((item, index) => (
                      <li key={index} className="text-2xl text-darkblue">
                        {typeof item === 'object' ? (
                          <>
                            {Object.keys(item).map((itemKey) => (
                              <div key={itemKey}>
                                {`${itemKey.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}: ${item[itemKey]}`}
                              </div>
                            ))}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    ))
                  : <span className="text-2xl text-darkblue">{parsedImportant[key]}</span>}
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
    <div className="min-h-screen flex flex-col bg-cover bg-[url('/images/background/gebirah-bluebg.png')]">
      <NaviBar open={open} setOpen={ setOpen} />
          {/* category button row */}
      <div className="mx-10 mt-10">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold text-darkblue">Documents Manager</h1>
          <div className="flex items-center bg-lightgray rounded-full px-3 py-2">
            <Image className="w-[1.5vw]" src="/images/icons/search.svg" alt="Search Icon" width={24} height={24} />
            <input
                type="text"
                placeholder="Search in Documents"
                className="flex-grow text-darkblue w-contain bg-lightgray placeholder:text-[1.2vw] mx-auto ml-2 placeholder:text-darkblue placeholder:opacity-[79%]
                focus:outline-none text-[1.2vw]"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
          <div className="flex flex-col justify-between items-center my-5 ml-0 mr-0 md:flex-row">
            {/* gap in btw cat buttons */}
            <div className="category-buttons flex flex-wrap gap-2 pl-1.5">
              {['Health', 'Career', 'Education', 'Family', 'Finance', 'Property'].map((category) => (
                  <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      // CATEGORY BUTTONS
                      className={`py-1.5 px-3 rounded-md font-bold text-[1.5vw] md:text-[1.2vw] 
                  ${selectedCategory === category ? 'bg-darkblue text-white' : 'text-darkblue'}`}
                  >
                    {category}
                  </button>
              ))}
            </div>
          </div>
        <hr className="border-t-2 border-[#B0B0B0]/50 w-full my-4 mx-auto" />
        </div>

        {/* Upload and Scanner buttons container for web */}
        <div className="flex justify-between items-center mb-5 ml-10 mr-10 hidden md:flex">
          <div className="status-filter-buttons flex">
            <button
              onClick={() => handleStatusFilterClick('All')}
              className={`mx-2 py-2 px-4 rounded-xl ${statusFilter === 'All' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {allCount} <b>All</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Approved')}
              className={`mx-2 py-2 px-4 rounded-xl ${statusFilter === 'Approved' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {approvedCount} <b>Approved</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Pending')}
              className={`mx-2 py-2 px-4 rounded-xl ${statusFilter === 'Pending' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {pendingCount} <b>Pending</b>
            </button>
            <button
              onClick={() => handleStatusFilterClick('Rejected')}
              className={`mx-2 py-2 px-4 rounded-xl ${statusFilter === 'Rejected' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
            >
              {rejectedCount} <b>Rejected</b>
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <Link href={`/documents/upload/${uploadCategory}`} className="flex items-center py-2 px-4 bg-darkblue text-white rounded-xl font-bold">
              <Image src="/images/icons/upload_icon.svg" alt="Upload Icon" width={24} height={24} className="w-[2vw] pr-2" />
              Upload
            </Link>
            <Link href={`/documents/scanner/${uploadCategory}`} className="flex items-center py-2 px-4 bg-darkblue text-white rounded-xl font-bold">
              <Image src="/images/icons/scanner.svg" alt="Scanner Icon" width={24} height={24} className="w-[2vw] pr-2" />
              Scanner
            </Link>
          </div>
        </div>

      {/* DOCUMENT CONTAINER for Web */}
      <div className="document-container hidden md:block bg-white p-5 rounded-xl shadow-md mt-5 mb-24 mr-10 ml-10 h-[calc(100vh-450px)] overflow-y-auto">
        <div className="document-headers flex font-bold text-darkblue pb-2 border-b border-lightgray">
          <div className="flex items-center" style={{ width: '80px' }}></div>
          <div className="document-header flex items-center pl-5" style={{ width: 'calc(70% - 80px)' }} onClick={() => requestSort('name')}>
            <span>Name</span>
            <FontAwesomeIcon icon={getArrowIcon('name')} className="ml-2" />
          </div>
          <div className="type-header flex items-center" style={{ width: '15%' }} onClick={() => requestSort('type')}>
            <span>Type</span>
            <FontAwesomeIcon icon={getArrowIcon('type')} className="ml-2" />
          </div>
          <div className="date-header flex items-center" style={{ width: '15%' }} onClick={() => requestSort('lastModifiedDate')}>
            <span>Last Modified Date</span>
            <FontAwesomeIcon icon={getArrowIcon('lastModifiedDate')} className="ml-2" />
          </div>
        </div>
        <div className="document-list">
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map((document) => {
              const isImage = ['jpg', 'png', 'img', 'images'].includes(document.name.split('.').pop());
              return (
                <div className="document-row flex justify-between h-20 border-b border-lightgray py-2 text-lg" key={document.id} onClick={() => handleDocumentClick(document)}>
                  <div className="document-icon-cell flex items-center" style={{ width: '80px' }}>
                    <div className={`icon-container flex justify-center items-center ${isImage ? 'pl-2' : ''}`}>
                      <Image
                        src={getIconForFilename(document.name).src}
                        alt={`${document.name} icon`}
                        width={getIconForFilename(document.name).width}
                        height={getIconForFilename(document.name).height}
                      />
                    </div>
                  </div>
                  <div className="document-name-cell flex items-center flex-grow text-lg">
                    <div className="ml-5">
                      {document.name.replace(/\.[^/.]+$/, "")} {/* Remove file extension */}
                    </div>
                  </div>
                  <div className={`document-type-cell flex items-center ${isImage ? 'ml-[-10px]' : ''}`} style={{ width: '15%' }}>
                    <span className="text-lg text-darkblue">{document.name.split('.').pop()}</span>
                  </div>
                  <div className="document-date-cell flex items-center" style={{ width: '15%' }}>
                    <span className="text-lg text-darkblue">{document.lastModifiedDate}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-documents text-lg text-center w-full py-5 text-lightgray">No documents available</div>
          )}
        </div>
      </div>
      {selectedDocument && (
        <>
          <div className="document-preview-overlay fixed top-0 left-0 w-full h-full bg-default bg-opacity-75 flex justify-center items-center z-50">
            <div className="document-preview-container flex bg-white rounded-xl overflow-hidden w-4/5 h-4/5 relative">
              <div className="document-preview flex-1 p-5">
                {selectedDocument.file_url ? (
                  <iframe src={selectedDocument.file_url} width="100%" height="100%"></iframe>
                ) : (
                  <p>Document preview not available</p>
                )}
              </div>
              <div className="important-info-container flex-1 p-5 overflow-y-auto">
                {selectedDocument.important ? renderImportantInfo(selectedDocument.important) : <p>No additional information available</p>}
              </div>
              <button className="close-preview absolute top-2 right-2 bg-darkblue text-white rounded-xl py-2 px-5 text-lg" onClick={handleClosePreview}>Close</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default DocumentManager;