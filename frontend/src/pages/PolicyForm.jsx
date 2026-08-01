import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPolicy } from '../services/policyService';
import { getAllCustomers } from '../services/customerService';

function PolicyForm() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '', policyType: '', policyNumber: '',
    premiumAmount: '', startDate: '', endDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCustomers().then((res) => setCustomers(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createPolicy(formData);
      navigate('/policies');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Add Policy</h1>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg max-w-md space-y-4">
        {error && <p className="text-red-400">{error}</p>}

        <select
          name="customerId" value={formData.customerId} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          type="text" name="policyType" placeholder="Policy Type (e.g. Health Insurance)"
          value={formData.policyType} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="text" name="policyNumber" placeholder="Policy Number"
          value={formData.policyNumber} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="number" name="premiumAmount" placeholder="Premium Amount"
          value={formData.premiumAmount} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <label className="block text-slate-400 text-sm">Start Date</label>
        <input
          type="date" name="startDate"
          value={formData.startDate} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <label className="block text-slate-400 text-sm">End Date</label>
        <input
          type="date" name="endDate"
          value={formData.endDate} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Policy
        </button>
      </form>
    </div>
  );
}

export default PolicyForm;