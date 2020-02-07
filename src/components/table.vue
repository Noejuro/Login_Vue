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
          <v-toolbar-title>Registered Users</v-toolbar-title>
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
            <v-card >
              <v-card-title class="subheading font-weight-bold">{{ user.name }}
                <v-btn absolute right v-model="users[index].isActive" v-if="!users[index].isActive" small class="ma-1" text icon>
                    <v-icon color="red">mdi-block-helper</v-icon>
                  </v-btn>
              </v-card-title>
               
              <v-divider></v-divider>

              <v-list dense light>

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
                    <v-icon @click="open(index, user._id)">mdi-pencil</v-icon>
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
                  

<!--
    <v-row justify="center">
                    <v-dialog light persistent v-model="this.$store.state.modeEdit" max-width="500px">
                      <v-card>
                        <v-row
                          align="center"
                          justify="center"
                        >
                          <app-sign-up></app-sign-up>
                        </v-row>
                        </v-card>
                    </v-dialog>
    </v-row>
-->
    <app-edit-user 
    :id="users[index].id"
    :name="users[index].name"
    :lastNameMat="users[index].lastNameMat"
    :lastNamePat="users[index].lastNamePat"
    :email="users[index].email"
    :principalTelephone="users[index].principalTelephone"></app-edit-user>

  </v-container>
  
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, numeric, alpha } from 'vuelidate/lib/validators'
import axios from 'axios';
//import SignUp from './sign_up.vue'
import EditUser from './editUser.vue'
  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, alpha },
      lastNameMat: { alpha},
      lastNamePat: { required, alpha},
      password: { required, minLength: minLength(5) },
      email: { required, email },
      principalTelephone: { required, numeric },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
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

        activeUser: [
        'id', 
        'name', 
        'lastNamePat', 
        'lastNameMat', 
        'email', 
        'principalTelephone',
        'isActive',],
        index: 0,
        id: '',
        name: '',
        lastNamePat: '',
        lastNameMat: '',
        password: '',
        email: '',
        principalTelephone: null,
        checkbox: false,
        dialog: false,
        statusName: 'Deleted',
    }),
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        !this.$v.name.alpha && errors.push('Name must be alphabetic only.')
        return errors
      },
      lastPErrors () {
        const errors = []
        if (!this.$v.lastNamePat.$dirty) return errors
        !this.$v.lastNamePat.required && errors.push('Last Name P is required.')
        !this.$v.lastNamePat.alpha && errors.push('Last Name must be alphabetic only.')
        return errors
      },
      lastMErrors () {
        const errors = []
        if (!this.$v.lastNameMat.$dirty) return errors
        !this.$v.lastNameMat.alpha && errors.push('Last Name M must be alphabetic only.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.principalTelephone.$dirty) return errors
        !this.$v.principalTelephone.numeric && errors.push('Phone number must be numeric')
        !this.$v.principalTelephone.required && errors.push('Phone number is required.')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be atleast 5 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
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
      open(index, id) {
        console.log('open')
        this.$store.state.modeEdit = true;
        this.$store.state.selectedID = id;
        this.$store.state.selectedINDEX = index;
        this.index = index;
        //CHECK MODE
        this.$store.state.selectedUser = this.users[index];
        this.activeUser = this.users[index];
        this.id = id;
        this.name = this.users[index].name;
        this.lastNamePat = this.users[index].lastNamePat;
        this.lastNameMat = this.users[index].lastNameMat;
        this.email = this.users[index].email;
        this.principalTelephone = this.users[index].principalTelephone;
      },
      submit () {
        const userData = {
            name: this.name,
            lastNamePat: this.lastNamePat,
            email: this.email,
            telephone: this.principalTelephone,
            isActive: true
          }
        if(this.lastNameMat != '') {
          this.$set(userData, 'lastNameMat', this.lastNameMat);
        }
        /* eslint-disable no-console */
        console.log(userData)
        console.log(this.id)
        axios.put('https://warm-brushlands-30448.herokuapp.com/api/users/'+this.id, userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
                    this.users[this.$store.state.selectedID] = res.data;
                    this.users[this.$store.state.selectedID].principalTelephone = res.data.telephone;
                    console.log(this.users[this.$store.state.selectedID]);
                    this.$store.state.modeEdit = false;
                    this.dialog = false
                        })
                .catch(error => {
                    console.log(error);
                    })
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.lastNamePat = ''
        this.lastNameMat = ''
        this.email = ''
        this.password = ''
        this.principalTelephone = null
        this.select = null
        this.checkbox = false
      },
      hide () {
        this.$v.$reset()
        this.name = ''
        this.lastNamePat = ''
        this.lastNameMat = ''
        this.email = ''
        this.password = ''
        this.principalTelephone = null
        this.select = null
        this.checkbox = false
        this.$store.state.modeEdit = false;
      },
    },
    components: {
      //appSignUp: SignUp,
      appEditUser: EditUser
    },
    
  }
</script>
