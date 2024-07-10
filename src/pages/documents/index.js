import React, {useEffect} from 'react';
import Header from '../../components/header';
import Footer from '../../components/document_manager/dm_footer';
import Card from '../../components/document_manager/dm_card';
import "../../styles/globals.css"
import useAuth from "@/hooks/useAuth";
import {ReactNotifications, Store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

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
    useEffect(() => {
        const message = localStorage.getItem('notificationMessage');
        if (message) {
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
        localStorage.removeItem('notificationMessage'); // Clear the message after displaying
    }
  }, []);
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
      <>
          <ReactNotifications/>
        <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
          <Header title="Document Manager" backButton={backButtonUrl} /> {/* Pass backButton prop */}
          <main className="grid grid-cols-2 w-[95%] mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow">
            {cards.map((card, index) => (
              <Card key={index} title={card.title} date={card.date} bgColor={card.bgColor} iconColor={card.iconColor} />
            ))}
          </main>
          <Footer />
        </div>
      </>
  );
};

export default DocumentManager;


