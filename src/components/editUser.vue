<template>
  <v-dialog light persistent v-model="this.$store.state.dialog" max-width="550px">
    <v-card>
      <v-card-title>
          <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
          <v-container>
            <v-row align="center" justify="center">
              <form>
                <v-text-field
                  v-model="user.name"
                  label="Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.lastNamePat"
                  label="Last Name P"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.lastNameMat"
                  label="Last Name Mat"
                ></v-text-field>
                <v-text-field
                  v-model="user.principalTelephone"
                  label="Phone Number"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.email"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-if="this.$store.state.modeAdd"
                  v-model="password"
                  label="Password"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  label="Do you agree?"
                  required
                ></v-checkbox>
                <v-btn class="mr-4" @click="submit">Submit</v-btn>
                <v-btn v-if="this.$store.state.modeAdd" @click="clear">Clear</v-btn>
                <v-btn v-if="this.$store.state.modeEdit" @click="clear">Close</v-btn>
              </form>
            </v-row>
          </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
        user: {
          required: true
        },
        title: {
          required: true
        }
      },

    data: () => ({
      password: '',
      checkbox: false,
      show: false,
      snackbar: false,
      errMess: false,
      errorMessage: '',
      succesMessage: 'User Added'
    }),

    computed: {
      
    },

    methods: {
      submit () {
        
        const userData = {
            name: this.user.name,
            lastNamePat: this.user.lastNamePat,
            email: this.user.email,
            telephone: this.user.principalTelephone,
            isActive: true
          }
        if(this.user.lastNameMat != '') {
          this.$set(userData, 'lastNameMat', this.user.lastNameMat);
        }
        /* eslint-disable no-console */
        console.log("ID EDIT");
        console.log(this.user._id);
        if(this.$store.state.modeEdit == true) {
          console.log('Put');
          console.log(userData);
          axios.put('https://fast-plateau-98665.herokuapp.com/api/users/'+this.user._id, userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(response => {
                    console.log(response);
                    /*this.users[this.$store.state.selectedINDEX] = res.data;
                    this.users[this.$store.state.selectedINDEX].principalTelephone = res.data.telephone;
                    console.log(this.users[this.$store.state.selectedINDEX]);
                    this.$store.state.users = this.users;
                    this.$store.state.modeEdit = false;*/
                    //this.$store.state.users[this.id] = res.data;
                    this.clear();
                    this.snackbar = true;
                    this.$emit('exit', {update: true, data: response.data});
                    //this.exitEdit(true, res.data);
                    this.dialog = false
                        })
                .catch(error => {
                    console.log('Showing err');
                    console.log(error);
                    console.log(error.response.data);
                    this.show = true;
                    this.errMess = true;
                    this.errorMessage = error.response.data;
                    })
        }
        if(this.$store.state.modeAdd == true) {
        /* eslint-disable no-console */
        this.$set(userData, 'password', this.password);
        console.log(userData);
        console.log('Post');
        console.log(userData)
        axios.post('https://fast-plateau-98665.herokuapp.com/api/users', userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
                    this.succesMessage = 'User Added';
                    this.snackbar = true;
                    this.clear()
                        })
                .catch(error => {
                    console.log(error);
                    console.log(error.response.data);
                    this.show = true;
                    this.errMess = true;
                    this.errorMessage = error.response.data;
                    })
        }
      },
      clear () {
        this.checkbox = false
        this.$store.state.dialog = false
        this.$store.state.modeEdit = false
        this.$store.state.modeAdd = false
      }
    },
    destroyed() {
      console.log('Destroyed Sign Up');
      this.$store.state.dialog = false
      this.$store.state.modeEdit = false;
      this.$store.state.modeAdd = false;
    },
    created() {
      console.log('Created Sign Up');
      console.log(this.$store.state.modeEdit);
    }
  }
</script>