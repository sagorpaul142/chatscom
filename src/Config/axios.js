import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    // baseUrl = "http://localhost:8000/api";
    baseUrl = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://chatcom-ec4ad238849d.herokuapp.com/';
} else {
    baseUrl = 'http://127.0.0.1:8000';
}

axios.defaults.baseURL = baseUrl;
let refresh = false
axios.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true
        let token = localStorage.getItem('refresh');
        console.log(token)
        const response = await axios.post('/dj-rest-auth/token/refresh/', {refresh: token}, {withCredentials: true});
        console.log(response)
        if (response.status === 200) {
            console.log(response.data.access)
            localStorage.setItem('access', response.data.access);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
            return axios(error.config)
        }
    }
    refresh = false
    return error;
})
