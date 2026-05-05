import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s timeout for AI operations
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const analyzeResume = async (portfolioId) => {
  const response = await api.post('/analyze', { portfolioId });
  return response.data;
};

export const getPortfolio = async (id) => {
  const response = await api.get(`/portfolio/${id}`);
  return response.data;
};

export const getAllPortfolios = async () => {
  const response = await api.get('/portfolio');
  return response.data;
};

export const getThemes = async () => {
  const response = await api.get('/themes');
  return response.data;
};

export const updateTheme = async (id, theme) => {
  const response = await api.put(`/portfolio/${id}/theme`, { theme });
  return response.data;
};

export const getScore = async (id) => {
  const response = await api.get(`/score/${id}`);
  return response.data;
};

export const deletePortfolio = async (id) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};

export default api;
