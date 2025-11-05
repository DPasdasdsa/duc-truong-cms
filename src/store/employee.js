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
      await service({
        url: GET,
        method: 'GET',
        params
      })
        .then((res) => {
          this.employees = res.data
        })
        .catch((err) => {
          throw err;
        });
    },
    async actionCreateEmployee() {
      return new Promise((resolve, reject) => {
        service({
          url: CREATE,
          method: 'POST',
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
