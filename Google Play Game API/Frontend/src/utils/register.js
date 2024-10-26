import axios from 'axios';

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name,
      email,
      password,
    }, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw new Error(error.response.data.message || 'Registration failed');
  }
};
