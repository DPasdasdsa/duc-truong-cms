<template>
  <div :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__toggle" @click="toggleSidebar">
      <svg fill="currentColor" v-if="isCollapsed" height="15" viewBox="0 0 64 64"
           width="15" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m42.7 29.6c-5.5-5.5-11-11-16.5-16.5-.8-.8-1.6-1.6-2.4-2.4-1.8-1.8-4.7 1-2.8 2.8 5.5 5.5 11 11 16.5 16.5.3.3.6.6.9.9-5 5-10 10-15 15-.8.8-1.5 1.5-2.3 2.3-1.8 1.8 1 4.7 2.8 2.8l16.4-16.4 2.3-2.3c.9-.6.9-1.9.1-2.7z"/>
      </svg>
      <svg fill="currentColor" v-else height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
        <path id="angle-left"
              d="m15 19.75a.744.744 0 0 1 -.53-.22l-7-7a.749.749 0 0 1 0-1.06l7-7a.75.75 0 0 1 1.06 1.06l-6.469 6.47 6.469 6.47a.75.75 0 0 1 -.53 1.28z"
              fill="rgb(0,0,0)"/>
      </svg>
    </div>

    <div class="sidebar__menu">
      <div class="sidebar__group">
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <div class="sidebar__dropdown">
              <div class="sidebar__dropdown-header" @click="toggleDropdown($event)">
                <span class="icon-menu">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>
                </span>
                <span class="sidebar__text">Quản lý nhân sự</span>
              </div>
              <ul class="sidebar__dropdown-list">
                <li class="sidebar__dropdown-item">
                  <router-link :to="{name: 'Drivers'}" class="sidebar__link"  :class="{ 'active-sidebar-link': isActiveClass('/drivers') }">
                    <span class="sidebar__text">Danh sách nhân viên</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar__item">
            <div class="sidebar__dropdown">
              <div class="sidebar__dropdown-header" @click="toggleDropdown($event)">
                <span class="icon-menu">
                  <svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M128.896 736H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v96h164.544a32 32 0 0 1 31.616 27.136l54.144 352A32 32 0 0 1 922.688 736h-91.52a144 144 0 1 1-286.272 0H415.104a144 144 0 1 1-286.272 0zm23.36-64a143.872 143.872 0 0 1 239.488 0H568.32c17.088-25.6 42.24-45.376 71.744-55.808V256H128v416zm655.488 0h77.632l-19.648-128H704v64.896A144 144 0 0 1 807.744 672m48.128-192-14.72-96H704v96zM688 832a80 80 0 1 0 0-160 80 80 0 0 0 0 160m-416 0a80 80 0 1 0 0-160 80 80 0 0 0 0 160"></path></svg>
                </span>
                <span class="sidebar__text">Quản lý vận hành</span>
              </div>
              <ul class="sidebar__dropdown-list">
                <li class="sidebar__dropdown-item">
                  <router-link :to="{name:'Vehicles'}" class="sidebar__link">
                    <span class="sidebar__text">Danh sách Xe</span>
                  </router-link>
                  <router-link :to="{name:'Routes'}" class="sidebar__link">
                    <span class="sidebar__text">Danh sách Tuyến</span>
                  </router-link>
                  <router-link :to="{name:'Trips'}" class="sidebar__link">
                    <span class="sidebar__text">Quản lý lịch chạy</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
defineOptions({
  name: 'SidebarView'
})

const emit = defineEmits(['toggleSidebar']);
const route = useRoute();
const isCollapsed = ref(false)

const isActiveClass = (name) => {
  const current = route.path;
  return current === name || current.startsWith(`${name}/`);
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('toggleSidebar', isCollapsed.value);
}
onMounted(() => {
  activeClass()
})
const activeClass = () => {
  //Active class highlight.
  let active = document.getElementById('sidebar__menu');
  if (!active) {
    return
  }
  let item = active.querySelector('.active-sidebar-link');
  if (!item) {
    return
  }
  let parentWithClass = item.closest('.sidebar__dropdown');
  if (!parentWithClass) {
    return;
  }
  const dropdownHeader = parentWithClass.querySelector('.sidebar__dropdown-header')
  const dropdownList = parentWithClass.querySelector('.sidebar__dropdown-list')
  if (dropdownHeader && dropdownList) {
    addClassOpen(dropdownHeader, dropdownList)
  }
}
const toggleDropdown = (event) => {
  const dropdownHeader = event.currentTarget;
  const dropdownList = dropdownHeader.nextElementSibling;

  document.querySelectorAll('.sidebar__dropdown-list--open').forEach((openList) => {
    if (openList !== dropdownList) {
      openList.classList.remove('sidebar__dropdown-list--open');
      openList.previousElementSibling.classList.remove('sidebar__dropdown-header--open');
    }
  });
  addClassOpen(dropdownHeader, dropdownList)
}
const addClassOpen = (header, list) => {
  list.classList.toggle('sidebar__dropdown-list--open');
  header.classList.toggle('sidebar__dropdown-header--open');
}

</script>
