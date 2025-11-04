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

const props = defineProps({
  loading: Boolean
})

const emit = defineEmits(['submit'])

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
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', form.value)
    }
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
