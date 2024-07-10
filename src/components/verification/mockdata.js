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

const categories = ['health', 'career', 'education', 'family', 'finance', 'property'];

const counts = categories.map(category => {
  const categoryDocs = mockData.filter(doc => doc.category === category);
  const verified = categoryDocs.filter(doc => doc.status === 'verified').length;
  const pending = categoryDocs.filter(doc => doc.status === 'pending').length;
  const rejected = categoryDocs.filter(doc => doc.status === 'rejected').length;
  return {
    category,
    counts: {
      verified,
      pending,
      rejected
    }
  };
});

console.log(counts);