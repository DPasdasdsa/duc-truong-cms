import service from "@/plugins/axios";
import * as api from '@/api/user.js';
export const state = {
  user: {
    name: 'DTH'
  },
};
export const getters = {
  getUser: (state) => state.user,
};
export const mutations = {
  getUser(state, data) {
    state.user = data;
  },
};
export const actions = {
  async actionGetUser({commit}) {
    await service({
      url: api.GET_TEACHER,
      method: 'GET'
    })
      .then((res) => {
        commit('getUser', {id:1, name: 'duong'});
      })
      .catch((err) => {
        throw err;
      });
  },
};
