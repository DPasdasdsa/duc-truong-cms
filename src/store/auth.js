import {defineStore} from "pinia";
import {LOGIN, LOGOUT, ME} from "@/api/auth.js";
import service from "@/plugins/axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    async actinGetMe(params) {
      await service({
        url: ME,
        method: 'GET',
        params
      })
        .then((res) => {
          if(res.data) {
            this.user = res.data
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    async actionLogout() {
      return new Promise((resolve, reject) => {
        service({
          url: LOGOUT,
          method: 'POST',
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          throw err;
        });
      });
    },
    async actionLogin(params) {
      return new Promise((resolve, reject) => {
        service({
          url: LOGIN,
          method: 'POST',
          data: params
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
  }
});
