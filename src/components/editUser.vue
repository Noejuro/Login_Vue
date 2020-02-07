<template>
  <v-dialog light persistent v-model="this.$store.state.dialog" max-width="500px">
    <v-card>
      <v-row align="center" justify="center">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="lastNamePat"
            :error-messages="lastPErrors"
            label="Last Name P"
            required
            @input="$v.lastNamePat.$touch()"
            @blur="$v.lastNamePat.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="lastNameMat"
            :error-messages="lastMErrors"
            label="Last Name Mat"
            @input="$v.lastNameMat.$touch()"
            @blur="$v.lastNameMat.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="principalTelephone"
            :error-messages="phoneErrors"
            label="Phone Number"
            required
            @input="$v.principalTelephone.$touch()"
            @blur="$v.principalTelephone.$touch()"
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
            v-if="this.$store.state.modeAdd"
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
          <v-btn class="mr-4" @click="submit">Submit</v-btn>
          <v-btn v-if="this.$store.state.modeAdd" @click="clear">Clear</v-btn>
          <v-btn v-if="this.$store.state.modeEdit" @click="clear">Close</v-btn>
          <v-snackbar
            v-model="snackbar"
            :timeout= 1500
            color = 'green'
          >User Added</v-snackbar>
          <v-snackbar
            v-model="errMess"
            :timeout= 3000
            color = 'red'
          >   {{ errorMessage }}</v-snackbar>
    </form>


      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength, numeric, alpha } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],
    props: {
        id: {
          type: String
        },
        name: {
          type: String
        },
        lastNameMat: {
          type: String
        },
        lastNamePat: {
          type: String
        },
        email: {
          type: String
        },
        principalTelephone: {
          type: String
        }
      },
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
      password: '',
      checkbox: false,
      show: false,
      snackbar: false,
      errMess: false,
      errorMessage: ''
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
        console.log("ID EDIT");
        console.log(this.id);
        if(this.$store.state.modeEdit == true) {
          console.log('Put');
          console.log(userData);
          axios.put('https://warm-brushlands-30448.herokuapp.com/api/users/'+this.id, userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
                    /*this.users[this.$store.state.selectedINDEX] = res.data;
                    this.users[this.$store.state.selectedINDEX].principalTelephone = res.data.telephone;
                    console.log(this.users[this.$store.state.selectedINDEX]);
                    this.$store.state.users = this.users;
                    this.$store.state.modeEdit = false;*/
                    //this.$store.state.users[this.id] = res.data;
                    this.clear();
                    this.exitEdit(true, res.data);
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
        axios.post('https://warm-brushlands-30448.herokuapp.com/api/users', userData, {params:{}, headers: {'x-auth-token': this.$store.state.activeUser.token} })
                .then(res => {
                    console.log(res);
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
        this.$v.$touch()
      },
      clear () {
        this.checkbox = false
        this.$v.$reset()
        this.$store.state.dialog = false
        this.$store.state.modeEdit = false
        this.$store.state.modeAdd = false
      },
      exitEdit(updated, user) {
        this.$emit('exit', user, updated);
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