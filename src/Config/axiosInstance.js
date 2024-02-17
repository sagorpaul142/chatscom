import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs'

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    // baseUrl = "http://localhost:8000/api";
    baseUrl = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://chatcom-ec4ad238849d.herokuapp.com/';
} else {
    baseUrl = 'http://127.0.0.1:8000';
}

let token = localStorage.getItem('device_id') ? JSON.parse(localStorage.getItem('device_id')) : null

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// Add a response interceptor
axios.interceptors.request.use(async req => {
    if(!token){
        token = localStorage.getItem('device_id') ? JSON.parse(localStorage.getItem('device_id')) : null
        req.headers.Authorization = `Bearer ${token}`
    }

    const user = jwt_decode(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`/api/token/refresh/`, {});

    localStorage.setItem('device_id', JSON.stringify(response.data.access))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})