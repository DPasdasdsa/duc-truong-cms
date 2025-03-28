import {defineStore} from "pinia";
// import service from "@/plugins/axios";
// import * as api from "@/api/user.js";

export const useUserStore = defineStore("user123", {
  state: () => ({
    user: {name: "DTH"}
  }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    async actionGetUser() {
      return this.user = {id: 1, name: "duong"};
    }
  }
});
