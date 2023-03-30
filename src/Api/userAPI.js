import axios from "axios";

const API_URL = "http://localhost:3001";

export const userAPI = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  },
  logout: async () => {
    const response = await axios.post(`${API_URL}/users/logout`);
    return response.data;
  },
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  },
};
