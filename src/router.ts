import Router, { RouteConfig } from "vue-router";
import  Vue from "vue";

import { LoginPageContainer } from "./pages/login";
import { RecipeListPageContainer } from "./pages/recipe/list";
import { EditRecipePageContainer } from "./pages/recipe/edit";
import { AddRecipePageContainer } from "./pages/recipe/add";

export const baseRoutes = {
  root: "/",
  login: "/login",
  recipe: "/recipe",
  edit: "/recipe/:id",
  add: "/add",
};

export type BaseRoutes = typeof baseRoutes;

const routes: RouteConfig[] = [
  { path: baseRoutes.root, redirect: baseRoutes.login},
  { path: baseRoutes.login, component: LoginPageContainer},
  { path: baseRoutes.recipe, component: RecipeListPageContainer},
  { path: baseRoutes.edit, component: EditRecipePageContainer, props: true},
  { path: baseRoutes.add, component: AddRecipePageContainer},
];
export const router = new Router({
  routes,
});

Vue.use(Router);
router.beforeEach((to, from, next) => {
  // Dos usuarios: public/1234 (entrar editar y no añadir) y admin/test (entrar, editar, añadir)
  // /login y /recipe (list) : publicas
  if (to.path === "/add") {
    if (localStorage.name === "admin") {
      next();
    } else {
      next("/login");
    }
  } else {
    let exp = new RegExp ('\/recipe\/[0-9]');
    switch (from.path) {
      case "/": 
        if(to.path==="/login") {
          next();
        } else {
          next("/login");
        }
        break;
      case "/login":
        if((to.path==="/recipe" )) {
          next();
        } 
        break;

      case "/recipe":
        if(localStorage.name !== undefined) {
          next();
        } else {
          to.path === "/login" ? next() : false;
        }
        break;

      default: 
        // Comprobar que cumple con la direccion de la receta
        exp.test(from.path) ? next() : false;
    }
  }
});