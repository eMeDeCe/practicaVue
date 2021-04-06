<template>
  <center-layout>
    <Snackbar v-bind="{snackbar, snackbarText}"/>
    <login-page v-bind="{ login, updateLogin, loginRequest, loginError }" />
  </center-layout>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { CenterLayout } from "../../common/layouts";
import { loginRequest } from "../../rest-api/api/login";
import { baseRoutes } from "../../router";
import LoginPage from "./Page.vue";
import { createEmptyLogin, Login, createEmptyLoginError } from "./viewModel";
import { mapLoginVMToModel } from "./mapper";
import { validation } from "./validations";
import { Snackbar } from "../../common/general";

export default Vue.extend({
  name: "PageLoginContainer",
  components: { LoginPage, Snackbar, CenterLayout },
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
              localStorage.name = this.login.name;
              localStorage.password = this.login.password;
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
  },
  mounted () {
    if (localStorage.name) this.login.name = localStorage.name;
    if (localStorage.password) this.login.password = localStorage.password;
  }
});
</script>
