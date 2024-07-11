import React, {useEffect} from 'react';
import Header from '../../components/header';
import Footer from '../../components/document_manager/dm_footer';
import Card from '../../components/document_manager/dm_card';
import "../../styles/globals.css"
import useAuth from "@/hooks/useAuth";
import {ReactNotifications, Store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import {useRouter} from "next/router";


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
        const status = localStorage.getItem('status');
        if (message) {
            if (status==="success") {
                Store.addNotification({
                    title: "Success",
                    message: message,
                    type: "success",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
            else {
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
            }
        localStorage.removeItem('notificationMessage'); // Clear the message after displaying
        localStorage.removeItem('status'); // Clear the message after displaying
    }
  }, []);
    const router = useRouter();
    useAuth();

    const handleCardClick = (title) => {
        router.push(`/documents/${title.toLowerCase()}`)
      // Add more actions as needed
  };

  const cards = [
    { title: 'Health', bgColor: 'bg-lightblue', iconColor: 'text-blue-600' },
    { title: 'Career', bgColor: 'bg-lightpurple', iconColor: 'text-purple-600' },
    { title: 'Education', bgColor: 'bg-lightpink', iconColor: 'text-darkpink' },
    { title: 'Family', bgColor: 'bg-lightblue', iconColor: 'text-blue-600' },
    { title: 'Finance', bgColor: 'bg-lightpurple', iconColor: 'text-purple-600' },
    { title: 'Property', bgColor: 'bg-lightpink', iconColor: 'text-pink-600' },
  ];

  
  return (
      <>
      <ReactNotifications/>
      <div className="h-screen bg-white p-4 flex flex-col justify-between">
          <div className="flex-grow">
        <Header title="Document Manager" backButton={backButtonUrl} /> {/* Pass backButton prop */}
        <main className="grid grid-cols-2 pb-2 w-[95%] overflow-auto mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} bgColor={card.bgColor} iconColor={card.iconColor} onClick={handleCardClick} />
          ))}
        </main>
       </div>
          <Footer />
      </div>
      </>
  );
};

export default DocumentManager;


