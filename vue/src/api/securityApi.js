import axios from "axios";

export default {
    jwtLogin(email, plainPassword) {
        return axios.post('/security/jwt-login', { email, plainPassword });
    }
}