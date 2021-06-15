import * as service from '@/service/userService'

export default {
    namespaced: true,
    state: {
        user: null,
        status: '',
    },
    getters: {
        getUserId: state => {
            return state.user !== null ? state.user.id : null
        }
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
        STATUS_LOADING: (state) => {
            state.status = "loading"
        },
        STATUS_CORRECT: (state) => {
            state.status = ""
        },
        STATUS_ERROR: (state) => {
            state.status = "error"
        }
    },

    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.register(user)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_USER', response.data);
                        resolve()
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        login({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.login(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_USER', response.data);
                        localStorage.setItem('user', JSON.stringify(response.data));
                        resolve()
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
    }

}