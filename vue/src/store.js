import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
    },
    mutations: {
        SET_USER (state, data) {
            state.user = data;
        }
    }
});