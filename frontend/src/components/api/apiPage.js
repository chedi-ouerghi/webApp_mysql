import { message } from 'antd';
import axios from 'axios';

export const getpage = () => {
  return axios.get('http://localhost:5020/page/getall')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error getting Pages';
    });
};
export const createPage = (data) => {
  return axios.post('http://localhost:5020/page/create', data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error creating Page';
    });
};

export const updatePage = (id, data) => {
  return axios.put(`http://localhost:5020/page/edit/${id}`, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error updating Page';
    });
};

export const deletePage = (id) => {
  return axios.delete(`http://localhost:5020/page/delete/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      message.error('Error deleting Page');
    });
};
