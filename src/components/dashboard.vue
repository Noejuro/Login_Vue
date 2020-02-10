<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      permanent
      expand-on-hover      
    >
      <v-list dense>
        <v-list-item link @click="routeToDashboard">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="routeToSignUp">
          <v-list-item-action>
            <v-icon >mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content >
            <v-switch
              v-model="$vuetify.theme.dark"
              hide-details
              label="Theme Dark"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" outlined block>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dense
      hide-on-scroll
      right
    >
      <v-toolbar-title v-model="this.$store.state.modeEdit"> Welcome {{ this.$store.state.activeUser.name }}!</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
            <component :is="currentComponent">
            </component>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>@Neeoon 2020</span>
    </v-footer>
  </v-app>
</template>

<script>

import Table from './table.vue'
import SignUp from './sign_up.vue'
//import Edit from './editUser.vue'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      userName: '',
      mini: true,
      currentComponent: "appTable"
    }),
    created () {
      /* eslint-disable no-console */
      this.$vuetify.theme.dark = true
      console.log('Usign LocalStorage');
      if (localStorage.getItem('token')) this.$store.state.activeUser.token = JSON.parse(localStorage.getItem('token'));
      else 
        this.$router.push({name: 'error'})
      if (localStorage.getItem('username')) this.$store.state.activeUser.name = JSON.parse(localStorage.getItem('username'));
    },
    components: {
      appTable: Table,
      appSignup: SignUp
      //appEditUser: Edit
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push({name: 'login'})
      },
      routeToSignUp() {
        /* eslint-disable no-console */
        console.log('Sign Up')
        this.currentComponent = "appSignup"
      },
      routeToDashboard() {
        /* eslint-disable no-console */
        console.log('Sign Up')
        this.currentComponent = "appTable"
      }
      
    }
  }
</script>