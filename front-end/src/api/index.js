import axios from 'axios';

// development url http://localhost:5000/api/v1/
// production url https://dm-national-museum-of-scotland.herokuapp.com/api/v1/

axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
axios.defaults.withCredentials = true;

export default axios;
