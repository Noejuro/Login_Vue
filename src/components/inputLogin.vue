<template>
  <v-app id="inspire">
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
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>

                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon=""
                    type="text"
                    id="email"                
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon=""
                    type="password" 
                  />

              </v-form> 
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Clear</v-btn>
                <v-spacer />
                <v-btn color="primary" @click="Submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userData: ['email', 'password']
        }
    },
    methods: {
        Submit() {
            this.userData.email = document.getElementById("email").value;
            this.userData.password = document.getElementById("password").value;
            axios.post('https://log-intesting.firebaseio.com/user.json', this.userData);
        }
    }
}
</script>