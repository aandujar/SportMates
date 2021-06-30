import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule'
import eventModule from './eventModule'
import chatModule from './chatModule'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user: userModule,
        event: eventModule,
        chat: chatModule
    }
})


export default store;