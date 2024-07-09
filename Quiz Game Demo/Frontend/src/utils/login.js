import axios from 'axios';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/login', { email, password });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};
