// pages/[category].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import DocumentCard from '../../components/document_manager/d_card';
import Footer from '../../components/document_manager/dm_footer'; // Import the Footer component
import '../../styles/globals.css';


const DocumentStatusPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [documents, setDocuments] = useState([]);
  const backButtonUrl = "/documents";

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


  useEffect(() => {
    if (category) {
      const filteredDocuments = mockData.filter((doc) => doc.category === category);
      setDocuments(filteredDocuments);
    }
  }, [category]);

  if (!category) {
    return <div>Loading...</div>;
  }

  // Group documents by status
  const pendingDocuments = documents.filter((doc) => doc.status === 'pending');
  const verifiedDocuments = documents.filter((doc) => doc.status === 'verified');
  const rejectedDocuments = documents.filter((doc) => doc.status === 'rejected');

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
      <Header category={category} backButton={backButtonUrl}/>
      <div className="mt-4 flex-1">
        <div>
          <h2 className="text-lg text-blue-600 font-bold my-4">Pending Documents:</h2>
          {pendingDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
        <div>
          <h2 className="text-lg text-blue-600 font-bold my-4">Verified Documents:</h2>
          {verifiedDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
        <div>
          <h2 className="text-lg text-blue-600 font-bold my-4">Rejected Documents:</h2>
          {rejectedDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentStatusPage;









