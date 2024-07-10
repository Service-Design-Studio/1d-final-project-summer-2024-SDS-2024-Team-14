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

const backButtonUrl = "/"; // Define the backButton URL here

const DocumentManager = () => {
    useAuth();

    const handleCardClick = (title) => {
      console.log(`Clicked on card with title: ${title}`);
      // Add more actions as needed
  };

  const cards = [
    { title: 'Health', date: '24 Dec 2020', bgColor: 'bg-lightblue', iconColor: 'text-blue-600' },
    { title: 'Career', date: '24 Dec 2020', bgColor: 'bg-lightpurple', iconColor: 'text-purple-600' },
    { title: 'Education', date: '23 Dec 2020', bgColor: 'bg-lightpink', iconColor: 'text-darkpink' },
    { title: 'Family', date: '24 Dec 2020', bgColor: 'bg-lightblue', iconColor: 'text-blue-600' },
    { title: 'Finance', date: '24 Dec 2020', bgColor: 'bg-lightpurple', iconColor: 'text-purple-600' },
    { title: 'Property', date: '23 Dec 2020', bgColor: 'bg-lightpink', iconColor: 'text-pink-600' },
    { title: 'Pattern', date: '24 Dec 2020', bgColor: 'bg-lightblue', iconColor: 'text-blue-600' },
  ];

  
  return (
    <div className="h-screen bg-white p-4 flex flex-col justify-between">
      <Header title="Document Manager" backButton={backButtonUrl} /> {/* Pass backButton prop */}
      <main className="grid grid-cols-2 pb-2 w-[95%] overflow-auto mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} date={card.date} bgColor={card.bgColor} iconColor={card.iconColor} onClick={handleCardClick} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default DocumentManager;


