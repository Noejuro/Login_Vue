<template>
   <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon=""
                    type="text"
                    id="login" 
                    v-model="name"                  
                  />
                  <p>{{this.$store.state.user.email}}</p>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon=""
                    type="password" 
                    v-model="password" 
                  />
                  <p>{{this.$store.state.user.password}}</p>
    </v-form> 
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data() {
        return {
          name: '',
          password: ''
        }
    },
    watch: {
      name: function(value) {
        this.$store.state.user.email = value;
      },
      password: function(value) {
        this.$store.state.user.password = value;
      }
    }
  }
</script>