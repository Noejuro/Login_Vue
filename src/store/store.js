import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store =  new Vuex.Store({
    state: {
        activeUser: ['name', 'email', 'token'],
        users: ['id', 'name', 'email', 'v']
    }
});