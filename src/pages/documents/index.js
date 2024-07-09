import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/document_manager/dm_header';
import Footer from '../../components/document_manager/dm_footer';
import Card from '../../components/document_manager/dm_card';
import Modal from '../../components/document_manager/dm_modal';
import '../../styles/globals.css';
import useAuth from "@/hooks/useAuth";


const DocumentManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [documentCounts, setDocumentCounts] = useState([]);
  const router = useRouter();
  useAuth();
//PlaceHolder
  useEffect(() => {
    const mockData = [
      { id: 1, name: 'Health Document 1', status: 'verified', category: 'health' },
      { id: 2, name: 'Health Document 2', status: 'pending', category: 'health' },
      { id: 3, name: 'Health Document 3', status: 'verified', category: 'health' },
      { id: 4, name: 'Health Document 4', status: 'rejected', category: 'health' },
      { id: 5, name: 'Career Document 1', status: 'verified', category: 'career' },
      { id: 6, name: 'Career Document 2', status: 'pending', category: 'career' },
      { id: 7, name: 'Career Document 3', status: 'rejected', category: 'career' },
      { id: 8, name: 'Finance Document 1', status: 'verified', category: 'finance' },
      { id: 9, name: 'Finance Document 2', status: 'pending', category: 'finance' },
      { id: 10, name: 'Education Document 3', status: 'verified', category: 'education' },
      { id: 11, name: 'Family Document 4', status: 'rejected', category: 'family' },
      { id: 12, name: 'Family Document 1', status: 'verified', category: 'family' },
      { id: 13, name: 'Property Document 2', status: 'pending', category: 'property' },
      { id: 14, name: 'Property Document 3', status: 'rejected', category: 'property' },
    ];

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

    setDocumentCounts(counts);
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCardClick = (title) => {
    router.push(`/Documents/${title.toLowerCase()}`);
  };

// const DocumentManager = () => {
//   return (
//     <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
//       <Header />
//       <main className="grid grid-cols-1 sm:grid-cols-2 gap-20 flex-grow">
//         <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Health" date="24 Dec 2020" />
//         <Card bgColor="bg-purple-100" iconColor="text-purple-600" title="Career" date="24 Dec 2020" />
//         <Card bgColor="bg-pink-100" iconColor="text-pink-600" title="Education" date="23 Dec 2020" />
//         <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Family" date="24 Dec 2020" />
//         <Card bgColor="bg-purple-100" iconColor="text-purple-600" title="Finance" date="24 Dec 2020" />
//         <Card bgColor="bg-pink-100" iconColor="text-pink-600" title="Property" date="23 Dec 2020" />
//         <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Pattern" date="24 Dec 2020" />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default DocumentManager;


  const cards = [
    { title: 'Health', bgColor: 'bg-lightblue', iconColor: 'text-lightblue', textColor: 'text-darkblue' },
    { title: 'Career', bgColor: 'bg-lightpurple', iconColor: 'text-lightpurple', textColor: 'text-darkpurple' },
    { title: 'Education', bgColor: 'bg-lightpink', iconColor: 'text-lightpink', textColor: 'text-darkpink' },
    { title: 'Family', bgColor: 'bg-lightblue', iconColor: 'text-lightblue', textColor: 'text-darkblue' },
    { title: 'Finance', bgColor: 'bg-lightpurple', iconColor: 'text-lightpurple', textColor: 'text-darkpurple' },
    { title: 'Property', bgColor: 'bg-lightpink', iconColor: 'text-lightpink', textColor: 'text-darkpink' },
  ];

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      <Header />
      <main className="grid grid-cols-2 w-[95%] mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow">
        {cards.map((card, index) => {
          const counts = documentCounts.find(counts => counts.category === card.title.toLowerCase())?.counts || { verified: 0, pending: 0, rejected: 0 };
          return (
            <Card
              key={index}
              title={card.title}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
              textColor={card.textColor}
              counts={counts}
              onClick={() => handleCardClick(card.title)}
            />
          );
        })}
      </main>
      <Footer />
      <button
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-purpleblue p-4 
        rounded-full shadow-lg hover:bg-blue-600 font-bold"
        onClick={toggleModal}
      >
        +
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default DocumentManager;
