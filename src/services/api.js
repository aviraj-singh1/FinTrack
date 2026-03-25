import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
  timeout: 10000,
});

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const response = await api.get(`/${baseCurrency}`);
  return response.data;
};

export default api;
