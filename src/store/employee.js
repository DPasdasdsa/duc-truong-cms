import {defineStore} from "pinia";
import service from "@/plugins/axios";
import {CREATE, GET, UPDATE} from "@/api/employee";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    employees: [],
  }),
  getters: {
    getEmployees: (state) => state.employees
  },
  actions: {
    async actionGetEmployees(params) {
      return new Promise((resolve, reject) => {
        service({
          url: CREATE,
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
    async actionCreateEmployee(params) {
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
    async actionUpdateEmployee(params) {
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
    async actionDeleteEmployee(id) {
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
