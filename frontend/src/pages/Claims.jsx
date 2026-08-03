import { useEffect, useState } from 'react';
import { getAllClaims, submitClaim, approveClaim, rejectClaim } from '../services/claimService';
import { getAllPolicies } from '../services/policyService';
import { useAuth } from '../context/AuthContext';

function Claims() {
  const { role } = useAuth();
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({ policyId: '', claimAmount: '', reason: '' });
  const [error, setError] = useState('');

  const canReview = role === 'ADMIN' || role === 'AGENT';

  const loadClaims = async () => {
    try {
      const res = await getAllClaims();
      setClaims(res.data);
    } catch (err) {
      setError('Failed to load claims');
    }
  };

  useEffect(() => {
    loadClaims();
    getAllPolicies().then((res) => setPolicies(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await submitClaim(formData);
      setFormData({ policyId: '', claimAmount: '', reason: '' });
      loadClaims();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit claim');
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveClaim(id);
      loadClaims();
    } catch (err) {
      setError(err.response?.data?.message || 'Approve failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectClaim(id);
      loadClaims();
    } catch (err) {
      setError(err.response?.data?.message || 'Reject failed');
    }
  };

  const statusColor = (status) => {
    if (status === 'APPROVED') return 'text-green-400';
    if (status === 'REJECTED') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Claims</h1>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg max-w-md space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-white">Submit Claim</h2>
        {error && <p className="text-red-400">{error}</p>}

        <select
          name="policyId" value={formData.policyId} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        >
          <option value="">Select Policy</option>
          {policies.map((p) => (
            <option key={p.id} value={p.id}>{p.policyNumber} - {p.customerName}</option>
          ))}
        </select>

        <input
          type="number" name="claimAmount" placeholder="Claim Amount"
          value={formData.claimAmount} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <textarea
          name="reason" placeholder="Reason for claim"
          value={formData.reason} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Claim
        </button>
      </form>

      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">Policy No.</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            {canReview && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => (
            <tr key={c.id} className="border-b border-slate-800">
              <td className="py-2">{c.policyNumber}</td>
              <td>₹{c.claimAmount}</td>
              <td>{c.reason}</td>
              <td>{c.submissionDate}</td>
              <td className={statusColor(c.status)}>{c.status}</td>
              {canReview && (
                <td className="space-x-3">
                  {c.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleApprove(c.id)} className="text-green-400 hover:underline">Approve</button>
                      <button onClick={() => handleReject(c.id)} className="text-red-400 hover:underline">Reject</button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Claims;