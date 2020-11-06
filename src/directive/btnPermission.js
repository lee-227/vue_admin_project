import store from "@/store";
export default {
  inserted(el, binding) {
    const { value } = binding;
    const all_permission = "*:*:*";
    const permissions = store.user.permissions;
    if (value && value instanceof Array && value.length > 0) {
      const hasPermissions = permissions.some(perm => {
        return perm === all_permission || value.includes(perm);
      });
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置权限标签`);
    }
  }
};
