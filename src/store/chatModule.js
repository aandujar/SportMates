import * as service from '@/service/chatService'

export default {
    namespaced: true,
    state: {
        chats: [],
        status: ''
    },
    mutations: {
        SET_CHATS: (state, data) => {
            console.log(data)
            const index = state.chats.findIndex((chat) => chat.eventId === data.eventId);
            console.log(index)
            if (index > -1) {
                state.chats.splice(index, 1, data);
            } else {
                state.chats.push(data);
            }
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
        getMessagesByEvent({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.getMessagesByEvent(params)
                    .then(function (response) {
                        commit('STATUS_CORRECT');
                        console.log(response)
                        const data = { chats: response.data, eventId: params.eventId };
                        commit('SET_CHATS', data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('STATUS_ERROR');
                        reject(error)
                    })
            })
        },
        addMessage({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('STATUS_LOADING');
                service.addMessage(data)
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