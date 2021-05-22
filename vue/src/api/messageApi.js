import axios from 'axios';

export default {
    fetchAll() {
        return axios.get('/messages');
    },
    create(message) {
        return axios.post('/messages', {content: message})
    }
}