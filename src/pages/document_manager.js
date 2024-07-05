// // src/components/document_manager/DocumentManager.js
// import Header from '../components/dm_header';
// import Footer from '../components/document_manager/dm_footer';
// import Card from '../components/document_manager/dm_card';


// function DocumentManager() {
//   return (
//     <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
//       <Header />
//       <main className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
//         <Card title="Health" date="24 Dec 2020" color="blue" />
//         <Card title="Career" date="24 Dec 2020" color="purple" />
//         <Card title="Education" date="23 Dec 2020" color="pink" />
//         <Card title="Family" date="24 Dec 2020" color="blue" />
//         <Card title="Finance" date="24 Dec 2020" color="purple" />
//         <Card title="Property" date="23 Dec 2020" color="pink" />
//         <Card title="Pattern" date="24 Dec 2020" color="blue" />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default DocumentManager;

// src/pages/document_manager.js
import React from 'react';
import Header from '../components/dm_header';
import Footer from '../components/document_manager/dm_footer';
import Card from '../components/document_manager/dm_card';

const DocumentManager = () => {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      <Header />
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
        <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Health" date="24 Dec 2020" />
        <Card bgColor="bg-purple-100" iconColor="text-purple-600" title="Career" date="24 Dec 2020" />
        <Card bgColor="bg-pink-100" iconColor="text-pink-600" title="Education" date="23 Dec 2020" />
        <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Family" date="24 Dec 2020" />
        <Card bgColor="bg-purple-100" iconColor="text-purple-600" title="Finance" date="24 Dec 2020" />
        <Card bgColor="bg-pink-100" iconColor="text-pink-600" title="Property" date="23 Dec 2020" />
        <Card bgColor="bg-blue-100" iconColor="text-blue-600" title="Pattern" date="24 Dec 2020" />
      </main>
      <Footer />
    </div>
  );
};

export default DocumentManager;




