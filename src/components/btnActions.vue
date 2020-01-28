<template>
    <v-card-actions>
                <v-btn color="primary">Clear</v-btn>
                <v-spacer />
                <v-btn color="primary" @click="Submit">Login</v-btn>
    </v-card-actions>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data() {
        return {
            userEmail: '',
            userPa: ''
        }
    },
    methods: {
        Submit() {
            this.userEmail = this.$store.state.user.email;
            this.userPa = this.$store.state.user.password;
        }
    }
  }
</script>