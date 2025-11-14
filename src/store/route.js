import {defineStore} from "pinia";
import service from "@/plugins/axios";
import {CREATE, GET, UPDATE} from "@/api/route";

export const useRouteStore = defineStore("routeStore", {
  state: () => ({
    routes: [],
  }),
  getters: {
    getRoutes: (state) => state.routes
  },
  actions: {
    async actionGetRoute(params) {
      return new Promise((resolve, reject) => {
        service({
          url: GET,
          method: 'GET',
          params
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          throw err;
        });
      });
    },
    async actionCreateRoute(params) {
      return new Promise((resolve, reject) => {
        service({
          url: CREATE,
          method: 'POST',
          data: params
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          throw err;
        });
      });
    },
    async actionUpdateRoute(params) {
      return new Promise((resolve, reject) => {
        service({
          url: UPDATE(params.id),
          method: 'PUT',
          data: params
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          throw err;
        });
      });
    },
    async actionDeleteRoute(id) {
      return new Promise((resolve, reject) => {
        service({
          url: UPDATE(id),
          method: 'DELETE',
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          throw err;
        });
      });
    },
  }
});
