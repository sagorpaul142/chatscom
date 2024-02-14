import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    // baseUrl = "http://localhost:8000/api";
    baseUrl = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://127.0.0.1:8000';
} else {
    baseUrl = 'http://127.0.0.1:8000';
}

axios.defaults.baseURL = baseUrl;
let refresh = false
axios.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true
        const response = await axios.post('/dj-rest-auth/token/refresh/', {}, {withCredentials: true});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `${response.data.access_token}`
            return axios(error.config)
        }
    }
    refresh = false
    return error;
})
