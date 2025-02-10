import axios from 'axios';

const localURL = 'http://localhost:8000';
const hostedURL = 'https://byte-ecommerce-api.onrender.com';

const baseURL = process.env.NODE_ENV === 'development' ? localURL : hostedURL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

export default axiosInstance;

