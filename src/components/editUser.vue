<template>
  <v-row justify="center">
    <v-dialog light persistent v-model="this.$store.state.showform" max-width="500px">
      <v-card>
        <v-row
          align="center"
          justify="center"
        >
              <v-form>
                  <br>
                <v-text-field
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                v-model = "this.$store.state.users[this.$store.state.selectedID].name"
                ></v-text-field>

                <v-text-field
                v-model = "this.$store.state.users[this.$store.state.selectedID].lastNamePat"
                :error-messages="lastPErrors"
                label="Last Name P"
                required
                @input="$v.lastNamePat.$touch()"
                @blur="$v.lastNamePat.$touch()"
                ></v-text-field>

                <v-text-field
                v-model = "this.$store.state.users[this.$store.state.selectedID].lastNameMat"
                :error-messages="lastMErrors"
                label="Last Name Mat"
                @input="$v.lastNameMat.$touch()"
                @blur="$v.lastNameMat.$touch()"
                ></v-text-field>
                <v-text-field
                v-model = "this.$store.state.users[this.$store.state.selectedID].principalTelephone"
                :error-messages="phoneErrors"
                label="Phone Number"
                required
                @input="$v.principalTelephone.$touch()"
                @blur="$v.principalTelephone.$touch()"
                ></v-text-field>

                <v-text-field
                v-model = "this.$store.state.users[this.$store.state.selectedID].email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                ></v-text-field>
                
                <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
                ></v-checkbox>

                <v-btn class="mr-4" @click="submit">Submit</v-btn>
                <v-btn @click="hide">Close</v-btn>
                <br><br>
              </v-form>
        </v-row>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength, numeric, alpha } from 'vuelidate/lib/validators'
  import axios from 'axios'

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
      name: '',
      lastNamePat: '',
      lastNameMat: '',
      password: '',
      email: '',
      principalTelephone: null,
      checkbox: false,
      dialog: false
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

    methods: {
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
        axios.put('https://warm-brushlands-30448.herokuapp.com/api/users'+this.$store.state.users[this.$store.state.selectedID].id, userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
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
        this.$store.state.showform = false;
      },
    },
   /* created() {
        console.log('Created');
        this.name = this.$store.state.users[this.$store.state.selectedID].name
        this.lastNamePat = this.$store.state.users[this.$store.state.selectedID].lastNamePat
        this.lastNameMat = this.$store.state.users[this.$store.state.selectedID].lastNameMat
        this.principalTelephone = this.lastNamePat = this.$store.state.users[this.$store.state.selectedID].principalTelephone
        this.principalTelephone = this.lastNamePat = this.$store.state.users[this.$store.state.selectedID].isActive
      }*/
  }
</script>