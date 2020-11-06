import Vue from "vue";
import VueRouter from "vue-router";
import hooks from "./hook";
Vue.use(VueRouter);

export const routes = [];
const files = require.context("./routes", false, /\.router.js$/);
files.keys().forEach(key => {
  routes.push(...files(key).default);
});
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
Object.values(hooks).forEach(hook => {
  router.beforeEach(hook.bind(router));
});
export default router;
