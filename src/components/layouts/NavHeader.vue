<template>
  <header class="header">
    <div class="header__left">
      <h1 class="text-logo">CMS-DT</h1>
    </div>
    <div class="header__right">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-for="(breadCrumb, index) in breadCrumbs" :key="index"
              :class="{active: index === (breadCrumbs.length -1)}">
            <router-link :to="{name:breadCrumb.name}">{{ breadCrumb.displayName }}</router-link>
          </li>
        </ol>
      </nav>
      <div class="header__right-user">
        <el-dropdown ref="dropdown1" trigger="click" style="margin-right: 30px">
          <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="" class="item-option-setting">
                  Thông tin cá nhân
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click="processLogout" class="item-option-setting">
                Đăng xuất
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script setup>

import router from "@/router";

const breadCrumbs = [
  {name: "Drivers", displayName: "Danh sách lái xe"},
]
const processLogout = async () => {
  router.push("/login")
}
</script>
