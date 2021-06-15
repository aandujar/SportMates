import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule'
import eventModule from './eventModule'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user: userModule,
        event: eventModule
    }
})


export default store;