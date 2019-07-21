import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:9001';
/* axios.create({
    baseURL: 'http://127.0.0.1:9001',
    timeout: 1000,
    headers: {}
}); */


export default axios