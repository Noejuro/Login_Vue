<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      password: { required, minLength: minLength(5) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      password: '',
      email: '',
      select: null,
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
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

    methods: {
      submit () {
        const userData = {
            name: this.name,
            email: this.email,
            password: this.password
          }
        /* eslint-disable no-console */
        axios.post('https://warm-brushlands-30448.herokuapp.com/api/users', userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
                        })
                .catch(error => {
                    console.log(error);
                    })
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>