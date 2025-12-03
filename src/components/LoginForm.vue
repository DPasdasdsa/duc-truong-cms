<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    class="login-form"
  >
    <el-form-item label="Tên đăng nhập" prop="email">
      <el-input
        v-model="form.username"
        placeholder="Nhập tên đăng nhập"
        :prefix-icon="User"
        @keyup.enter="onSubmit()"
      />
    </el-form-item>

    <el-form-item label="Mật khẩu" prop="password">
      <el-input
        v-model="form.password"
        placeholder="Nhập mật khẩu"
        show-password
        :prefix-icon="Lock"
        @keyup.enter="onSubmit()"
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
import {onMounted, ref} from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import router from "@/router";
import {useAuthStore} from "@/store/auth";
import {removeAccessToken, setAccessToken} from "@/utils/token";

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
onMounted(() => {
  removeAccessToken()
})

const setErrorField = (errors) => {
  if (!formRef.value) return
  formRef.value.clearValidate()
  formRef.value.fields.forEach(field => {
    if (errors[field.prop]) {
      field.validateMessage = errors[field.prop][0]
      field.validateState = 'error'
    }
  })
}

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    loading.value = true
    if (valid) {
      await authStore.actionLogin({
        email: form.value.username,
        password: form.value.password
      }).then(async (res) => {
        const data = res.data
        if (data) {
          await setAccessToken(data)
          ElMessage({
            message: 'Đăng nhập thành công !',
            type: 'success',
          })
          await router.push({
            name: 'Profile',
          })
        }
      }).catch(e => {
        ElMessage({
          message: 'Đăng nhập thất bại',
          type: 'error',
        })
        if(e.errors) {
          setErrorField(e.errors)
        }
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
