<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                light
                flat
              >
                <v-toolbar-title>Welcome Back!</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text ref=form @keydown.enter = "Submit">
                <v-form>

                  <v-text-field
                    id="email"   
                    label="Email"
                    name="email"
                    type="text"
                    color="black"
                    clear-icon="mdi-close-circle"
                    suffix="@gmail.com"
                    clearable
                    filled
                    shaped
                    outlined
                    v-model="userEmail"
                    @click="show = false"
                  > </v-text-field>
                  
                  <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    id="password"
                    label="Password"
                    name="password"
                    color="black"
                    clear-icon="mdi-close-circle"
                    v-model="userPa"
                      
                    filled
                    shaped
                    outlined
                    @click:append="show1 = !show1"
                    @click="show = false"
                  />
                
              </v-form> 
              <h7 v-if="show" style="color: red">{{ error_message }}</h7>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-col cols="12">
                    <v-btn block color="black" style="color: white;" @click="Submit">Login</v-btn>    
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
          show1: false,
          userEmail: '',
          userPa: '',
          show: false,
          error_message: ''
        }
    },
    computed: {
      form() {
        return {
          userEmail: this.userEmail,
          userPa: this.userPa
        }
      }
    },
    methods: {
        Submit() {
          const userData = {
            email: this.userEmail+"@gmail.com",
            password: this.userPa
          }
          /* eslint-disable no-console */
            axios.post('https://fast-plateau-98665.herokuapp.com/api/login', userData)
                .then(res => {
                    console.log(res)
                    this.$store.state.activeUser.name = res.data.name;
                    this.$store.state.activeUser.token = res.data.token;
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('username', JSON.stringify(res.data.name));
                    this.$router.push({name: 'dashboard'})
                        })
                .catch(error => {
                    console.log(error);
                    this.show = true
                    if(error.response.status == 400)
                        this.error_message = 'Email or password are incorrect';
                    if(error.status == 401)
                        this.error_message = 'Acces Denied';
                    })
            this.userEmail = "";
            this.userPa = "";
        }
    },
    created() {
      this.$vuetify.theme.dark = false;
    }
}
</script>