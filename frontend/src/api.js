import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

export const verifyAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verification failed' };
  }
};

export const getDashboardContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch dashboard content' };
  }
};

export const getSummaryChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/summary/chart`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch summary chart data' };
  }
};

export const getReportsChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/chart`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch reports chart data' };
  }
};
