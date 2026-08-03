import api from './api';

export const getDashboardStats = () => api.get('/reports/dashboard');