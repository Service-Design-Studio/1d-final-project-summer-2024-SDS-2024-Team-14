// src/components/modalContent/famtree.js
import React from 'react';
import CreateNewSearchImage from 'public/images/intro/homehd.png';
import ViewExistingSearchImage from 'public/images/intro/homehd.png';
import EditExistingSearchImage from 'public/images/intro/homehd.png';

const famTreeContent = [
    {
        category: 'Create New Search',
        title: 'Create New Search',
        image: CreateNewSearchImage,
        text: 'This section allows you to create a new search for your family members. Fill in the required details and click on the "Search" button to begin the process.',
    },
    {
        category: 'View Existing Search',
        title: 'View Existing Search',
        image: ViewExistingSearchImage,
        text: 'Here you can view the details of your existing searches. You can see the search status and other relevant information.',
    },
    {
        category: 'Edit Existing Search',
        title: 'Edit Existing Search',
        image: EditExistingSearchImage,
        text: 'If you need to make changes to an existing search, you can do so in this section. Update the details as necessary and save your changes.',
    },
];

export default famTreeContent;
