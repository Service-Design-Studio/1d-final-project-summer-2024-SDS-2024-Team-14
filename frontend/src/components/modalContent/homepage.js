// src/components/modalContent/homepage.js
import React from 'react';
import DisplayQRCodeImage1 from 'public/images/intro/modal/home/1a.jpeg'; // Update with actual image paths
import DisplayQRCodeImage2 from 'public/images/intro/modal/home/1b.jpeg'; // Update with actual image paths
import AccessServicesImage from 'public/images/intro/modal/home/2.jpeg'; // Update with actual image paths
import FAQChatbotImage1 from 'public/images/intro/modal/home/3a.jpeg'; // Update with actual image paths
import FAQChatbotImage2 from 'public/images/intro/modal/home/3b.png'; // Update with actual image paths

const homePageContent = [
    {
        category: 'Display Card with QR Code',
        title: 'Display Card with QR Code',
        images: [DisplayQRCodeImage1, DisplayQRCodeImage2],
        texts: [
            'If you wish to view or display your scannable QR code, click the “Show UNHCR card” button on our home page.',
            'Your QR code will be displayed as seen above.'
        ],
    },
    {
        category: 'Access Our Services',
        title: 'Access Our Services',
        images: [AccessServicesImage],
        texts: [
            'You may access the various services our webapp provides here.'
        ],
    },
    {
        category: 'FAQ Chatbot',
        title: 'FAQ Chatbot',
        images: [FAQChatbotImage1, FAQChatbotImage2],
        texts: [
            'To bring up the FAQ Chatbot and ask any questions regarding our webapp, click on the "?" button at the bottom right of every page.',
            'Here is what the chatbot looks like. Simply type your question in the chat.'
        ],
    },
];

export default homePageContent;
