import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mockData } from '@/components/verification/mockdata';
import Header from '@/components/document_manager/dm_header';
import DocumentStatusPage from "@/components/verification/DocumentStatusPage";

const DocumentStatusPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [documents, setDocuments] = useState([]);

  const categories = [
    'health',
    'career',
    'finance',
    'education',
    'family',
    'property',
  ];

  useEffect(() => {
    if (category) {
      const filteredDocuments = mockData.filter(doc => doc.category === category);
      setDocuments(filteredDocuments);
    }
  }, [category]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      <Header categories={categories} activeCategory={category} />
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Documents</h1>
      <DocumentStatusPage documents={documents} />
    </div>
  );
};

export default DocumentStatusPage;