import api from './api';

export const getDocumentsByCustomer = (customerId) => api.get(`/documents/customer/${customerId}`);

export const uploadDocument = (customerId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/documents/upload/${customerId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const downloadDocumentUrl = (id) => `http://localhost:8081/api/documents/download/${id}`;

export const downloadDocument = (id) => api.get(`/documents/download/${id}`, { responseType: 'blob' });