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
          :data="filteredDrivers"
          v-loading="loading"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column prop="name" label="Tên lái xe" width="180" />
          <el-table-column prop="phone" label="Số điện thoại" width="140" />
          <el-table-column prop="license_number" label="Số bằng lái" width="150" />
          <el-table-column prop="license_type" label="Hạng" width="80">
            <template #default="{ row }">
              <el-tag type="info">{{ row.license_type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="experience_years" label="Kinh nghiệm" width="120">
            <template #default="{ row }">
              {{ row.experience_years }} năm
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Trạng thái" width="160">
            <template #default="{ row }">
              <el-tag
                :type="getStatusType(row.status)"
              >
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="current_trip" label="Chuyến hiện tại" min-width="200">
            <template #default="{ row }">
              <span v-if="row.current_trip">{{ row.current_trip }}</span>
              <span v-else class="text-gray-400">Chưa được phân công</span>
            </template>
          </el-table-column>
          <el-table-column prop="vehicle" label="Phương tiện" min-width="200">
            <template #default="{ row }">
              <span v-if="row.vehicle">{{ row.vehicle }}</span>
              <span v-else class="text-gray-400">—</span>
            </template>
          </el-table-column>
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
          <ErrorMessage name="name" class="error_form"/>
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="phone" class="form-group positionR">
          <el-input v-model="formData.phone" placeholder="Nhập số điện thoại" />
          <ErrorMessage name="phone" class="error_form"/>
        </el-form-item>
        <el-form-item label="Số bằng lái" prop="license_number" class="form-group positionR">
          <el-input v-model="formData.license_number" placeholder="Nhập số bằng lái" />
          <ErrorMessage name="license_number" class="error_form"/>
        </el-form-item>
        <el-form-item label="Hạng bằng lái" prop="license_type" class="form-group positionR">
          <el-select v-model="formData.license_type" placeholder="Chọn hạng bằng lái" style="width: 100%">
            <el-option label="B1" value="B1" />
            <el-option label="B2" value="B2" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
            <el-option label="E" value="E" />
          </el-select>
          <ErrorMessage name="license_type" class="error_form"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showModal = false">Hủy</el-button>
          <el-button type="primary" :loading="formLoading">
            {{ isEditMode ? 'Lưu thay đổi' : 'Thêm' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>
<script setup>
import {Filter, Plus} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import {useEmployeeStore} from "@/store/employee";
import {ElMessage} from "element-plus";
import {ErrorMessage} from "vee-validate";
const employeeStore = useEmployeeStore();

onMounted(() => {
  loadData();
})
const loading = ref(true)
// 🔹 Dữ liệu mẫu
const drivers = ref([
  {
    id: 1,
    name: 'Nguyễn Văn Hùng',
    phone: '0905123456',
    license_number: '79A-123456',
    license_type: 'B2',
    experience_years: 5,
    status: 'Đang hoạt động',
    current_trip: 'Đà Nẵng → Huế',
    vehicle: 'Xe 45 chỗ - 43B-789.45'
  },
  {
    id: 2,
    name: 'Trần Quốc Thái',
    phone: '0988765432',
    license_number: '43B-654321',
    license_type: 'C',
    experience_years: 7,
    status: 'Đang nghỉ',
    current_trip: null,
    vehicle: null
  },
  {
    id: 3,
    name: 'Lê Minh Tâm',
    phone: '0934556677',
    license_number: '92C-998877',
    license_type: 'D',
    experience_years: 10,
    status: 'Đang lái',
    current_trip: 'Hội An → Tam Kỳ',
    vehicle: 'Xe tải 8 tấn - 92C-112.89'
  },
  {
    id: 4,
    name: 'Phạm Văn Dũng',
    phone: '0912345678',
    license_number: '74B-223344',
    license_type: 'B1',
    experience_years: 3,
    status: 'Đang bảo dưỡng xe',
    current_trip: null,
    vehicle: 'Xe 16 chỗ - 43B-221.77'
  },
  {
    id: 5,
    name: 'Đoàn Hữu Toàn',
    phone: '0909001122',
    license_number: '43C-112233',
    license_type: 'C',
    experience_years: 8,
    status: 'Đang hoạt động',
    current_trip: 'Đà Nẵng → Quảng Ngãi',
    vehicle: 'Xe container - 43C-556.88'
  }
])
const keyword = ref(null)
const search = ref('')
const showModal = ref(true)
const currentDriverId = ref(null)
const formLoading = ref(false)
const isEditMode = ref(false)
const filteredDrivers = computed(() => {
  return drivers.value.filter((d) =>
    d.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
const formData = reactive({
  name: '',
  phone: '',
  license_number: '',
  license_type: '',
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
  license_number: [
    { required: true, message: 'Vui lòng nhập số bằng lái', trigger: 'blur' },
    { min: 5, max: 20, message: 'Số bằng lái phải từ 5 đến 20 ký tự', trigger: 'blur' }
  ],
  license_type: [
    { required: true, message: 'Vui lòng chọn hạng bằng lái', trigger: 'change' }
  ],
})
const loadData = async () => {
    loading.value = true
    await employeeStore.actionGetEmployees({
      name: keyword.value,
    }).catch((err) => {
      ElMessage({
        message: err.message,
        type: 'error',
      })
    })
    loading.value = false
}
const getStatusType = (status) => {
  switch (status) {
    case 'Đang hoạt động':
      return 'success'
    case 'Đang lái':
      return 'warning'
    case 'Đang nghỉ':
      return 'info'
    case 'Đang nghỉ phép':
      return 'info'
    case 'Đang bảo dưỡng xe':
      return 'danger'
    default:
      return ''
  }
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
</script>
