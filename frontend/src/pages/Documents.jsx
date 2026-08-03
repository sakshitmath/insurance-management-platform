import { useEffect, useRef, useState } from 'react';
import { getDocumentsByCustomer, uploadDocument, downloadDocument } from '../services/documentService';
import { getAllCustomers } from '../services/customerService';

function Documents() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    getAllCustomers().then((res) => setCustomers(res.data));
  }, []);

  const loadDocuments = async (id) => {
    if (!id) return setDocuments([]);
    try {
      const res = await getDocumentsByCustomer(id);
      setDocuments(res.data);
    } catch (err) {
      setError('Failed to load documents');
    }
  };

  const handleCustomerChange = (e) => {
    const id = e.target.value;
    setCustomerId(id);
    loadDocuments(id);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    if (!customerId || !file) return setError('Select customer and file');
    try {
      await uploadDocument(customerId, file);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadDocuments(customerId);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const res = await downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Download failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Documents</h1>

      <div className="bg-slate-800 p-6 rounded-lg max-w-md space-y-4 mb-8">
        <select
          value={customerId} onChange={handleCustomerChange}
          className="w-full p-2 rounded bg-slate-700 text-white"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <form onSubmit={handleUpload} className="space-y-4">
          {error && <p className="text-red-400">{error}</p>}

          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-600"
          >
            {file ? file.name : 'Choose File'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Upload
          </button>
        </form>
      </div>

      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2">File Name</th>
            <th>Uploaded At</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr key={d.id} className="border-b border-slate-800">
              <td className="py-2">{d.fileName}</td>
              <td>{d.uploadedAt}</td>
              <td>
                <button onClick={() => handleDownload(d.id, d.fileName)} className="text-blue-400 hover:underline">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Documents;