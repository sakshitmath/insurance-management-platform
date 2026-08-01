import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, updateCustomer, getCustomerById } from '../services/customerService';

function CustomerForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', dob: '', phone: '', address: '', email: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getCustomerById(id).then((res) => setFormData(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await updateCustomer(id, formData);
      } else {
        await createCustomer(formData);
      }
      navigate('/customers');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">
        {isEdit ? 'Edit Customer' : 'Add Customer'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg max-w-md space-y-4">
        {error && <p className="text-red-400">{error}</p>}

        <input
          type="text" name="name" placeholder="Name"
          value={formData.name} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="date" name="dob"
          value={formData.dob} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="text" name="phone" placeholder="Phone"
          value={formData.phone} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="text" name="address" placeholder="Address"
          value={formData.address} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white" required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;