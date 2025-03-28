<template>
  <NavHeader/>
  <Sidebar :is-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar"/>
  <main class="main-content" :class="{ 'collapsed': isSidebarCollapsed }">
    <div class="box-layout">
      <router-view/>
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/layouts/Sidebar.vue";
import NavHeader from "@/components/layouts/NavHeader.vue";

export default {
  name: 'DefaultLayout',
  components: {NavHeader, Sidebar},
  data() {
    return {
      isSidebarCollapsed: false
    };
  },

  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
