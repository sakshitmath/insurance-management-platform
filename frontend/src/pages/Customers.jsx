import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCustomers, searchCustomers, deleteCustomer } from '../services/customerService';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const loadCustomers = async () => {
    try {
      const res = await getAllCustomers();
      setCustomers(res.data);
    } catch (err) {
      setError('Failed to load customers');
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return loadCustomers();
    try {
      const res = await searchCustomers(search);
      setCustomers(res.data);
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <Link to="/customers/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Customer
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-slate-800 text-white w-64"
        />
        <button type="submit" className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600">
          Search
        </button>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b border-slate-800">
              <td className="py-2">{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td className="space-x-3">
                <Link to={`/customers/${c.id}/edit`} className="text-blue-400 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;