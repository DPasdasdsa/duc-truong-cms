<template>
  <div class="call-api">
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <div>{{ mixinMessage }}</div>
    <div @click="logMessage(123)">Click</div>
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
      <div v-for="(post, index) in posts" :key="index">
        <div>{{ post.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, reactive, ref} from 'vue'
import {usePostStore} from '@/store/post'
import {useLogger} from "@/composables/useLogger";

const posts = ref([])
const isLoading = ref(true)
const user = reactive({
  name: 'No Name',
  age: 12
})
const {appContext} = getCurrentInstance()
const {$formatNumber} = appContext.config.globalProperties
const postStore = usePostStore()
const {mixinMessage, logMessage} = useLogger()
onBeforeMount(async () => {
  isLoading.value = true
  await postStore.actionGetPost()
  posts.value = postStore.getPosts
  isLoading.value = false
  user.name = 'Nguyen Van A'
  user.age = $formatNumber(123.1)
})
</script>
