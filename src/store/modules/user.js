import { getInfo, logout } from "../../api/login";
import * as types from "../action-types";
import { setLocal } from "../../utils/local";
export default {
  state: {
    roles: [],
    permissions: []
  },
  mutations: {
    [types.SET_ROLES](state, roles) {
      state.roles = roles;
    },
    [types.SET_PERMISSIONS]: (state, permissions) => {
      state.permissions = permissions;
    }
  },
  actions: {
    [types.GET_INFO]({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            if (res.roles && res.roles.length > 0) {
              commit(types.SET_ROLES, res.roles); //设置用户角色用于获取对应菜单
            } else {
              commit(types.SET_ROLES, ["ROLE_DEFAULT"]);
            }
            commit(types.SET_PERMISSIONS, res.permissions); //按钮权限
            resolve(res);
          })
          .catch(reject);
      });
    },
    //后端登出
    [types.LOG_OUT]({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit(types.SET_ROLES, []);
            commit(types.SET_PERMISSIONS, []);
            setLocal("token", "");
            resolve();
          })
          .catch(reject);
      });
    },
    //前端登出
    [types.FED_LOG_OUT]() {
      return new Promise(resolve => {
        setLocal("token", "");
        resolve();
      });
    }
  }
};
