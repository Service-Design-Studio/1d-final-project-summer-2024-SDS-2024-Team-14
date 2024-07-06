import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/document_manager/dm_footer';
import Card from '../../components/document_manager/dm_card';
import "../../styles/globals.css"
import useAuth from "@/hooks/useAuth";

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

const DocumentManager = () => {
    useAuth();
  const cards = [
    { title: 'Health', date: '24 Dec 2020', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Career', date: '24 Dec 2020', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: 'Education', date: '23 Dec 2020', bgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
    { title: 'Family', date: '24 Dec 2020', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Finance', date: '24 Dec 2020', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: 'Property', date: '23 Dec 2020', bgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
    { title: 'Pattern', date: '24 Dec 2020', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      <Header title="Document Manager"/>
      <main className="grid grid-cols-2 w-[95%] mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow"> {/* Increased gap value */}
        {cards.map((card, index) => (
          <Card key={index} title={card.title} date={card.date} bgColor={card.bgColor} iconColor={card.iconColor} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default DocumentManager;


