import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomerById } from '../services/customerService';
import { getPoliciesByCustomer } from '../services/policyService';
import { getDocumentsByCustomer } from '../services/documentService';

function CustomerHistory() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getCustomerById(id).then((res) => setCustomer(res.data));
    getPoliciesByCustomer(id).then((res) => setPolicies(res.data));
    getDocumentsByCustomer(id).then((res) => setDocuments(res.data));
  }, [id]);

  if (!customer) return <p className="text-slate-300">Loading...</p>;

  return (
    <div>
      <Link to="/customers" className="text-blue-400 hover:underline">← Back to Customers</Link>

      <h1 className="text-3xl font-bold text-white mt-4 mb-2">{customer.name}</h1>
      <p className="text-slate-400 mb-6">{customer.email} | {customer.phone} | {customer.address}</p>

      <h2 className="text-xl font-semibold text-white mb-3">Policies</h2>
      <table className="w-full text-left text-slate-300 mb-8">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">Policy No.</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id} className="border-b border-slate-800">
              <td className="py-2">{p.policyNumber}</td>
              <td>{p.policyType}</td>
              <td>₹{p.premiumAmount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
          {policies.length === 0 && <tr><td className="py-2 text-slate-500">No policies yet</td></tr>}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold text-white mb-3">Documents</h2>
      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">File Name</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr key={d.id} className="border-b border-slate-800">
              <td className="py-2">{d.fileName}</td>
              <td>{d.uploadedAt}</td>
            </tr>
          ))}
          {documents.length === 0 && <tr><td className="py-2 text-slate-500">No documents yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerHistory;