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
            v-for="(user, index) in users"
            :key="user.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ user.name }}
                <v-btn absolute right v-model="users[index].isActive" v-if="!users[index].isActive" small class="ma-1" text icon>
                    <v-icon color="red">mdi-block-helper</v-icon>
                  </v-btn>
              </v-card-title>
               
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
                  <v-btn small class="ma-1" text icon>
                    <v-icon @click="open(index)">mdi-pencil</v-icon>
                  </v-btn>


                  <v-btn absolute right small class="ma-1" text icon v-if="user.isActive">
                    <v-icon @click="Delete(index, user._id, 'Deleted')"
                    :disabled="dialog"
                    :loading="dialog"
                    >mdi-delete</v-icon>
                  </v-btn>

                  <v-btn absolute right small class="ma-1" text icon v-if="!user.isActive">
                    <v-icon @click="Delete(index, user._id, 'Added')"
                    :disabled="dialog"
                    :loading="dialog"
                    >mdi-plus</v-icon>
                  </v-btn>

                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
     <v-dialog
                    v-model="dialog"
                    hide-overlay
                    persistent
                    width="300"
                  >
                    <v-card
                      class="mx-auto"
                      color="green"
                    >
                      <v-card-title>
                        <v-icon large left color="white" >
                          mdi-check
                        </v-icon>
                        <span style="color: white;">{{ statusName }}</span>
                      </v-card-title>
                    </v-card>
                  </v-dialog>
                  <app-edit-user></app-edit-user>
  </v-container>
  
  
</template>

<script>
import axios from 'axios';
import Edit from './editUser.vue'
  export default {
    data: () => ({
      usersPerPage: 9,
      users: [
        'id', 
        'name', 
        'lastNamePat', 
        'lastNameMat', 
        'email', 
        'principalTelephone',
        'isActive',],
        dialog: false,
        statusName: 'Deleted',
    }),
    created() {
        /* eslint-disable no-console */
        axios.get('https://warm-brushlands-30448.herokuapp.com/api/users',{params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.$store.state.users = res.data
                    this.users = res.data
                        })
                .catch(error => {
                    console.log(error);
                    })
    },
    methods: {
      refresh(index, id) {
        /* eslint-disable no-console */
        console.log('Refresh')
        console.log(id);
        axios.get('https://warm-brushlands-30448.herokuapp.com/api/users/' + id, {params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.$store.state.users[index] = res.data
                    this.users[index] = res.data
                    console.log('Refresh saved')
                        })
                .catch(error => {
                    console.log(error);
                    })
      },
      Delete(index, id, statusName) {
        this.statusName = statusName;
        console.log(id)
        console.log('Delete');
        axios.delete('https://warm-brushlands-30448.herokuapp.com/api/users/' + id, {params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.dialog = true;
                    this.$store.state.users[index].isActive = !this.$store.state.users[index].isActive
                    this.users[index].isActive = !this.users[index].isActive
                    this.refresh(index,id);
                    setTimeout(() => (this.dialog = false), 1250);
                        })
                .catch(error => {
                    console.log(error);
                    })
      },
      open(id) {
        console.log('open')
        this.$store.state.selectedID = id;
        console.log(this.$store.state.selectedID)
        console.log(this.$store.state.users[this.$store.state.selectedID].name)
        this.$store.state.showform = true;
      }
    },
    components: {
      appEditUser: Edit
    }
  }
</script>
