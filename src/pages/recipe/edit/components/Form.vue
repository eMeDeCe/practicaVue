<template>
  <v-form>
    <v-text-field
      filled
      label="Name"
      :value="recipe.name"
      :rules="[resultRecipeErrorName]"
      @input="(name) => onUpdateRecipe('name', name)"
      @click:append="onAddIngredient(ingredient)"
    />

    <v-text-field
      filled
      label="Ingredients"
      placeholder="Add ingredient"
      append-icon="add"
      v-model="ingredient"
      @click:append="onAddIngredient(ingredient)"
    />

    <ingredient-list-component :ingredients="recipe.ingredients" :on-remove-ingredient="onRemoveIngredient" />

    <v-alert :value="!recipeError.ingredients.succeeded" color="error" outlined>{{
      recipeError.ingredients.message
    }}</v-alert>

    <v-textarea
      label="Description"
      filled
      placeholder="Description...."
      rows="10"
      :value="recipe.description"
      :rules="[resultRecipeErrorDescription]"
      :no-resize="true"
      @input="(value) => onUpdateRecipe('description', value)"
    ></v-textarea>

    <v-card
    class="mx-auto"
    max-width="100%"
    >
    <v-img
      :src="recipe.picture"
      height="250px"
    ></v-img>

    <v-card-title>
      {{recipe.name}}
    </v-card-title>

    <v-card-subtitle>
      Enjoy with this recipe
    </v-card-subtitle>



  </v-card>


    <v-btn type="button" color="success" @click.prevent="onSave">Save</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import IngredientListComponent from "./IngredientList.vue";
import { FormProps } from "../formProps";

export default Vue.extend({
  name: "FormComponent",
  components: { IngredientListComponent },
  props: {
    recipe: { required: true },
    recipeError: { required: true },
    onUpdateRecipe: { required: true },
    onSave: { required: true },
    onRemoveIngredient: { required: true },
    onAddIngredient: { required: true },
  } as FormProps,
  data() {
    return {
      ingredient: "",
    };
  },
  computed: {
    resultRecipeErrorName(): boolean | string {
      return this.recipeError.name.succeeded || this.recipeError.name.message;
    },

     resultRecipeErrorDescription(): boolean | string {
      return this.recipeError.description.succeeded || this.recipeError.description.message;
    },
  },
});
</script>
