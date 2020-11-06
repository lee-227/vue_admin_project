import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "../store";
import router from "./index";
import { getLocal } from "../utils/local";
import * as types from "../store/action-types";
NProgress.configure({ showSpinner: false });
let whiteList = ["/login", "/404"];

export default {
  permissionHook: function(to, from, next) {
    NProgress.start();
    if (getLocal("token")) {
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        if (store.state.user.roles.length === 0) {
          store
            .dispatch(`user/${types.GET_INFO}`)
            .then(res => {
              let roles = res.roles;
              store
                .dispatch(`permission/${types.GENERATE_ROUTES}`, { roles })
                .then(routes => {
                  router.addRoutes(routes);
                  next({ ...to, replace: true }); //hack方法确保addRoutes已完成
                });
            })
            .catch(() => {
              store.dispatch(`user/${types.FED_LOG_OUT}`).then(() => {
                next({ path: "/" });
              });
            });
        } else {
          next();
          NProgress.done();
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next();
        NProgress.done();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
};
