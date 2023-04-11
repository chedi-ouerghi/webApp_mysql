import { message } from 'antd';
import axios from 'axios';

export const getUser = () => {
  return axios.get('http://localhost:5020/user/getall')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error getting users';
    });
};
export const createUser = (data) => {
  return axios.post('http://localhost:5020/user/create', data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error creating user';
    });
};

export const updateUser = (id, data) => {
  return axios.put(`http://localhost:5020/user/edit/${id}`, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error updating user';
    });
};

export const deleteUser = (id) => {
  return axios.delete(`http://localhost:5020/user/delete/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      message.error('Error deleting user');
    });
};
