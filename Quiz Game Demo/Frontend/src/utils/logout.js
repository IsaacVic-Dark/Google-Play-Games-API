import axios from 'axios';

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:3000/logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out', error);
    throw new Error('Logout failed');
  }
};
