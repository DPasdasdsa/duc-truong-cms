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
        <el-button :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
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
  </section>
</template>
<script setup>
import {Filter, Plus} from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
const filteredDrivers = computed(() => {
  return drivers.value.filter((d) =>
    d.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
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
</script>
