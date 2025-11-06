<template>
  <div class="box-layout">
    <div class="header_filter w-100">
      <el-collapse class="header_filter-collapse">
        <el-collapse-item name="1">
          <template #title>
            <h3>
              <el-icon>
                <Filter/>
              </el-icon>
              Tìm kiếm nâng cao
            </h3>
          </template>
          <div class="row">
            <div class="col-12 form-group mb-0">
              <label class="label">Tìm kiếm theo từ khóa</label>
              <el-input
                size="large"
                v-model="keyword"
                placeholder="Nhập từ khóa tìm kiếm ..."
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <section class="box-layout">
    <div class="box-layout_header">
      <div class="box-layout_header-title p-0">
        <h3>DANH SÁCH LÁI XE</h3>
      </div>
      <div class="box-layout_header-options">
        <el-button @click="openModal('create')" :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
      </div>
    </div>
    <div class="box-layout_body">
      <div class="mt-3">
        <el-table
          :data="drivers"
          v-loading="loading"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column prop="name" label="Tên lái xe" />
          <el-table-column prop="phone" label="Số điện thoại" width="140" />
          <el-table-column prop="role" label="Chức vụ" width="160">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.role)">
                {{ row.role === 'driver' ? 'Tài xế' : 'Phụ xe' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="Ngày tạo" width="140" />
        </el-table>
      </div>
    </div>
    <el-dialog
      v-model="showModal"
      :title="isEditMode ? 'CHỈNH SỬA LÁI XE' : 'THÊM MỚI LÁI XE'"
      width="500"
      :close-on-click-modal="false"
      class="rounded-lg"
    >
      <el-form
        ref="driverFormRef"
        :model="formData"
        :rules="formRules"
        label-position="top"
      >
        <el-form-item label="Tên lái xe" prop="name" class="form-group positionR">
          <el-input v-model="formData.name" placeholder="Nhập tên lái xe" />
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="phone" class="form-group positionR">
          <el-input v-model="formData.phone" placeholder="Nhập số điện thoại" />
        </el-form-item>
        <el-form-item label="Chức vụ" prop="role" class="form-group positionR">
          <el-select v-model="formData.role" placeholder="Chọn chức vụ" style="width: 100%">
            <el-option label="Tài xế" value="driver" />
            <el-option label="Phụ xe" value="assistant" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showModal = false">Hủy</el-button>
          <el-button type="primary" v-loading="formLoading" @click="createOrUpdate">
            {{ isEditMode ? 'Chỉnh sửa' : 'Thêm mới'}}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>
<script setup>
import {Filter, Plus} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {useEmployeeStore} from "@/store/employee";
import {ElMessage} from "element-plus";
const employeeStore = useEmployeeStore();

onMounted(() => {
  loadData();
})

const loading = ref(true)
// 🔹 Dữ liệu mẫu
const drivers = ref([])
const keyword = ref(null)
const search = ref('')
const showModal = ref(false)
const currentDriverId = ref(null)
const formLoading = ref(false)
const isEditMode = ref(false)
const driverFormRef = ref(null)
const formData = reactive({
  name: '',
  phone: '',
  role: 'driver',
})
const formRules = reactive({
  name: [
    { required: true, message: 'Vui lòng nhập tên lái xe', trigger: 'blur' },
    { min: 3, max: 50, message: 'Tên phải từ 3 đến 50 ký tự', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
    { pattern: /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ', trigger: 'blur' }
  ],
  role: [
    { required: true, message: 'Vui lòng chọn chức vụ', trigger: 'change' }
  ],
})
const loadData = async () => {
  loading.value = true
  await employeeStore.actionGetEmployees({
    name: keyword.value,
  }).then((response) => {
    if (response && response.data) {
      drivers.value = response.data
    }
  }).catch((err) => {
    ElMessage({
      message: err.status.message,
      type: 'error',
    })
  })
  loading.value = false
}
const getStatusType = (role) => {
  switch (role) {
    case 'driver':
      return 'success'
    default:
      return 'info'
  }
}
const resetForm = () => {
  if(driverFormRef.value) {
    driverFormRef.value.resetFields()
  }
  showModal.value = false
}
const openModal = (mode, id = null) => {
  if (mode === 'create') {
    isEditMode.value = false
    currentDriverId.value = null
    // Reset form data nếu có
  } else if (mode === 'edit' && id) {
    isEditMode.value = true
    currentDriverId.value = id
    // Tải dữ liệu lái xe (row.id) vào form
  }
  showModal.value = true
}
const setErrorField = (errors) => {
  if(!driverFormRef.value) return
   Object.keys(errors).map(field => ({
     driverFormRef.value.validateField(field)
  }))
}
const createOrUpdate = async () => {
  if(!driverFormRef.value) return
  formLoading.value = true
  await driverFormRef.value.validate((valid, fields) => {
    if (valid) {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        id:currentDriverId.value,
      }
      const response = !currentDriverId.value ? employeeStore.actionCreateEmployee(payload)
      :employeeStore.actionUpdateEmployee(payload)
      response.then((response) => {
        ElMessage({
          message: response.message,
          type: 'success',
        })
        // update list data
        loadData();
        resetForm()
      }).catch((err) => {
        if(err.errors) {
          setErrorField(err.errors)
        }
        ElMessage({
          message: err.message,
          type: 'error',
        })
      })
    }
  })
  formLoading.value = false
}
</script>
