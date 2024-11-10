import React, { useEffect, useState } from 'react';

const VotePage = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      // Replace with your API call to get eligible elections
      const response = await fetch('/api/elections/eligible');
      const data = await response.json();
      setElections(data);
    };

    fetchElections();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-blue-600 rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
        <h1 className="text-blue-600 text-2xl font-bold mb-4">Vote</h1>
        {elections.length > 0 ? (
          <ul className="list-none">
            {elections.map((election) => (
              <li
                key={election.id}
                className="border border-blue-400 rounded-lg p-2 my-2 bg-blue-50"
              >
                {election.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No active elections available for voting.</p>
        )}
      </div>
    </div>
  );
};

export default VotePage;
