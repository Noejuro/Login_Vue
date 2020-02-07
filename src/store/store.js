import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store =  new Vuex.Store({
    state: {
        activeUser: ['name', 'email', 'token'],
        users: ['id', 'name', 'lastNamePat', 'lastNameMat', 'email', 'principalTelephone', 'isActive', 'v'],
        selectedUser: ['id', 'name', 'lastNamePat', 'lastNameMat', 'email', 'principalTelephone', 'isActive', 'v'],
        show_alert: true,
        showform: false,
        modeEdit: false,
        modeAdd: false,
        dialog: false,
        selectedID: 0,
        selectedINDEX: 0
    }
});