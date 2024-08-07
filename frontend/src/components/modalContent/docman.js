// src/components/modalContent/docman.js
import React from 'react';
import SelectingCategoriesImage from 'public/images/intro/modal/docman/1.jpeg';
import SearchBarImage from 'public/images/intro/modal/docman/2.jpeg'; 
import UploadingDocumentsImage1 from 'public/images/intro/modal/docman/3a.jpeg';
import UploadingDocumentsImage2 from 'public/images/intro/modal/docman/3b.jpeg';
import UploadingDocumentsImage3 from 'public/images/intro/modal/docman/3c.jpeg';
import ScanningDocumentsImage1 from 'public/images/intro/modal/docman/4a.jpeg';
import ScanningDocumentsImage2 from 'public/images/intro/modal/docman/4b.jpeg';
import ScanningDocumentsImage3 from 'public/images/intro/modal/docman/4c.jpeg';
import ScanningDocumentsImage4 from 'public/images/intro/modal/docman/4d.jpeg';
import SortingImage from 'public/images/intro/modal/docman/5.jpeg';
import PreviewingImage1 from 'public/images/intro/modal/docman/6a.jpeg';
import PreviewingImage2 from 'public/images/intro/modal/docman/6b.jpeg';


const docManContent = [
    {
      category: 'Selecting Categories',
      title: 'Selecting Categories',
      images: [SelectingCategoriesImage],
      texts: [
        'Select the categories of the documents you wish to view. You can further sort them by their approval status.',
      ],
    },
    {
      category: 'Search Bar',
      title: 'Search Bar',
      images: [SearchBarImage],
      texts: [
        'Key in your search terms in the search bar. The search will be carried out only within the selected category and document status.',
      ],
    },
    {
      category: 'Uploading Documents',
      title: 'Uploading Documents',
      images: [UploadingDocumentsImage1, UploadingDocumentsImage2, UploadingDocumentsImage3],
      texts: [
        'If you have a digital copy of a document you wish to upload, select the category you want to upload it to and click on "Upload". You will then be redirected to the Upload page.',
        'Click on "Upload a file" to select a file from your device or drag and drop the file into the upload box. You may do this with multiple files.',
        'All the files you selected will appear on the right of the upload box. Once you are done, click on "Upload" to upload these files into the Documents Manager'
      ],
    },
    {
      category: 'Scanning Documents',
      title: 'Scanning Documents',
      images: [ScanningDocumentsImage1, ScanningDocumentsImage2, ScanningDocumentsImage3, ScanningDocumentsImage4],
      texts: [
        'If you have a physical copy of a document you wish to upload, select the category you want to upload it to and click on "Scanner".',
        'Line up the document within the boundaries and press the capture button to scan the document.',
        'Input the name of the document.',
        'You may do this multiple times. Once all the documents have been scanned, click "Upload Documents" to upload these files into the Document Manager'
      ],
    },
    {
      category: 'Sorting',
      title: 'Sorting',
      images: [SortingImage],
      texts: [
        'You may sort the documents in increasing or decreasing order by alphabetical order of the document names, document type and last modified date by clicking on the arrows next to their header names.',
      ],
    },
    {
      category: 'Previewing',
      title: 'Previewing',
      images: [PreviewingImage1, PreviewingImage2],
      texts: [
        'To preview a document you have uploaded as well as view the important information extracted from it, simply click on the document name.',
        'A modal will pop up on your screen, displaying the document as well as any extracted important information.'
      ],
    },
  ];
  
  export default docManContent;