import api from './api';

export const getAllPolicies = () => api.get('/policies');
export const getPolicyById = (id) => api.get(`/policies/${id}`);
export const getPoliciesByCustomer = (customerId) => api.get(`/policies/customer/${customerId}`);
export const createPolicy = (data) => api.post('/policies', data);
export const renewPolicy = (id, newEndDate) => api.put(`/policies/${id}/renew?newEndDate=${newEndDate}`);
export const cancelPolicy = (id) => api.put(`/policies/${id}/cancel`);