import * as service from '@/service/eventService'

export default {
    namespaced: true,
    state: {
        events: [],
        combo: {
            city: [],
            province: [],
            country: [],
            sport: []
        },
        status: '',
    },

    mutations: {
        SET_EVENTS: (state, events) => {
            state.events = events;
        },
        SET_COMBO: (state, combo) => {
            state.combo.city = combo.city;
            state.combo.province = combo.province;
            state.combo.country = combo.country;
            state.combo.sport = combo.sport;
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
        getEvents({ commit }, params ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getEvents(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_EVENTS', response.status === 200 ? response.data.content : []);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        getCombo({ commit } ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getCombo()
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_COMBO', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        addUserToEvent({ commit }, data ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.addUserToEvent(data)
                    .then(function () {
                        commit('STATUS_CORRECT');
                        resolve()
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        }
    }

}