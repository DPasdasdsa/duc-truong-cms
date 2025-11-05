<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    class="login-form"
  >
    <el-form-item label="Tên đăng nhập" prop="username">
      <el-input
        v-model="form.username"
        placeholder="Nhập tên đăng nhập"
        :prefix-icon="User"
      />
    </el-form-item>

    <el-form-item label="Mật khẩu" prop="password">
      <el-input
        v-model="form.password"
        placeholder="Nhập mật khẩu"
        show-password
        :prefix-icon="Lock"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="login-btn"
        :loading="loading"
        @click="onSubmit"
        block
      >
        Đăng nhập
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import router from "@/router";
import {useAuthStore} from "@/store/auth";
import {setAccessToken} from "@/utils/token";

const authStore = useAuthStore();
const loading = ref(false);
const formRef = ref()
const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' }],
  password: [{ required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' }]
}

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    loading.value = true
    if (valid) {
      await authStore.actionLogin({
        email: form.value.username,
        password: form.value.password
      }).then(res => {
        const data = res.data
        if(data) {
          setAccessToken(data)
          ElMessage({
            message: 'Đăng nhập thành công !',
            type: 'success',
          })
          router.push({
            name: 'Drivers',
          })
        }
      }).catch((e) => {
        ElMessage({
          message: e.message,
          type: 'error',
        })
      })
    }
    loading.value = false
  })
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-btn {
  width: 100%;
  height: 40px;
  border-radius: 8px;
}
</style>
