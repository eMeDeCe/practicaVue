import { Recipe } from "../../model";
import { mockRecipes } from "./mockData";

let recipes = mockRecipes;

export const fetchRecipes = (): Promise<Recipe[]> => {
  return Promise.resolve(recipes);
};

export const fetchRecipeById = (id: number): Promise<Recipe> => {
  const recipe = recipes.find((r) => r.id === id);
  return Promise.resolve(recipe as Recipe);
};

export const save = (recipe: Recipe): Promise<string> => {
  const index = recipes.findIndex((r) => r.id === recipe.id);
  console.log("save", isValidRecipe(recipe));
  return index >= 0 && isValidRecipe(recipe) ? saveRecipeByIndex(index, recipe) : Promise.reject("Something was wrong saving recipe :(");
};

const saveRecipeByIndex = (index: number, recipe: Recipe): Promise<string> => {
  recipes = [...recipes.slice(0, index), recipe, ...recipes.slice(index + 1)];

  return Promise.resolve("Save recipe success");
};

/*const isValidRecipe = (recipe: Recipe) =>
  recipe.name !== "" && recipe.description !== "" && recipe.ingredients.length > 0;*/

const isValidRecipe = function (recipe: Recipe) {
  console.log("receta", recipe);
  recipe.name !== "" && recipe.description !== "" && recipe.ingredients.length > 0;
  console.log("descripcion", recipe.description);
  return 
}