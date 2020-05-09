import axios from 'axios';

axios.defaults.baseURL = 'https://dry-falls-47415.herokuapp.com/api/v1/';
axios.defaults.withCredentials = true;

export default axios;
