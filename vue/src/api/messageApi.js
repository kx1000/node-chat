import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_BACKEND_API_URL;

export default {
    fetchAll() {
        return axios.get(apiBaseUrl + '/messages');
    }
}