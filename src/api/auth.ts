import axios from 'axios';

const API_URL = '/adminapi';

export const login = async (account: string, pwd: string) => {
  return axios.post(`${API_URL}/login`, { account, pwd });
};