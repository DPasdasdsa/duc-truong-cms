<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2 class="login-title">Đăng nhập</h2>
      <LoginForm/>
      <div class="login-footer">
        <small>© 2025 Công ty DaoPham. All rights reserved.</small>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
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
