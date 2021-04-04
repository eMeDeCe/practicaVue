<template>
  <div>
  <Snackbar v-bind="{snackbar, snackbarText}"/>
  <recipe-add-page v-bind="{ recipe, recipeError, onUpdateRecipe, onAddIngredient, onSave, onRemoveIngredient }" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RecipeAddPage from "./Page.vue";
import { fetchRecipeById, add } from "../../../rest-api/api/recipe";
import { mapRecipeModelToVm, mapRecipeVmToModel } from "./mapper";
import { createEmptyRecipe, createEmptyRecipeError } from "./viewModel";
import { validations } from "./validations";
import { Snackbar } from "../../../common/general";

export default Vue.extend({
  name: "RecipeAddPageContainer",
  components: { RecipeAddPage, Snackbar},
  props: { id: String },
  data() {
    return {
      recipe: createEmptyRecipe(),
      recipeError: createEmptyRecipeError(),
      snackbar: false,
      snackbarText: "Mensaje en receta"
    };
  },
  methods: {
    onUpdateRecipe(field: string, value: string) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };
      this.validateRecipeField(field, value);
    },
    onSave() {
      console.log("añadiendo receta");
      validations.validateForm(this.recipe).then((result) => {
        console.log(this.recipe);
        if (result.succeeded) {
          const recipe = mapRecipeVmToModel(this.recipe);
          add(recipe)
            .then((message) => {

              this.snackbar = true;
              this.snackbarText = message;
              setTimeout( () => this.$router.back(), 2000 )
            })
            .catch((error) => {
              this.snackbar = true;
              this.snackbarText = error;
            });
        } else {
          this.recipeError = {
            ...this.recipeError,
            ...result.fieldErrors,
          };
        }
      });
    },
    onAddIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
      
    },
    onRemoveIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((item) => item !== ingredient),
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
    },
    validateRecipeField(field, value) {
      validations.validateField(field, value).then((result) => this.updateRecipeError(field, result));
    },
    updateRecipeError(field, result) {
      this.recipeError = {
        ...this.recipeError,
        [field]: result,
      };
    },
  },
});
</script>
