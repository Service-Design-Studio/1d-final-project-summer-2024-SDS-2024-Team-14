// src/components/document_manager/DocumentManager.js
import React from 'react';
import Header from '../dm_header';
import Footer from './dm_footer';
import Card from './dm_card';

function DocumentManager() {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <Card title="Health" date="24 Dec 2020" color="blue" />
        <Card title="Career" date="24 Dec 2020" color="purple" />
        <Card title="Education" date="23 Dec 2020" color="pink" />
        <Card title="Family" date="24 Dec 2020" color="blue" />
        <Card title="Finance" date="24 Dec 2020" color="purple" />
        <Card title="Property" date="23 Dec 2020" color="pink" />
        <Card title="Pattern" date="24 Dec 2020" color="blue" />
      </main>
      <Footer />
    </div>
  );
}

export default DocumentManager;
