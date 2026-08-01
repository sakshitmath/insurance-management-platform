import api from './api';

export const getAllPayments = () => api.get('/premiums');
export const getPaymentsByPolicy = (policyId) => api.get(`/premiums/policy/${policyId}`);
export const getOverduePayments = () => api.get('/premiums/overdue');
export const recordPayment = (data) => api.post('/premiums', data);