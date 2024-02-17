import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    // baseUrl = "http://localhost:8000/api";
    baseUrl = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://chatcom-ec4ad238849d.herokuapp.com';
} else {
    baseUrl = 'http://127.0.0.1:8000';
}

function getIRequestProp() {
    const serverUrl = baseUrl;
    let userData = localStorage.getItem('access');
    let idToken;
    idToken = userData !== null ? userData : '';
    let content_type = 'application/json';
    return {
        serverUrl: serverUrl,
        requestHeader: {
            'Content-Type': content_type,
            'Accept-Language': 'en',
            Authorization: `Bearer ${idToken}`
        }
    };
}

async function get(url) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.get(serverUrl + url, {
        // params: parameter,
        headers: requestHeader
    });
}

async function post(url, body) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.post(serverUrl + url, body, {
        // headers: requestHeader
    });
}

async function put(url, body) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.put(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function patch(url, body) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.patch(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function remove(url, body) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.delete(serverUrl + url, {
        data: body,
        headers: requestHeader
    });
}

const AxiosServices = {
    get,
    post,
    put,
    patch,
    remove
};
export default AxiosServices;
