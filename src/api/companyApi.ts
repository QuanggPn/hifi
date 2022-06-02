import axiosClient from './axiosClient';

const url = '/suggestion/companies';
const companyApi = {
  getCompanies: async (query: String = '') => {
    return await axiosClient.get(`${url}${query}`);
  },
};

export default companyApi;
