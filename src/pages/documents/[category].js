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
import Loading from '../../components/loading';


const DocumentStatusPage = () => {
  const router = useRouter();
  const category = router.query.category
  // const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const backButtonUrl = "/documents";
  let userID;
  const validCategories = ['health', 'career', 'education', 'family', 'finance', 'property', 'pattern'];

  useEffect(() => {
    // const filteredDocuments = mockData.filter((doc) => doc.category === category);
    // setDocuments(filteredDocuments);
    if (category) {
      if (!validCategories.includes(category)) {
        localStorage.setItem('notificationMessage', 'That was not a valid category!');
        window.location.replace('/documents')
      }
      const fetchData = async () => {
        userID = localStorage.getItem("userID")
        try {
          await axiosInstance.post(`/document/retrieve`, { id: userID, category: category }).then((resp) => {
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
    return <Loading/>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  if (!category) {
    return <Loading/>;
  }

  // Group documents by status
  const documents = data.documents
  const pendingDocuments = documents.filter((doc) => doc.status === 'Pending');
  const approvedDocuments = documents.filter((doc) => doc.status === 'Approved');
  const rejectedDocuments = documents.filter((doc) => doc.status === 'Rejected');

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
      <div className="flex-grow">
        <Header title={category} backButton={backButtonUrl} />
        {/*<div className="flex-1">*/}
        {/*<h2 className="text-3xl text-blue-600 font-bold mb-8">Pending Documents:</h2>*/}
        {data && <Accordion title="Approved Documents" documents={approvedDocuments} />}
        {data && <Accordion title="Pending Documents" documents={pendingDocuments} />}
        {data && <Accordion title="Rejected Documents" documents={rejectedDocuments} />}
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









