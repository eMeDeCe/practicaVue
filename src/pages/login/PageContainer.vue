<template>
  <div>
    <login-page v-bind="{ login, updateLogin, loginRequest, loginError }" />
    <Snackbar v-bind="{snackbar, snackbarText}"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { loginRequest } from "../../rest-api/api/login";
import { baseRoutes } from "../../router";
import LoginPage from "./Page.vue";
import { createEmptyLogin, Login, createEmptyLoginError } from "./viewModel";
import { mapLoginVMToModel } from "./mapper";
import { validation } from "./validations";
import { Snackbar } from "./components";

export default Vue.extend({
  name: "PageLoginContainer",
  components: { LoginPage, Snackbar },
  data() {
    return {
      login: createEmptyLogin(),
      loginError: createEmptyLoginError(),
      snackbar: false,
      snackbarText: "este texto desde el principio"
    };
  },
  methods: {
    updateLogin(field: string, value: string) {
      this.login = {
        ...this.login,
        [field]: value
      };

      validation.validateField(field, value).then(result => {
        this.loginError = {
          ...this.loginError,
          [field]: result
        };
      });
    },
   
    loginRequest() {
      validation.validateForm(this.login).then(result => {

        if (result.succeeded) {

          const loginModel = mapLoginVMToModel(this.login);
          loginRequest(loginModel)
            .then(() => {
              this.$router.push(baseRoutes.recipe);
            })
            .catch((error) => {
            this.snackbar = true;
            this.snackbarText = error;
            });


        } else {
          this.loginError = {
            ...this.loginError,
            ...result.fieldErrors,
          };
        }
      });
    },
  }
});
</script>
