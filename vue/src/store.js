import Vue from 'vue';
import vuex from 'vuex';
import userApi from "@/api/userApi";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
    },
    actions: {
        async fetchCurrentUser({commit}) {
            const response = await userApi.fetchCurrentUser();
            commit('SET_USER', response.data);
        }
    },
    mutations: {
        SET_USER (state, data) {
            state.user = data;
        }
    }
});