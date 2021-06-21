import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    const loginUser = store.getters["authentication/getLoginResponse"];
    if (loginUser.access_token) {
      if (
        to.path === "/signup" ||
        to.path === "/" ||
        to.path === "/login"
      ) {
        next(from.fullPath);
      } else {
        next();
      }
    } else {
      if (
        to.path === "/todoList" ||
        to.path === "/create" ||
        to.path === "/edit"
      ) {
        next(from.fullPath);
      } else {
        next();
      }
    }
  });

  return Router;
}
