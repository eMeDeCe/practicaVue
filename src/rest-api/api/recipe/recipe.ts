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
  return index >= 0 && isValidRecipe(recipe) ? saveRecipeByIndex(index, recipe) : Promise.reject("Something was wrong saving recipe :(");
};

export const add = (recipe: Recipe): Promise<string> => {
 const index = recipes[recipes.length - 1].id + 1;
 return index >= 0 && isValidRecipe(recipe) ? saveRecipeByIndex(index, recipe) : Promise.reject("Something was wrong saving recipe :(");
};

/*export const remove = (recipe: Recipe): Promise<string> => {
  
 };*/

const saveRecipeByIndex = (index: number, recipe: Recipe): Promise<string> => {
  recipes = [...recipes.slice(0, index), recipe, ...recipes.slice(index + 1)];
  return Promise.resolve("Save recipe success");
};

const isValidRecipe = function (recipe: Recipe) {
  return recipe.name !== "" && recipe.description !== "" && recipe.ingredients.length > 0;
};
