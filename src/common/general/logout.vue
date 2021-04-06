<template>
    <v-btn 
      class="ma-2"
      outlined
      color="grey"
      @click.prevent="exitApp"
      >
      Salir
    </v-btn>
</template>


<script lang="ts">
import Vue from "vue";
import { baseRoutes } from "../../router";
export default Vue.extend({
  name: "Logout",
  methods : {
      exitApp () {
          localStorage.clear(); // Borramos el localStorage del user/pass
          this.$router.push(baseRoutes.login); // Volver a la ruta indicada
      }
  },
  computed: {
     routeLogin(): string {
      return `/login`;
    }
  }
});

</script>
