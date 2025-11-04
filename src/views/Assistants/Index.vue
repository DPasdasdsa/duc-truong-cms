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
        <h3>DANH SÁCH PHỤ XE</h3>
      </div>
      <div class="box-layout_header-options">
        <el-button :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
      </div>
    </div>
    <div class="box-layout_body">
      <div class="mt-3">

        <el-table
          v-loading="loading"
          :data="filteredAssistants"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column prop="name" label="Tên phụ xe" width="180" />
          <el-table-column prop="phone" label="Số điện thoại" width="140" />
          <el-table-column prop="experience_years" label="Kinh nghiệm" width="120">
            <template #default="{ row }">
              {{ row.experience_years }} năm
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Trạng thái" width="160">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="current_trip" label="Chuyến hiện tại" min-width="220">
            <template #default="{ row }">
              <span v-if="row.current_trip">{{ row.current_trip }}</span>
              <span v-else class="text-gray-400">Chưa được phân công</span>
            </template>
          </el-table-column>
          <el-table-column prop="vehicle" label="Phương tiện" min-width="220">
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
const keyword = ref(null)
const assistants = ref([
  {
    id: 1,
    name: 'Phạm Hữu Lộc',
    phone: '0905123789',
    experience_years: 4,
    status: 'Đang hỗ trợ chuyến',
    current_trip: 'Đà Nẵng → Huế',
    vehicle: 'Xe 45 chỗ - 43B-789.45'
  },
  {
    id: 2,
    name: 'Nguyễn Thành Nhân',
    phone: '0934112233',
    experience_years: 2,
    status: 'Đang chờ phân công',
    current_trip: null,
    vehicle: null
  },
  {
    id: 3,
    name: 'Lê Văn Quý',
    phone: '0912556677',
    experience_years: 5,
    status: 'Đang hỗ trợ chuyến',
    current_trip: 'Hội An → Tam Kỳ',
    vehicle: 'Xe tải 8 tấn - 92C-112.89'
  },
  {
    id: 4,
    name: 'Võ Minh Tâm',
    phone: '0988771122',
    experience_years: 3,
    status: 'Đang nghỉ phép',
    current_trip: null,
    vehicle: null
  },
  {
    id: 5,
    name: 'Trần Hữu Phước',
    phone: '0977445566',
    experience_years: 6,
    status: 'Đang hỗ trợ chuyến',
    current_trip: 'Đà Nẵng → Quảng Ngãi',
    vehicle: 'Xe container - 43C-556.88'
  },
  {
    id: 6,
    name: 'Nguyễn Văn Hiệp',
    phone: '0909667788',
    experience_years: 1,
    status: 'Đang chờ phân công',
    current_trip: null,
    vehicle: null
  },
  {
    id: 7,
    name: 'Bùi Văn Dũng',
    phone: '0938774455',
    experience_years: 3,
    status: 'Đang hỗ trợ chuyến',
    current_trip: 'Tam Kỳ → Quảng Nam',
    vehicle: 'Xe 29 chỗ - 92B-333.66'
  },
  {
    id: 8,
    name: 'Đỗ Thành Trung',
    phone: '0915667788',
    experience_years: 7,
    status: 'Đang hoạt động',
    current_trip: null,
    vehicle: null
  }
])

const search = ref('')

const filteredAssistants = computed(() =>
  assistants.value.filter((a) =>
    a.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const getStatusType = (status) => {
  switch (status) {
    case 'Đang hỗ trợ chuyến':
      return 'success'
    case 'Đang chờ phân công':
      return 'info'
    case 'Đang nghỉ phép':
      return 'warning'
    case 'Đang hoạt động':
      return 'primary'
    default:
      return ''
  }
}
</script>
