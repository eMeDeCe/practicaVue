<template>
  <app-layout>
    <form-component v-bind="$props" />
  </app-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { AppLayout } from "../../../common/layouts";
import { FormProps } from "./formProps";
import { FormComponent } from "./components";
import { Snackbar } from "../../../common/general";

export default Vue.extend({
  name: "RecipeAddPage",
  components: { AppLayout, FormComponent, Snackbar },
  props: {
    recipe: { require: true },
    recipeError: { required: true },    
    onUpdateRecipe: { require: true },
    onSave: { require: true },
    onRemoveIngredient: { required: true },
    onAddIngredient: { required: true },
  } as FormProps,
});
</script>
