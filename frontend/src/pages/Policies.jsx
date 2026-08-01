import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPolicies, cancelPolicy } from '../services/policyService';

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState('');

  const loadPolicies = async () => {
    try {
      const res = await getAllPolicies();
      setPolicies(res.data);
    } catch (err) {
      setError('Failed to load policies');
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this policy?')) return;
    try {
      await cancelPolicy(id);
      loadPolicies();
    } catch (err) {
      setError(err.response?.data?.message || 'Cancel failed');
    }
  };

  const statusColor = (status) => {
    if (status === 'ACTIVE') return 'text-green-400';
    if (status === 'CANCELLED') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Policies</h1>
        <Link to="/policies/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Policy
        </Link>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">Policy No.</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id} className="border-b border-slate-800">
              <td className="py-2">{p.policyNumber}</td>
              <td>{p.customerName}</td>
              <td>{p.policyType}</td>
              <td>₹{p.premiumAmount}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
              <td className={statusColor(p.status)}>{p.status}</td>
              <td>
                {p.status === 'ACTIVE' && (
                  <button onClick={() => handleCancel(p.id)} className="text-red-400 hover:underline">
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Policies;