<template>
  <v-container fluid>
    <v-data-iterator
      :items="users"
      :items-per-page.sync="usersPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>Registered users</v-toolbar-title>
        </v-toolbar>
      </template>

      <template>
        <v-row>
          <v-col
            v-for="user in users"
            :key="user.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ user.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item>
                  <v-list-item-content>Last Name:</v-list-item-content>
                  <v-list-item-content left
                   class="align-end">{{ user.lastNamePat }} {{ user.lastNameMat }} </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Email:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ user.email }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Telephone:</v-list-item-content>
                  <v-list-item-content
                   class="align-end">{{ user.principalTelephone }}</v-list-item-content>
                </v-list-item>
                <br>
                <v-list-item>
                  <v-btn  x small class="ma-1"  fab color="red darken-5">
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-btn>
                   
                  <v-btn absolute right x small class="ma-1"   fab color="indigo darken-5">
                    <v-icon color="white">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item>
                
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
      usersPerPage: 9,
      users: [
        'id', 
        'name', 
        'lastNamePat', 
        'lastNameMat', 
        'email', 
        'principalTelephone']
    }),
    created() {
        /* eslint-disable no-console */
        axios.get('https://warm-brushlands-30448.herokuapp.com/api/users',{params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.$store.state.users = res.data
                    this.users = res.data
                    console.log(this.users[8]);
                        })
                .catch(error => {
                    console.log(error);
                    })
    }
  }
</script>
