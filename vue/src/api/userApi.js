import axios from 'axios';

export default {
    create(userDto) {
        return axios.post('/users', userDto);
    },
    fetchCurrentUser() {
        return axios.get('/users/current');
    }
}