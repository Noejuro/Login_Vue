<template>
  <v-app id="inspire">
    <app-input></app-input>
  </v-app>
</template>

<script>
import axios from 'axios';
import inputLogin from './components/inputLogin.vue'

export default {
    data() {
        return {
          show1: false,
          userEmail: '',
          userPa: ''
        }
    },
    components: {
      appInput: inputLogin
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
            email: this.userEmail,
            password: this.userPa
          }
            axios.post('https://log-intesting.firebaseio.com/user.json', userData);
        }
    }
}
</script>