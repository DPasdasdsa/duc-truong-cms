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
        <h3>DANH SÁCH XE</h3>
      </div>
      <div class="box-layout_header-options">
        <el-button :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
      </div>
    </div>
    <div class="box-layout_body">
      <div class="mt-3">
        <el-table
          v-loading="loading"
          :data="filteredVehicles"
          border
          stripe
          class="w-full mt-3 rounded-lg overflow-hidden"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column prop="license_plate" label="Biển số" width="150" />
          <el-table-column prop="type" label="Loại xe" width="140" />
          <el-table-column prop="brand" label="Hãng xe" width="180" />
          <el-table-column prop="year" label="Năm SX" width="100" align="center" />
          <el-table-column label="Trạng thái" width="160" align="center">
            <template #default="{ row }">
              <el-tag
                :type="row.status === 'Đang hoạt động' ? 'success' : 'warning'"
              >
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Lái xe phụ trách" align="center">
            <template #default="{ row }">
              <span v-if="row.driver_id">#{{ row.driver_id }}</span>
              <el-tag type="info" v-else>Chưa phân công</el-tag>
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
const keyword = ref(null)
const filterStatus = ref('')

const vehicles = ref([
  {
    id: 1,
    license_plate: '51A-12345',
    type: 'Xe 29 chỗ',
    brand: 'Hyundai County',
    year: 2018,
    status: 'Đang hoạt động',
    driver_id: 1,
  },
  {
    id: 2,
    license_plate: '51B-67890',
    type: 'Xe 45 chỗ',
    brand: 'Thaco Universe',
    year: 2020,
    status: 'Đang bảo trì',
    driver_id: 2,
  },
  {
    id: 3,
    license_plate: '51C-54321',
    type: 'Xe 16 chỗ',
    brand: 'Ford Transit',
    year: 2017,
    status: 'Đang hoạt động',
    driver_id: 3,
  },
  {
    id: 4,
    license_plate: '51D-11223',
    type: 'Xe 7 chỗ',
    brand: 'Toyota Innova',
    year: 2019,
    status: 'Đang hoạt động',
    driver_id: 4,
  },
  {
    id: 5,
    license_plate: '51E-33445',
    type: 'Xe 45 chỗ',
    brand: 'Samco Felix',
    year: 2021,
    status: 'Đang bảo trì',
    driver_id: null,
  }
])

const filteredVehicles = computed(() => {
  if (!filterStatus.value) return vehicles.value
  return vehicles.value.filter(v => v.status === filterStatus.value)
})
</script>
