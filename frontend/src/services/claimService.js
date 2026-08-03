import api from './api';

export const getAllClaims = () => api.get('/claims');
export const getClaimsByPolicy = (policyId) => api.get(`/claims/policy/${policyId}`);
export const getClaimsByStatus = (status) => api.get(`/claims/status/${status}`);
export const submitClaim = (data) => api.post('/claims', data);
export const approveClaim = (id) => api.put(`/claims/${id}/approve`);
export const rejectClaim = (id) => api.put(`/claims/${id}/reject`);