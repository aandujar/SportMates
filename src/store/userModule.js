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
        },
        getUserAvatar: state => {
            return state.user !== null && state.user.avatar !== null ? state.user.avatar : require(`@/assets/avatar.png`)
        },
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_AVATAR: (state, avatar) => {
            state.user.avatar = avatar;
            localStorage.setItem('user', JSON.stringify(state.user));
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
        dataIsInUse({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.dataIsInUse(data)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        updateAvatar({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.updateAvatar(data)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        changePassword({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.changePassword(data)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        }
    }

}