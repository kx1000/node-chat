import axios from 'axios';

export default {
    loginByToken(token) {
        return axios.post('/users/login', {
            token: token,
        });
    },
    logout() {
        return axios.post('/users/logout');
    },
    fetchCurrentUser() {
        return axios.get('/users/current');
    }
}