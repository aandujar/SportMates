import * as service from '@/service/eventService'

export default {
    namespaced: true,
    state: {
        unsubscriptedEvents: [],
        inscriptedEvents: [],
        ownedEvents: [],
        sport: [],
        status: ''
    },
    mutations: {
        SET_UNSUBSCRIPTED_EVENTS: (state, unsubscriptedEvents) => {
            state.unsubscriptedEvents = unsubscriptedEvents;
        },
        SET_INSCRIPTED_EVENTS: (state, inscriptedEvents) => {
            state.inscriptedEvents = inscriptedEvents;
        },
        SET_OWNED_EVENTS: (state, ownedEvents) => {
            state.ownedEvents = ownedEvents;
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
        getUnsubscriptedEvents({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getUnsubscriptedEvents(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_UNSUBSCRIPTED_EVENTS', response.status === 200 ? response.data.content : []);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        getInscriptedEvents({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getInscriptedEvents(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_INSCRIPTED_EVENTS', response.status === 200 ? response.data.content : []);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        getOwnedEvents({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getOwnedEvents(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        commit('SET_OWNED_EVENTS', response.status === 200 ? response.data.content : []);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        getSports({ commit }) {
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
        inscribeToEvent({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.inscribeToEvent(data)
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
        unsubscribeToEvent({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.unsubscribeToEvent(data)
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
        removeEvent({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.removeEvent(data)
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
        createEvent({ commit }, data) {
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