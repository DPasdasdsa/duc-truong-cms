import {defineStore} from "pinia";
import service from "@/plugins/axios";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: []
  }),
  getters: {
    getPosts: (state) => state.posts
  },
  actions: {
    async actionGetPost() {
      await service({
        url: '/posts',
        method: 'GET',
      })
        .then((res) => {
          this.posts = res
        })
        .catch((err) => {
          throw err;
        });
    },
    // async actionGetPost() {
    //   return new Promise((resolve, reject) => {
    //     service({
    //       url: 'https://jsonplaceholder.typicode.com/posts',
    //       method: 'GET',
    //     }).then(res => {
    //       resolve(res);
    //     }).catch(err => {
    //       reject(err);
    //       throw err;
    //     });
    //   });
    // },
  }
});
