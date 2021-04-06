<template>
  <div>
    <v-app-bar app dark color="amber">
      <v-toolbar-title>Recipe App. Bienvenido: {{user}}</v-toolbar-title>
      <div class="logout">
      <logout/>
       </div>
    </v-app-bar>
    <v-container class="py-10">
      <slot />
    </v-container>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import logout from "../general/logout"
import Logout from "../general/logout.vue";
export default Vue.extend({
  name: "AppLayout",
  components: {logout},
   data() {
    return {
      user: localStorage.name
    };
  }
});

</script>



<style scoped>
.logout {
    margin-left: 5%;
}
</style>