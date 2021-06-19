import * as service from '@/service/eventService'

export default {
    namespaced: true,
    state: {
        events: [],
        suscriptedEvents: [],
        sport: [],
        status: ''
    },
    mutations: {
        SET_EVENTS: (state, events) => {
            state.events = events;
        },
        SET_SUSCRIPTED_EVENTS: (state, suscriptedEvents) => {
            state.suscriptedEvents = suscriptedEvents;
        },
        SET_SPORTS: (state, sport) => {
            state.sport = sport;
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
        getSuscriptedEvents({ commit }, params ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getSuscriptedEvents(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_SUSCRIPTED_EVENTS', response.status === 200 ? response.data.content : []);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        getSports({ commit } ) {
            return new Promise((resolve, reject) => {
                service.getSports()
                    .then(function (response) {
                        commit('SET_SPORTS', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
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
        },
        unsuscribeUserToEvent({ commit }, data ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.unsuscribeUserToEvent(data)
                    .then(function () {
                        commit('STATUS_CORRECT');
                        resolve()
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        createEvent({ commit }, data ) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.createEvent(data)
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