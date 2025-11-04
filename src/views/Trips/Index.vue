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
        <h3>DANH SÁCH CHUYẾN XE</h3>
      </div>
      <div class="box-layout_header-options">
        <el-button :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
      </div>
    </div>
    <div class="box-layout_body">
      <div class="mt-3">
        <el-table
          v-loading="loading"
          :data="filteredTrips"
          border
          stripe
          class="w-full mt-3 rounded-lg overflow-hidden"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column prop="route_name" label="Tuyến" width="180" />
          <el-table-column prop="vehicle.license_plate" label="Xe" width="120" />
          <el-table-column label="Lái xe" width="160">
            <template #default="{ row }">
              <span>{{ row.driver.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Phụ xe" width="180">
            <template #default="{ row }">
            <span v-if="row.assistants.length">
              {{ row.assistants.map(a => a.name).join(', ') }}
            </span>
              <el-tag v-else type="info">Không có</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Thời gian" width="200">
            <template #default="{ row }">
              {{ formatTime(row.departure_time) }} - {{ formatTime(row.return_time) }}
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" align="center">
            <template #default="{ row }">
              <el-tag
                :type="getStatusType(row.status)"
                effect="dark"
              >
                {{ row.status }}
              </el-tag>
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
import {dayjs} from "element-plus";
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
const loading = ref(true)
const keyword = ref(null)
const filterStatus = ref('')
const filterRoute = ref('')

const trips = ref([
  {
    id: 1,
    route_name: 'Sài Gòn → Vũng Tàu',
    vehicle: { license_plate: '51A-12345' },
    driver: { name: 'Nguyễn Văn A' },
    assistants: [{ name: 'Trần Văn B' }, { name: 'Lê Văn C' }],
    departure_time: '2025-11-04T06:00:00',
    return_time: '2025-11-04T10:00:00',
    status: 'Chưa khởi hành',
  },
  {
    id: 2,
    route_name: 'Sài Gòn → Cần Thơ',
    vehicle: { license_plate: '51B-67890' },
    driver: { name: 'Phạm Văn D' },
    assistants: [{ name: 'Ngô Văn E' }],
    departure_time: '2025-11-04T08:00:00',
    return_time: '2025-11-04T12:00:00',
    status: 'Đang chạy',
  },
  {
    id: 3,
    route_name: 'Sài Gòn → Biên Hòa',
    vehicle: { license_plate: '51C-54321' },
    driver: { name: 'Lý Văn F' },
    assistants: [],
    departure_time: '2025-11-04T09:00:00',
    return_time: '2025-11-04T11:00:00',
    status: 'Hoàn thành',
  },
  {
    id: 4,
    route_name: 'Sài Gòn → Đà Lạt',
    vehicle: { license_plate: '51D-11223' },
    driver: { name: 'Trần Văn G' },
    assistants: [{ name: 'Võ Văn H' }, { name: 'Đỗ Văn I' }],
    departure_time: '2025-11-04T13:00:00',
    return_time: '2025-11-04T19:00:00',
    status: 'Chưa khởi hành',
  },
  {
    id: 5,
    route_name: 'Sài Gòn → Nha Trang',
    vehicle: { license_plate: '51E-33445' },
    driver: { name: 'Nguyễn Văn K' },
    assistants: [],
    departure_time: '2025-11-04T20:00:00',
    return_time: '2025-11-05T02:00:00',
    status: 'Đang chạy',
  },
])

const uniqueRoutes = computed(() =>
  [...new Set(trips.value.map(t => t.route_name))]
)

const filteredTrips = computed(() => {
  return trips.value.filter(t => {
    const byStatus = !filterStatus.value || t.status === filterStatus.value
    const byRoute = !filterRoute.value || t.route_name === filterRoute.value
    return byStatus && byRoute
  })
})

const formatTime = time => dayjs(time).format('HH:mm')
const getStatusType = status => {
  switch (status) {
    case 'Chưa khởi hành':
      return 'info'
    case 'Đang chạy':
      return 'warning'
    case 'Hoàn thành':
      return 'success'
    default:
      return 'default'
  }
}
</script>
