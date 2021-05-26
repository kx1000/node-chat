import axios from "axios";

export default {
    jwtLogin(email, plainPassword) {
        return axios.post('/security/jwt-login', { email, plainPassword });
    },
    googleLoginByToken(token) {
        return axios.post('/security/google-login', { token });
    },
    logout() {
        return axios.post('/security/logout');
    },
}