import axios from 'axios';

// Set the API URL
const API_URL = 'https://d92.onrender.com';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Set base URL for all requests
axios.defaults.baseURL = API_URL;

// Add response interceptor to handle errors
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject({ message: 'An unexpected error occurred.' });
    }
  }
);

// Add request interceptor to include token in headers
axios.interceptors.request.use(
  config => {
    // Get token from cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get('/api/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const verifyAuth = async () => {
  try {
    const response = await axios.get('/api/auth/verify');
    return response.data;
  } catch (error) {
    console.error('Auth verification error:', error);
    throw error;
  }
};

export const getDashboardContent = async () => {
  try {
    const response = await axios.get('/api/dashboard');
    return response.data;
  } catch (error) {
    console.error('Dashboard content error:', error);
    throw error;
  }
};

export const getSummaryChartData = async () => {
  try {
    const response = await axios.get('/api/summary/chart');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch summary chart data' };
  }
};

export const getReportsChartData = async () => {
  try {
    const response = await axios.get('/api/reports/chart');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch reports chart data' };
  }
};
