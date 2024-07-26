import React, { useState } from 'react';
import axios from 'axios';

const SendFriendRequest = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');

  const sendRequest = async () => {
    try {
      const response = await axios.post('/friend-request', { senderId, receiverId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
};

export default SendFriendRequest;
