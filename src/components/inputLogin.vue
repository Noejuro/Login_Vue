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
                color="blue aqua"
                dark
                flat
              >
                <v-toolbar-title>Welcome Back!</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text ref=form>
                <v-form>

                  <v-text-field
                    id="email"   
                    label="Email"
                    name="email"
                    type="text"
                    color="purple"
                    clear-icon="mdi-close-circle"
                    suffix="@gmail.com"
                    clearable
                    filled
                    shaped
                    outlined
                    v-model="userEmail"
                  > </v-text-field>
                  
                  <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    id="password"
                    label="Password"
                    name="password"
                    color="purple"
                    clear-icon="mdi-close-circle"
                    v-model="userPa"
                    clearable
                    filled
                    shaped
                    outlined
                    @click:append="show1 = !show1"
                  />

              </v-form> 
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="Submit">Login</v-btn>
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
          userPa: ''
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
            axios.post('https://log-intesting.firebaseio.com/user.json', userData);
        }
    }
}
</script>