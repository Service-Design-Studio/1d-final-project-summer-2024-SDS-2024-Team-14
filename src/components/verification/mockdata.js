const mockData = [
  { id: 1, name: 'Health Approved.pdf', status: 'Approved', category: 'health' },
  { id: 2, name: 'Health Pending A.docx', status: 'Pending', category: 'health', lastModifiedDate: '20-07-23' },
  { id: 3, name: 'Health Pending B.docx', status: 'Pending', category: 'health', lastModifiedDate: '19-07-23' },
  { id: 4, name: 'Health Rejected A.jpg', status: 'Rejected', category: 'health', lastModifiedDate: '18-07-23' },
  { id: 5, name: 'Health Rejected B.jpg', status: 'Rejected', category: 'health', lastModifiedDate: '17-07-23' },
  { id: 6, name: 'Health Rejected C.jpg', status: 'Rejected', category: 'health', lastModifiedDate: '16-07-23' },
  { id: 8, name: 'Career Pending A.docx', status: 'Pending', category: 'career', lastModifiedDate: '20-07-23' },
  { id: 9, name: 'Career Pending B.docx', status: 'Pending', category: 'career', lastModifiedDate: '19-07-23' },
  { id: 10, name: 'Career Rejected A.jpg', status: 'Rejected', category: 'career', lastModifiedDate: '18-07-23' },
  { id: 11, name: 'Career Rejected B.jpg', status: 'Rejected', category: 'career', lastModifiedDate: '17-07-23' },
  { id: 12, name: 'Career Rejected C.jpg', status: 'Rejected', category: 'career', lastModifiedDate: '16-07-23' },
  { id: 13, name: 'Education Approved.pdf', status: 'Approved', category: 'education', lastModifiedDate: '21-07-23' },
  { id: 14, name: 'Education Pending A.docx', status: 'Pending', category: 'education', lastModifiedDate: '20-07-23' },
  { id: 15, name: 'Education Pending B.docx', status: 'Pending', category: 'education', lastModifiedDate: '19-07-23' },
  { id: 16, name: 'Education Rejected A.jpg', status: 'Rejected', category: 'education', lastModifiedDate: '18-07-23' },
  { id: 17, name: 'Education Rejected B.jpg', status: 'Rejected', category: 'education', lastModifiedDate: '17-07-23' },
  { id: 18, name: 'Education Rejected C.jpg', status: 'Rejected', category: 'education', lastModifiedDate: '16-07-23' },
  { id: 19, name: 'Family Approved.pdf', status: 'Approved', category: 'family', lastModifiedDate: '21-07-23' },
  { id: 20, name: 'Family Pending A.docx', status: 'Pending', category: 'family', lastModifiedDate: '20-07-23' },
  { id: 21, name: 'Family Pending B.docx', status: 'Pending', category: 'family', lastModifiedDate: '19-07-23' },
  { id: 22, name: 'Family Rejected A.jpg', status: 'Rejected', category: 'family', lastModifiedDate: '18-07-23' },
  { id: 23, name: 'Family Rejected B.jpg', status: 'Rejected', category: 'family', lastModifiedDate: '17-07-23' },
  { id: 24, name: 'Family Rejected C.jpg', status: 'Rejected', category: 'family', lastModifiedDate: '16-07-23' },
  { id: 25, name: 'Finance Approved.pdf', status: 'Approved', category: 'finance', lastModifiedDate: '21-07-23' },
  { id: 26, name: 'Finance Pending A.docx', status: 'Pending', category: 'finance', lastModifiedDate: '20-07-23' },
  { id: 27, name: 'Finance Pending B.docx', status: 'Pending', category: 'finance', lastModifiedDate: '19-07-23' },
  { id: 28, name: 'Finance Rejected A.jpg', status: 'Rejected', category: 'finance', lastModifiedDate: '18-07-23' },
  { id: 29, name: 'Finance Rejected B.jpg', status: 'Rejected', category: 'finance', lastModifiedDate: '17-07-23' },
  { id: 30, name: 'Finance Rejected C.jpg', status: 'Rejected', category: 'finance', lastModifiedDate: '16-07-23' },
  { id: 31, name: 'Property Approved.pdf', status: 'Approved', category: 'property', lastModifiedDate: '21-07-23' },
  { id: 32, name: 'Property Rejected A.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '18-07-23' },
  { id: 33, name: 'Property Rejected B.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '17-07-23' },
  { id: 34, name: 'Property Rejected C.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 35, name: 'Property Rejected D.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 36, name: 'Property Rejected E.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 37, name: 'Property Rejected F.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 38, name: 'Property Rejected G.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 39, name: 'Property Rejected H.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 40, name: 'Property Rejected I.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 41, name: 'Property Rejected J.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  { id: 42, name: 'Property Rejected K.jpg', status: 'Rejected', category: 'property', lastModifiedDate: '16-07-23' },
  {
    id: 43,
    name: "ESC - PM3.pdf",
    status: "Pending",
    category: "education",
    // type:'pdf',
    file_url: "http://127.0.0.1:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MywicHVyIjoiYmxvYl9pZCJ9fQ==--e7f3e73f2ac2603f292f28e07f0a0240a9d57628/ESC%20-%20PM3.pdf",
    important: "{\n\"team_members\": [\n{\n\"id\": 1006904,\n\"name\": \"Yang Si Jun\"\n},\n{\n\"id\": 1007014,\n\"name\": \"Tejaswini D/O Venketroyalu\"\n},\n{\n\"id\": 1006967,\n\"name\": \"Elliot Phua\"\n}\n],\n\"sprint_2_features\": [\n\"documents management\"\n],\n\"sprint_3_features\": [\n\"notifications feature\",\n\"FAQ Chatbot\"\n],\n\"technologies\": [\n\"OCR\",\n\"Google translate API\",\n\"LLM\",\n\"Vertex AI\",\n\"NextJS\",\n\"Rails\",\n\"Rspec\",\n\"Cypress\",\n\"Cucumber\"\n],\n\"testing_strategies\": [\n\"unit testing\",\n\"integration testing\",\n\"system testing\",\n\"BDD\"\n],\n\"testing_tools\": [\n\"Rspec\",\n\"Cypress\",\n\"Cucumber\"\n],\n\"sprint_timeline\": [\n{\n\"date\": \"30 June\",\n\"feature\": \"ID Card using QR code\"\n},\n{\n\"date\": \"14 Jul\",\n\"feature\": \"Document uploading, scanning and processing\"\n},\n{\n\"date\": \"28 Jul\",\n\"feature\": \"FAQ Chatbot and notification page\"\n},\n{\n\"date\": \"11 Aug\",\n\"feature\": \"Family recognition and authentication\"\n}\n],\n\"figma_link\": \"https://www.figma.com/design/vEKzHB2egNWkGhtdMib8es/SDS-Prototype?node-id=0-1&t=qya\",\n\"figma_contributions\": [\n{\n\"member\": \"Teja\",\n\"contribution\": \"Entire design direction + figma design\"\n},\n{\n\"member\": \"Elliot\",\n\"contribution\": \"Final barrier of entry and tidying up for figma redesign\"\n}\n],\n\"frontend_contributions\": [\n{\n\"member\": \"Si Jun\",\n\"contribution\": \"DevOps, testing, cleaning up members code, setup codebase, chatbot, rework home page, document details page\"\n},\n{\n\"member\": \"Elliot\",\n\"contribution\": \"Login page, home page, testing, scanner page\"\n},\n{\n\"member\": \"Teja\",\n\"contribution\": \"Upload page, testing, documents details page\"\n}\n],\n\"backend_contributions\": [\n{\n\"member\": \"Si Jun\",\n\"contribution\": \"Setup code base, DevOps, DB schema, APIs, Testing, Integrating AI functions from team members research for a education document. Provide the output in JSON format, strictly starting with { and ending with }.\"\n}\n]\n}"
}

];

const categories = ['health', 'career', 'education', 'family', 'finance', 'property'];

const counts = categories.map(category => {
const categoryDocs = mockData.filter(doc => doc.category === category);
const verified = categoryDocs.filter(doc => doc.status === 'Approved').length;
const pending = categoryDocs.filter(doc => doc.status === 'Pending').length;
const rejected = categoryDocs.filter(doc => doc.status === 'Rejected').length;
return {
  category,
  counts: {
    verified,
    pending,
    rejected
  }
};
});

export { mockData, categories, counts };
