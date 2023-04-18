import axios from 'axios';

export const getApplications = () => {
  return axios.get('http://localhost:5020/applications/getall')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const getApplicationById = (id) => {
  return axios.get(`http://localhost:5020/applications/getOne/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const createApplication = (data) => {
  return axios.post("http://localhost:5020/applications/add", data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
              throw error.response?.data?.error || error.message || 'Error creating application';

    });
};

export const updateApplication = (id, data) => {
  return axios.put(`http://localhost:5020/applications/edit/${id}`, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
              throw error.response?.data?.error || error.message || 'Error updating application';

    });
};

export const deleteApplication = (id) => {
  return axios.delete(`http://localhost:5020/applications/delete/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error.response?.data?.error || error.message || 'Error deleting application';
    });
};


