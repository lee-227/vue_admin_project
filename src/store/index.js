import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const rootModule = {
  modules: {}
};
const files = require.context("./modules", false, /\.js/);
files.keys().forEach(key => {
  let moduleName = key.replace(/\.\//, "").replace(/\.js/, "");
  let store = files(key).default;
  rootModule.modules[moduleName] = store;
  rootModule.modules[moduleName].namespaced = true;
});
export default new Vuex.Store(rootModule);
