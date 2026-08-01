import { useEffect, useState } from 'react';
import { getAllPayments, recordPayment } from '../services/premiumService';
import { getAllPolicies } from '../services/policyService';

function Premiums() {
  const [payments, setPayments] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({ policyId: '', paymentDate: '', amount: '' });
  const [error, setError] = useState('');

  const loadPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data);
    } catch (err) {
      setError('Failed to load payments');
    }
  };

  useEffect(() => {
    loadPayments();
    getAllPolicies().then((res) => setPolicies(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await recordPayment(formData);
      setFormData({ policyId: '', paymentDate: '', amount: '' });
      loadPayments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Premium Payments</h1>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg max-w-md space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-white">Record Payment</h2>
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
          type="date" name="paymentDate"
          value={formData.paymentDate} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="number" name="amount" placeholder="Amount"
          value={formData.amount} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Record Payment
        </button>
      </form>

      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">Policy No.</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b border-slate-800">
              <td className="py-2">{p.policyNumber}</td>
              <td>{p.paymentDate}</td>
              <td>₹{p.amount}</td>
              <td className="text-green-400">{p.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Premiums;