import React, { useEffect, useState } from 'react';

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      // Replace with your API call to get results for elections the user has voted in
      const response = await fetch('/api/elections/results');
      const data = await response.json();
      setResults(data);
    };

    fetchResults();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-green-600 rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
        <h1 className="text-green-600 text-2xl font-bold mb-4">Election Results</h1>
        {results.length > 0 ? (
          <ul className="list-none">
            {results.map((result) => (
              <li
                key={result.id}
                className="border border-green-400 rounded-lg p-2 my-2 bg-green-50"
              >
                <h2 className="font-semibold">{result.electionTitle}</h2>
                <p className="text-gray-700">Winner: {result.winner}</p>
                <p className="text-gray-600">Votes: {result.votes}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No results available for the elections you voted in.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
