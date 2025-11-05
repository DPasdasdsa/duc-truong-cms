<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2 class="login-title">Đăng nhập</h2>

      <LoginForm @submit="handleLogin" :loading="loading" />

      <div class="login-footer">
        <small>© 2025 Công ty DaoPham. All rights reserved.</small>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue'

import router from "@/router";
import {ElMessage} from "element-plus";


const loading = ref(false)

const handleLogin = async (formData) => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if(formData.username === 'admin@riki.edu.vn'){
      ElMessage({
        message: 'Đăng nhập thành công !',
        type: 'success',
      })
      router.push({
        name: 'Drivers',
      })
    } else {
      ElMessage({
        message: 'Đăng nhập thất bại!',
        type: 'error',
      })
    }
  }, 2000)
  // try {
  //   console.log('Dữ liệu đăng nhập:', formData)
  //   // Gửi API đăng nhập ở đây
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  // } finally {
  //   loading.value = false
  // }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4e73df, #224abe);
}

.login-card {
  width: 380px;
  padding: 30px 25px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: #fff;
}

.login-title {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 600;
  color: #2f3640;
}

.login-footer {
  text-align: center;
  margin-top: 15px;
  color: #888;
  font-size: 12px;
}
</style>
