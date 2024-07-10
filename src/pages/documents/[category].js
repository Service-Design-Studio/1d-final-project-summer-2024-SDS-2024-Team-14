import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import DocumentCard from '../../components/document_manager/d_card';
import Footer from '../../components/document_manager/dm_footer'; // Import the Footer component
import Card from '../../components/document_manager/dm_listing'
import '../../styles/globals.css';
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import Accordion from "../../components/document_manager/Accordion"


const DocumentStatusPage = () => {
  const router = useRouter();
  const category = router.query.category
  // const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const backButtonUrl = "/documents";
  let userID;

  // const mockData = [
  //   { id: 1, name: 'Health Document 1', status: 'verified', category: 'health' },
  //   { id: 2, name: 'Health Document 2', status: 'pending', category: 'health' },
  //   { id: 3, name: 'Health Document 3', status: 'verified', category: 'health' },
  //   { id: 4, name: 'Health Document 4', status: 'rejected', category: 'health' },
  //   { id: 5, name: 'Career Document 1', status: 'verified', category: 'career' },
  //   { id: 6, name: 'Career Document 2', status: 'pending', category: 'career' },
  //   { id: 7, name: 'Career Document 3', status: 'rejected', category: 'career' },
  //   { id: 8, name: 'Finance Document 1', status: 'verified', category: 'finance' },
  //   { id: 9, name: 'Finance Document 2', status: 'pending', category: 'finance' },
  //   { id: 10, name: 'Education Document 3', status: 'verified', category: 'education' },
  //   { id: 11, name: 'Family Document 4', status: 'rejected', category: 'family' },
  //   { id: 12, name: 'Family Document 1', status: 'verified', category: 'family' },
  //   { id: 13, name: 'Property Document 2', status: 'pending', category: 'property' },
  //   { id: 14, name: 'Property Document 3', status: 'rejected', category: 'property' },
  // ];

  useEffect(() => {
      // const filteredDocuments = mockData.filter((doc) => doc.category === category);
      // setDocuments(filteredDocuments);
      if (category){
          const fetchData = async () => {
              userID = localStorage.getItem("userID")
              try {
                  await axiosInstance.post(`/document/retrieve`, {id: userID, category: category}).then((resp) => {
                          setData(resp.data)
                      }
                  );
              } catch (error) {
                  console.error(error.message);
              } finally {
                  setLoading(false);
              }
          }
          fetchData();
      }
  }, [category]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  if (!category) {
    return <div>Loading...</div>;
  }

  // Group documents by status
  const documents = data.documents
  const pendingDocuments = documents.filter((doc) => doc.status === 'Pending');
  const approvedDocuments = documents.filter((doc) => doc.status === 'Approved');
  const rejectedDocuments = documents.filter((doc) => doc.status === 'Rejected');

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
        <div className="flex-grow">
        <Header title={category} backButton={backButtonUrl}/>
      {/*<div className="flex-1">*/}
          {/*<h2 className="text-3xl text-blue-600 font-bold mb-8">Pending Documents:</h2>*/}
        {data && <Accordion title="Approved Documents" documents={approvedDocuments}/>}
        {data && <Accordion title="Pending Documents" documents={pendingDocuments}/>}
        {data && <Accordion title="Rejected Documents" documents={rejectedDocuments}/>}
        </div>
        {/*<div className="grid grid-cols-2 w-[95%] mx-auto gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 flex-grow">*/}
      {/*    {data && data.documents ? (*/}
      {/*  data.documents.map((document) => (*/}
      {/*    <Card url={document.file_url} title={document.name}/>*/}
      {/*  ))*/}
      {/*) : (*/}
      {/*  <p>No documents available</p>*/}
      {/*)}*/}
          {/*{pendingDocuments.map((doc) => (*/}
          {/*  <DocumentCard key={doc.id} document={doc} />*/}
          {/*))}*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <h2 className="text-3xl text-blue-600 font-bold my-8">Verified Documents:</h2>*/}
      {/*    {verifiedDocuments.map((doc) => (*/}
      {/*      <DocumentCard key={doc.id} document={doc} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <h2 className="text-3xl text-blue-600 font-bold my-8">Rejected Documents:</h2>*/}
      {/*    {rejectedDocuments.map((doc) => (*/}
      {/*      <DocumentCard key={doc.id} document={doc} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Footer />
    </div>
  );
};

export default DocumentStatusPage;









