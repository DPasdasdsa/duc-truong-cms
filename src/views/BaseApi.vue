<template>
  <div class="call-api">
    <div v-if="isLoading">Chờ tí đang load ...</div>
    <div v-else v-for="(post, index) in posts" :key="index">
      <div>{{ post.title }}</div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from "pinia";
import {usePostStore} from "@/store/post";

export default {
  name: 'BaseApi',
  data() {
    return {
      posts: [],
      isLoading: true,
    }
  },
  async created() {
    this.isLoading = true;
    await this.actionGetPost();
    this.posts = this.getPosts
    this.isLoading = false;
  },
  computed: {
    ...mapState(usePostStore, ["getPosts"]) // Get state and getter.
  },
  methods: {
    ...mapActions(usePostStore, ["actionGetPost"]) // Call action.
  }
};
</script>
