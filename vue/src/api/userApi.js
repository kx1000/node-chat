import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_BACKEND_API_URL;

export default {
    loginByToken(token) {
        return axios.post(apiBaseUrl + '/users/login', {
            token: token,
        });
    }
}