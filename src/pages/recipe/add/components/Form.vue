<template>


  <v-form>
    <v-text-field
      filled
      label="Añadiendo receta"
      :value="recipe.name"
      :rules="[resultRecipeErrorName]"
      @input="(name) => onUpdateRecipe('name', name)"
      @click:append="onAddIngredient(ingredient)"
    />

    <v-text-field
      filled
      label="Ingredients"
      placeholder="Add ingredient"
      :append-icon="ingredient ? 'add' : undefined"
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
  
    <v-card-title>
      {{recipe.name}}
    </v-card-title>

    <v-card-subtitle>
      Gracias por la nueva receta :)
    </v-card-subtitle>



  </v-card>


    <v-btn type="button" color="success" :disabled="!this.recipeError.name.succeeded || !this.recipeError.description.succeeded || recipe.ingredients.length == 0" @click.prevent="onSave">Save</v-btn>
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
      show: false,
      ingredient: ""
    };
  },
  computed: {
    resultRecipeErrorName(): boolean | string {
    
      return this.recipeError.name.succeeded || this.recipeError.name.message;
    },

     resultIngredients(): boolean | string {
    
      return true
    },

     resultRecipeErrorDescription(): boolean | string {
      return this.recipeError.description.succeeded || this.recipeError.description.message;
    },
  },
});
</script>
