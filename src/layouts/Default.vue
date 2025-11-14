<template>
  <div v-if="isLoading" class="loading-full-page">
    <loading-page/>
  </div>
  <div v-else>
    <NavHeader/>
    <Sidebar :is-collapsed="isSidebarCollapsed" @toggleSidebar="toggleSidebar"/>
    <main class="main-content" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="main-content_body">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script setup>

import Sidebar from "@/components/layouts/Sidebar.vue";
import NavHeader from "@/components/layouts/NavHeader.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/store/auth";
import LoadingPage from "@/components/Loading/LoadingPage.vue";
const authStore = useAuthStore()


defineOptions({
  name: 'DefaultPageView'
})
const isSidebarCollapsed = ref(false)
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  await authStore.actinGetMe()
  isLoading.value = false
})
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}


</script>
