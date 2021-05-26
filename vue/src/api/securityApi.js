import axios from "axios";

export default {
    jwtLogin(email, plainPassword) {
        return axios.post('/security/jwt-login', { email, plainPassword });
    },
    loginByToken(token) {
        return axios.post('/security/login', { token });
    },
    logout() {
        return axios.post('/security/logout');
    },
}