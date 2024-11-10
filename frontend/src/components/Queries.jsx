import React from 'react';

const QueriesPage = () => {
  const faqs = [
    {
      question: "How can I vote in the elections?",
      answer: "You can vote by navigating to the 'Vote' section and selecting an active election to cast your vote.",
    },
    {
      question: "What should I do if I encounter an issue while voting?",
      answer: "If you face any issues, please reach out to the admin using the contact details provided below.",
    },
    {
      question: "How can I check the election results?",
      answer: "Election results can be viewed in the 'Results' section after the elections conclude.",
    },
    {
      question: "Who can I contact for support?",
      answer: "You can contact our support admin for any inquiries or issues.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-yellow-600 rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
        <h1 className="text-yellow-600 text-2xl font-bold mb-4">FAQs</h1>
        <div className="text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-yellow-400 rounded-lg p-4 my-2 bg-yellow-50">
              <h2 className="font-semibold">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-yellow-600 text-lg font-bold">Contact Admin</h2>
          <p className="text-gray-700">For further clarifications, reach out to:</p>
          <p className="text-gray-700">Email: admin@example.com</p>
          <p className="text-gray-700">Phone: +91-1234567890</p>
        </div>
      </div>
    </div>
  );
};

export default QueriesPage;
