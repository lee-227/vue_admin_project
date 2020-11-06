import * as types from "../action-types";
import { getRouters } from "../../api/menu";
import { routes as commonRoutes } from "../../router";
import Home from "@/views/Home";
export default {
  state: {
    addRoutes: [],
    routes: []
  },
  mutations: {
    [types.SET_ROUTES](state, routes) {
      state.addRoutes = routes;
      state.routes = commonRoutes.concat(routes);
    },
    [types.SET_PERMISSIONS]: (state, permissions) => {
      state.permissions = permissions;
    }
  },
  actions: {
    [types.GENERATE_ROUTES]({ commit }) {
      return new Promise((resolve, reject) => {
        getRouters()
          .then(res => {
            const routes = filterAsyncRouter(res.data);
            routes.push({ path: "*", redirect: "/404", hidden: true });
            commit(types.SET_ROUTES, routes);
            resolve(routes);
          })
          .catch(reject);
      });
    }
  }
};
function filterAsyncRouter(routes) {
  return routes.filter(route => {
    if (route.component === "Layout") {
      route.component = Home;
    } else {
      route.component = loadView(route.component);
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}
function loadView(path) {
  return () => import(`@/views/${path}`);
}
