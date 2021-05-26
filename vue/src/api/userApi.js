import axios from 'axios';

export default {
    create(userDto) {
        return axios.post('/users', userDto);
    },
    loginByToken(token) {
        return axios.post('/users/login', { token });
    },
    logout() {
        return axios.post('/users/logout');
    },
    fetchCurrentUser() {
        return axios.get('/users/current');
    }
}