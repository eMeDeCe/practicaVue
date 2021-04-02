<template>
 <div class="text-center ma-2">
  <v-snackbar
    v-model="snackbar"
    :timeout="-1"
    >
    {{ snackbarText }}
    <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
interface propsSnackbar {
  snackbar: Boolean;
  text: String;
} 
  export default (Vue as VueConstructor<Vue>).extend({
    name: "Snackbar",
    props: {
      snackbar: {
        default: false
      },
      snackbarText: {
        default: ''
      }
    } as propsSnackbar,

    data: () => ({
      valid:true
    }),
  });
</script>
