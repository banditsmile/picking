import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPickDetails, updatePickStatus, updatePickGoodsStatus, deletePickGoods } from '../api/picks';
import { PickDetails as PickDetailsType, PickGoodsItem } from '../types';

const PickDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pickDetails, setPickDetails] = useState<PickDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPickDetails();
  }, [id]);

  const fetchPickDetails = async () => {
    setLoading(true);
    try {
      const response = await getPickDetails(id!);
      setPickDetails(response.data);
    } catch (error) {
      console.error('Error fetching pick details:', error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (status: number) => {
    try {
      await updatePickStatus(id!, status);
      fetchPickDetails();
    } catch (error) {
      console.error('Error updating pick status:', error);
    }
  };

  const handleGoodsStatusChange = async (goodsId: number, status: number) => {
    try {
      await updatePickGoodsStatus(goodsId, status);
      fetchPickDetails();
    } catch (error) {
      console.error('Error updating goods status:', error);
    }
  };

  const handleDeleteGoods = async (goodsId: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deletePickGoods(goodsId);
        fetchPickDetails();
      } catch (error) {
        console.error('Error deleting goods:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pickDetails) {
    return <div>Pick not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pick Details</h1>
      <div className="mb-4">
        <p>Customer: {pickDetails.customer}</p>
        <p>Status: {pickDetails.status === 0 ? 'Pending' : 'Completed'}</p>
        <p>Type: {pickDetails.delivery_type === 'pickup' ? 'Pickup' : 'Delivery'}</p>
        <p>Need Time: {new Date(pickDetails.need_time).toLocaleString()}</p>
      </div>
      <div className="mb-4">
        <button
          onClick={() => handleStatusChange(pickDetails.status === 0 ? 1 : 0)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {pickDetails.status === 0 ? 'Mark as Completed' : 'Mark as Pending'}
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Goods</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pickDetails.data.map((item: PickGoodsItem) => (
            <tr key={item.id} className={item.status === 1 ? 'bg-green-100' : ''}>
              <td className="border p-2">{item.item_no}</td>
              <td className="border p-2">{item.store_name}</td>
              <td className="border p-2">{item.num}</td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={item.status === 1}
                  onChange={() => handleGoodsStatusChange(item.id, item.status === 0 ? 1 : 0)}
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteGoods(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickDetails;