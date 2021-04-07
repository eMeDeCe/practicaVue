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
  { path: baseRoutes.root, redirect: baseRoutes.login, meta: {public: true} },
  { path: baseRoutes.login, component: LoginPageContainer, meta: {public: true}  },
  { path: baseRoutes.recipe, component: RecipeListPageContainer, meta: {public: true}  },
  { path: baseRoutes.edit, component: EditRecipePageContainer, props: true, meta: {public: true}  },
  { path: baseRoutes.add, component: AddRecipePageContainer, props: true, meta: {public: false}  },
];
export const router = new Router({
  routes,
});

Vue.use(Router);
router.beforeEach((to, from, next) => {
  // Dos usuarios: public/1234 (entrar editar y no añadir) y admin/test (entrar, editar, añadir)
  if (to.path === "/add") {
    if (localStorage.name === "admin") {
      next();
    } else {
      next("/login");
    }
  } else {
    if (to.path === "/login") {
      next();
    }
    else {
      // Ningun usuario autenticado. Usar $session
      if( localStorage.name === undefined) {
        next("/login");
      }
    }
  }
});