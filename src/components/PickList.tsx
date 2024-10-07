import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPicks } from '../api/picks';
import { PickItem } from '../types';

const PickList: React.FC = () => {
  const [picks, setPicks] = useState<PickItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPicks();
  }, [page]);

  const fetchPicks = async () => {
    setLoading(true);
    try {
      const response = await getPicks(page);
      setPicks(response.data.data);
    } catch (error) {
      console.error('Error fetching picks:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pick List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {picks.map((pick) => (
            <Link key={pick.id} to={`/pick/${pick.id}`} className="block">
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-semibold">{pick.customer}</h2>
                <p>Status: {pick.status === 0 ? 'Pending' : 'Completed'}</p>
                <p>Type: {pick.type === 'pickup' ? 'Pickup' : 'Delivery'}</p>
                <p>Need Time: {new Date(pick.need_time).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PickList;