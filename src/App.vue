<template>
  <v-app id="inspire">
    <app-input></app-input>
  </v-app>
</template>

<script>
import inputLogin from './components/inputLogin.vue'

export default {
    components: {
      appInput: inputLogin
    }
}
</script>