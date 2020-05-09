import axios from 'axios';

axios.defaults.baseURL =
  'https://dm-national-museum-of-scotland.herokuapp.com/api/v1/';
axios.defaults.withCredentials = true;

export default axios;
