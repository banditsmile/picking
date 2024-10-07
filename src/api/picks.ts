import axios from 'axios';

const API_URL = '/adminapi';

export const getPicks = async (page: number, limit: number = 10) => {
  return axios.get(`${API_URL}/picks`, {
    params: { page, limit, sort: 'need_time', order: 'desc' }
  });
};

export const getPickDetails = async (id: string) => {
  return axios.get(`${API_URL}/pick/${id}`);
};

export const updatePickStatus = async (id: string, status: number) => {
  return axios.post(`${API_URL}/pick/update`, { id, status });
};

export const updatePickGoodsStatus = async (id: number, status: number) => {
  return axios.post(`${API_URL}/pick/goods/update`, { id, status });
};

export const deletePickGoods = async (id: number) => {
  return axios.post(`${API_URL}/pick/goods/update`, { id, is_del: 1 });
};