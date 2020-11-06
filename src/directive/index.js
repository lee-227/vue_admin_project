import hasPermission from "./btnPermission";
const install = function(Vue) {
  Vue.directive("hasPerm", hasPermission);
};
export default install;
