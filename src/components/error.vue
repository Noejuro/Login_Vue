<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="left"
          justify="center"
        >
        <div class="flex display-4 font-weight-bold">
            <p>Something went wrong</p>
        </div>
        <v-divider></v-divider>
        <div class="flex display-2 font-weight-light">
            <p>Please log in again </p>
        </div> 
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created() {
      this.$vuetify.theme.dark = true;
    }
}
</script>