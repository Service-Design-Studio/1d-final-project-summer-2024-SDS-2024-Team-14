// src/components/modalContent/docman.js
import React from 'react';
import SelectingCategoriesImage from 'public/images/intro/docmanhd.png';
import SearchBarImage from 'public/images/intro/chatbot.jpg';
import UploadingDocumentsImage1 from 'public/images/intro/homehd.png';
import UploadingDocumentsImage2 from 'public/images/intro/famtree.png';
import UploadingDocumentsImage3 from 'public/images/intro/docmanfigmahd.png';
import ScanningDocumentsImage1 from 'public/images/intro/docmanfigmahd.png';
import ScanningDocumentsImage2 from 'public/images/intro/fam.jpg';
import ScanningDocumentsImage3 from 'public/images/intro/chatbothd.png';
import SortingImage from 'public/images/intro/white bg.png';
import PreviewingImage1 from 'public/images/intro/fam.jpg';
import PreviewingImage2 from 'public/images/intro/slide1.jpg';

const docManContent = [
    {
        category: 'Selecting Categories',
        title: 'Selecting Categories',
        images: [
            SelectingCategoriesImage
        ],
        text: 'Select the categories of the documents you wish to view. You can further sort them by their approval status.'
    },
    {
        category: 'Search Bar',
        title: 'Search Bar',
        images: [
            SearchBarImage
        ],
        text: 'Key in your search terms in the search bar. The search will be carried out only within the selected category and document status.'
    },
    {
        category: 'Uploading Documents',
        title: 'Uploading Documents',
        images: [
            UploadingDocumentsImage1,
            UploadingDocumentsImage2,
            UploadingDocumentsImage3
        ],
        text: 'If you have a digital copy of a document you wish to upload, select the category you want to upload it to and click on "Upload".'
    },
    {
        category: 'Scanning Documents',
        title: 'Scanning Documents',
        images: [
            ScanningDocumentsImage1,
            ScanningDocumentsImage2,
            ScanningDocumentsImage3
        ],
        text: 'If you have a physical copy of a document you wish to upload, select the category you want to upload it to and click on "Scanner".'
    },
    {
        category: 'Sorting',
        title: 'Sorting',
        images: [
            SortingImage
        ],
        text: 'You may sort the documents in increasing or decreasing order by alphabetical order of the document names, document type and last modified date by clicking on the arrows next to their header names.'
    },
    {
        category: 'Previewing',
        title: 'Previewing',
        images: [
            PreviewingImage1,
            PreviewingImage2
        ],
        text: 'To preview a document you have uploaded as well as view the important information extracted from it, simply click on the document name and a modal pop up will appear displaying everything.'
    },
];

export default docManContent;
