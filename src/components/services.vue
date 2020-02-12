<template>
  <v-container fluid>
    <v-data-iterator
      :items="services"
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
          <v-toolbar-title 
          class="flex display-1 font-weight-light font-bold"
          >Registered Services</v-toolbar-title>
        </v-toolbar>
      </template>

      <template>
        <v-expansion-panels focusable accordion tile 
        v-for="(service, index) in services"
            :key="service.id">

             <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col class="flex title font-weight-light font-condensed" cols="4">{{service.name}}</v-col>
                  <v-col
                    cols="8"
                    class="text--secondary"
                  >
                    <v-fade-transition leave-absolute>
                      <span
                        key="0"
                      >
                        {{service.description}}
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col cols="5">

                    <v-list
                      disabled
                      shaped
                      dense
                    >
                      <v-subheader>USERS</v-subheader>
                      <v-list-item-group color="primary">
                        <v-list-item
                          v-for="(user, i) in service.users"
                          :key="i"
                          inactive
                        >
                        <v-list-item-icon>
                          <v-icon>mdi-account-circle</v-icon>
                        </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{user.name}}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>

                  <v-divider
                    vertical
                    class="mx-4"
                  ></v-divider>
                  <v-row> </v-row>
                  <v-col cols="3">
                    <v-row> </v-row>
                    
                    <v-row>
                      <v-btn absolute right  small class="ma-1" text icon v-model="services[index].isActive" v-if="!services[index].isActive">
                        <v-icon style="padding: 15px 0 0 0" color="red">mdi-block-helper</v-icon>
                      </v-btn>
                      <br>
                      <p style="padding-top: 30%">Cost: {{service.cost}}</p>
                    </v-row>
                  </v-col>
                </v-row>

                <v-card-actions>

                  <v-spacer></v-spacer>
                  <v-btn small  text icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-divider
                    vertical
                    class="mx-2"
                  ></v-divider>
                  <v-btn small text icon >
                    <v-icon @click="Delete(index, service._id, 'Deleted')">mdi-delete</v-icon>
                  </v-btn>

                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
      </template>

    </v-data-iterator>
    

  </v-container>
  
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
      usersPerPage: 9,
      services: [
        'id', 
        'name', 
        'description', 
        'cost',
        'isActive',
        'users'],
        index: 0,
        id: '',
        statusName: 'Deleted'
    }),
    created() {
        /* eslint-disable no-console */
        console.log('Getting services');
        axios.get('https://fast-plateau-98665.herokuapp.com/api/services/populate',{params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.services = res.data
                        })
                .catch(error => {
                    console.log(error);
                    })
    },
    methods: {
      Delete(index, id, statusName) {
        this.statusName = statusName;
        console.log(id)
        console.log('Delete');
        axios.delete('https://fast-plateau-98665.herokuapp.com/api/services/' + id, {params:{},headers: {'x-auth-token': this.$store.state.activeUser.token}})
                .then(res => {
                    console.log(res);
                    this.services[index].isActive = !this.services[index].isActive
                        })
                .catch(error => {
                    console.log(error);
                    })
      },
    }
  }
</script>
