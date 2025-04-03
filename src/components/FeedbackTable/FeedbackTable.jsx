import { useState, useEffect } from 'react';

const FeedbackTable = ({ parkId, feedbacks }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertToCSV = (data) => {
    const headers = ['Id', 'Subject', 'Text', 'User', 'Created At'];
    
    const csvRows = [];
    // Add header row
    csvRows.push(headers.join(','));
    
    // Add data rows
    data.forEach((item) => {
      const row = [
        item.id,
        `"${item.subject.replace(/"/g, '""')}"`, // Escape quotes in subject
        `"${item.text.replace(/"/g, '""')}"`, // Escape quotes in text
        `"${item.user.name.replace(/"/g, '""')}"`, // Escape quotes in user name
        item.createdAt ? new Date(item.createdAt).toLocaleString() : ''
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(feedbacks);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `park-${parkId}-feedbacks.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">All Feedbacks</h2>
        <button
          onClick={downloadCSV}
          disabled={loading || !feedbacks || feedbacks.length === 0}
          className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CSV
        </button>
      </div>
      
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading feedbacks...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">{error}</div>
      ) : !feedbacks || feedbacks.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No feedbacks available for this park.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.text}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(feedback.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;