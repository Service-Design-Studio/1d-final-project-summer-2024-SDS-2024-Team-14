// src/components/modalContent/famtree.js
import React from 'react';
import CreateNewSearchImage1 from 'public/images/intro/homehd.png';
import CreateNewSearchImage2 from 'public/images/intro/docmanfigmahd.png';
import ViewExistingSearchImage from 'public/images/intro/white bg.png';
import EditExistingSearchImage1 from 'public/images/intro/docmanhd.png';
import EditExistingSearchImage2 from 'public/images/intro/homehd.png';

const famTreeContent = [
    {
        category: 'Create New Search',
        title: 'Create New Search',
        images: [CreateNewSearchImage1, CreateNewSearchImage2],
        text: 'This section allows you to create a new search for your family members. Fill in the required details and click on the "Search" button to begin the process.',
    },
    {
        category: 'View Existing Search',
        title: 'View Existing Search',
        images: [ViewExistingSearchImage],
        text: 'Here you can view the details of your existing searches. You can see the search status and other relevant information.',
    },
    {
        category: 'Edit Existing Search',
        title: 'Edit Existing Search',
        images: [EditExistingSearchImage1, EditExistingSearchImage2],
        text: 'If you need to make changes to an existing search, you can do so in this section. Update the details as necessary and save your changes.',
    },
];

export default famTreeContent;
