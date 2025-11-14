import {defineStore} from "pinia";
import service from "@/plugins/axios";
import {CREATE, GET, UPDATE} from "@/api/vehicle";

export const useVehicleStore = defineStore("vehicleStore", {
  state: () => ({
    vehicles: [],
  }),
  getters: {
    getVehicles: (state) => state.vehicles
  },
  actions: {
    async actionGetVehicle(params) {
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
    async actionCreateVehicle(params) {
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
    async actionUpdateVehicle(params) {
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
    async actionDeleteVehicle(id) {
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
