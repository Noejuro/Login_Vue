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
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
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
          <v-btn @click="logout" outlined block>Logout</v-btn>
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
      <v-toolbar-title v-model="this.$store.state.showform"> Welcome {{ this.$store.state.showform }}!</v-toolbar-title>
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
            <app-table></app-table>
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
//import SignUp from './sign_up.vue'
//import Edit from './editUser.vue'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      userName: '',
      mini: true
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    components: {
      appTable: Table
      //appSignup: SignUp
      //appEditUser: Edit
    },
    methods: {
      logout() {
        this.$router.push({name: 'login'})
      }
      
    }
  }
</script>