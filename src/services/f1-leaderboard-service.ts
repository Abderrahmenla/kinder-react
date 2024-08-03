import axios from 'axios';

export const authenticate = async () => {
  const response = await axios.post('/api/f1-leaderboard-token');
  return response.data.access_token;
};

export const fetchLeaderboard = async (token: string) => {
  const response = await axios.get('/api/f1-leaderboard-campaigns', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
