import { message } from 'antd';
import axios from 'axios';

export const getModules = () => {
  return axios.get('http://localhost:5020/module/getall')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error getting modules';
    });
};

export const createModule = (data) => {
  return axios.post('http://localhost:5020/module/create', data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error creating module';
    });
};

export const updateModule = (id, data) => {
  return axios.put(`http://localhost:5020/module/edit/${id}`, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error updating module';
    });
};

export const deleteModule = (id) => {
  return axios.delete(`http://localhost:5020/module/delete/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      message.error('Error deleting module');
    });
};
