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
                <app-user-da></app-user-da>
              </v-card-text>
              <app-btn-actions></app-btn-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserDa from './components/userDa.vue'
import btnActions from './components/btnActions.vue'
  export default {
    props: {
      source: String,
    },
    components: {
      appUserDa: UserDa,
      appBtnActions: btnActions
    }
  }
</script>
