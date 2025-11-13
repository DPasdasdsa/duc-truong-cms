<template>
  <loading-page v-if="loading"/>
  <div v-else class="box-layout profile-page">
    <div class="box-layout_header">
      <div class="box-layout_header-title p-0">
        <h3>THÔNG TIN TÀI KHOẢN ADMIN</h3>
        <p class="text-sm text-gray-500">Quản lý và cập nhật thông tin cá nhân, mật khẩu, và theo dõi lịch sử truy cập.</p>
      </div>
    </div>

    <div class="box-layout_body mt-4">
      <el-tabs v-model="activeTabName" type="card" class="modern-profile-tabs">

        <el-tab-pane name="info">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><i-ep-user-filled /></el-icon>
              <strong>Thông tin cơ bản</strong>
            </span>
          </template>

          <div class="tab-content-wrapper">
            <el-form :model="profileForm" ref="profileFormRef" label-position="top" class="custom-form">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="Tên người dùng" prop="name" class="modern-form-item">
                    <el-input v-model="profileForm.name" size="large" placeholder="Nhập tên của bạn" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Email (Không thể thay đổi)" prop="email" class="modern-form-item">
                    <el-input v-model="profileForm.email" size="large" disabled />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="Số điện thoại" prop="phone" class="modern-form-item">
                    <el-input v-model="profileForm.phone" size="large" placeholder="Nhập số điện thoại" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Chức vụ" prop="role" class="modern-form-item">
                    <el-input v-model="profileForm.role" size="large" disabled />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item class="mt-4">
                <el-button type="primary" :loading="loading" @click="saveProfile" size="large">
                  <el-icon><i-ep-check /></el-icon>
                  <span>Lưu thay đổi</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="password">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><i-ep-lock /></el-icon>
              <strong>Đổi mật khẩu</strong>
            </span>
          </template>

          <div class="tab-content-wrapper">
            <el-alert
              title="Lưu ý về bảo mật"
              description="Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt."
              type="warning"
              :closable="false"
              show-icon
              class="mb-6"
            />

            <el-form :model="passwordForm" ref="passwordFormRef" label-position="top" class="custom-form max-w-lg">
              <el-form-item label="Mật khẩu cũ" prop="currentPassword">
                <el-input v-model="passwordForm.currentPassword" type="password" show-password size="large" />
              </el-form-item>
              <el-form-item label="Mật khẩu mới" prop="newPassword">
                <el-input v-model="passwordForm.newPassword" type="password" show-password size="large" />
              </el-form-item>
              <el-form-item label="Xác nhận mật khẩu mới" prop="confirmPassword">
                <el-input v-model="passwordForm.confirmPassword" type="password" show-password size="large" />
              </el-form-item>

              <el-form-item class="mt-4">
                <el-button type="warning" :loading="loading" @click="changePassword" size="large">
                  <el-icon><i-ep-key /></el-icon>
                  <span>Đổi mật khẩu</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="history">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><i-ep-clock /></el-icon>
              <strong>Lịch sử hoạt động</strong>
            </span>
          </template>

          <div class="tab-content-wrapper p-4">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                :type="activity.type"
                :hollow="false"
                placement="top"
              >
                <el-card shadow="hover" class="timeline-card">
                  <h4 class="font-semibold text-base text-gray-800">{{ activity.title }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ activity.content }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>

            <div class="flex justify-center mt-6">
              <el-button link type="primary" size="large">
                Tải thêm hoạt động...
              </el-button>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import { ElMessage } from 'element-plus';
// import {useAuthStore} from "@/store/auth";
import LoadingPage from "@/components/Loading/LoadingPage.vue";
const loading = ref(false)
const profileFormRef = ref(null)
const passwordFormRef = ref(null)
const activeTabName = ref('info')
// const authStore = useAuthStore()

// onMounted(() => {
//   loadProfile()
// })
// const loadProfile = async () => {
//   loading.value = true
//   await authStore.actinGetMe().then((response) => {
//     if(response.data){
//       profileFormRef.value = response.data
//     }
//   })
//   loading.value = false
//
// }

// Dữ liệu Form Thông tin
const profileForm = ref({
  name: 'Đoàn Hữu Toàn',
  email: 'admin@riki.edu.vn',
  phone: '0987654321',
  role: 'Quản trị viên hệ thống'
});

// Dữ liệu Form Mật khẩu
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Dữ liệu Lịch sử hoạt động
const activities = ref([
  {
    title: 'Đăng nhập thành công',
    content: 'Từ IP: 192.168.1.100, trình duyệt Chrome trên Windows 10.',
    timestamp: '2025-11-08 09:30:00',
    type: 'success',
  },
  {
    title: 'Cập nhật thông tin cơ bản',
    content: 'Thay đổi tên người dùng và số điện thoại.',
    timestamp: '2025-11-07 15:45:00',
    type: 'primary',
  },
  {
    title: 'Phân công chuyến mới',
    content: 'Phân công xe 51D-11223 tuyến Sài Gòn → Đà Lạt.',
    timestamp: '2025-11-07 10:15:00',
    type: 'info',
  },
  {
    title: 'Đăng xuất',
    content: 'Hoàn tất phiên làm việc.',
    timestamp: '2025-11-06 18:00:00',
    type: 'default',
  },
]);

// Logic cho Tab Thông tin cơ bản
const saveProfile = () => {
  profileFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      console.log('Cập nhật thông tin:', profileForm.value);
      setTimeout(() => {
        loading.value = false;
        ElMessage.success('Cập nhật thông tin thành công!');
        activities.value.unshift({
          title: 'Cập nhật thông tin cá nhân',
          content: 'Cập nhật Tên và Số điện thoại.',
          timestamp: new Date().toLocaleString('vi-VN'),
          type: 'warning',
        });
      }, 800);
    }
  });
};

// Logic cho Tab Đổi mật khẩu
const changePassword = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        ElMessage.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
        return;
      }
      loading.value = true;
      console.log('Đổi mật khẩu:', passwordForm.value);
      setTimeout(() => {
        loading.value = false;
        ElMessage.success('Đổi mật khẩu thành công!');
        passwordFormRef.value.resetFields();
        activities.value.unshift({
          title: 'Đổi mật khẩu thành công',
          content: 'Thực hiện thay đổi mật khẩu đăng nhập.',
          timestamp: new Date().toLocaleString('vi-VN'),
          type: 'danger',
        });
      }, 800);
    }
  });
};
</script>

<style scoped>
/* Thêm CSS cho giao diện hiện đại */
.profile-page .box-layout_header-title p {
  margin-top: 5px;
  font-size: 0.9rem;
  color: #6c757d;
}

.modern-profile-tabs :deep(.el-tabs__header) {
  border-bottom: none;
  margin-bottom: 20px;
}

.modern-profile-tabs :deep(.el-tabs__item.is-active) {
  border-bottom-color: var(--color-primary);
}

.modern-profile-tabs :deep(.el-tabs__item) {
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
}

.modern-profile-tabs :deep(.el-tabs__content) {
  padding: 20px 0;
}

.tab-content-wrapper {
  /* Tạo khoảng cách bên trong tab content */
  padding: 0 10px;
}

.custom-tabs-label strong {
  margin-left: 5px;
}

.modern-form-item {
  margin-bottom: 25px;
}

.max-w-lg {
  max-width: 500px;
}

.timeline-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
