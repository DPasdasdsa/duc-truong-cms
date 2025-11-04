<template>
  <div class="assignment-calendar p-6 bg-gray-50 min-h-screen">
    <el-calendar v-loading="loading" v-model="currentDate">
        <template #dateCell="{ data }">
          <div
            class="p-2 min-h-[120px] border border-gray-100 rounded-md hover:bg-blue-50 transition cursor-pointer"
            @click="handleDateClick(data.day)"
          >
            <div class="font-medium text-gray-700">
              {{ data.day.split('-')[2] }}
            </div>

            <div v-if="getAssignments(data.day).length">
              <div
                v-for="(trip, index) in getAssignments(data.day)"
                :key="index"
                class="bg-white mt-1 p-2 rounded-md shadow-sm border border-gray-200"
              >
                <div class="flex justify-between items-center">
                  <span class="text-sm font-semibold text-blue-600">{{ trip.route_name }}</span>
                  <el-tag
                    :type="getStatusType(trip.status)"
                    size="small"
                    class="ml-2"
                  >
                    {{ trip.status }}
                  </el-tag>
                </div>
                <div class="text-xs text-gray-600 mt-1">
                  <div>🕒 {{ formatTime(trip.departure_time) }} → {{ formatTime(trip.return_time) }}</div>
                  <div>🚘 {{ trip.vehicle.license_plate }}</div>
                  <div>👨‍✈️ {{ trip.driver.name }}</div>
                  <div v-if="trip.assistants.length">
                    👥 {{ trip.assistants.map(a => a.name).join(', ') }}
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-xs text-gray-400 mt-3 text-center">— Không có chuyến —</div>
          </div>
        </template>
      </el-calendar>
    <!-- Dialog xem chi tiết ngày -->
    <el-dialog
      v-model="dialogVisible"
      :title="`Chi tiết phân công ngày ${formatDate(selectedDate)}`"
      width="600px"
    >
      <div v-if="selectedTrips.length">
        <el-timeline>
          <el-timeline-item
            v-for="(trip, i) in selectedTrips"
            :key="i"
            :timestamp="`${formatTime(trip.departure_time)} → ${formatTime(trip.return_time)}`"
            :type="getStatusType(trip.status)"
          >
            <h4 class="font-semibold text-blue-600">{{ trip.route_name }}</h4>
            <p>🚘 Xe: {{ trip.vehicle.license_plate }}</p>
            <p>👨‍✈️ Lái: {{ trip.driver.name }}</p>
            <p v-if="trip.assistants.length">👥 Phụ: {{ trip.assistants.map(a => a.name).join(', ') }}</p>
            <el-tag :type="getStatusType(trip.status)" size="small" class="mt-2">{{ trip.status }}</el-tag>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div v-else class="text-gray-500 text-center py-6">
        Không có chuyến nào trong ngày này.
      </div>

      <template #footer>
        <div class="flex justify-end">
          <el-button type="primary" @click="addAssignment">Phân công mới</el-button>
          <el-button @click="dialogVisible = false">Đóng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
import dayjs from 'dayjs'
const currentDate = ref(new Date())
const selectedRoute = ref('')
const dialogVisible = ref(false)
const selectedDate = ref(null)
const selectedTrips = ref([])
const loading = ref(false)

const routes = ['Sài Gòn → Vũng Tàu', 'Sài Gòn → Cần Thơ', 'Sài Gòn → Nha Trang']

const assignments = ref([
  {
    date: '2025-11-04',
    route_name: 'Sài Gòn → Vũng Tàu',
    vehicle: { license_plate: '51A-12345' },
    driver: { name: 'Nguyễn Văn A' },
    assistants: [{ name: 'Trần Văn B' }, { name: 'Lê Văn C' }],
    departure_time: '2025-11-04T06:00:00',
    return_time: '2025-11-04T10:00:00',
    status: 'Hoàn thành',
  },
  {
    date: '2025-11-04',
    route_name: 'Sài Gòn → Cần Thơ',
    vehicle: { license_plate: '51B-67890' },
    driver: { name: 'Phạm Văn D' },
    assistants: [{ name: 'Ngô Văn E' }],
    departure_time: '2025-11-04T13:00:00',
    return_time: '2025-11-04T17:00:00',
    status: 'Đang chạy',
  },
  {
    date: '2025-11-05',
    route_name: 'Sài Gòn → Nha Trang',
    vehicle: { license_plate: '51E-33445' },
    driver: { name: 'Nguyễn Văn K' },
    assistants: [],
    departure_time: '2025-11-05T08:00:00',
    return_time: '2025-11-05T14:00:00',
    status: 'Chưa khởi hành',
  },
])

const handleDateClick = (date) => {
  selectedDate.value = date
  selectedTrips.value = getAssignments(date)
  dialogVisible.value = true
}

const getAssignments = (date) => {
  return assignments.value.filter(t => {
    const byDate = t.date === date
    const byRoute = !selectedRoute.value || t.route_name === selectedRoute.value
    return byDate && byRoute
  })
}

const formatTime = (time) => dayjs(time).format('HH:mm')
const formatDate = (date) => dayjs(date).format('DD/MM/YYYY')

const getStatusType = (status) => {
  switch (status) {
    case 'Chưa khởi hành': return 'info'
    case 'Đang chạy': return 'warning'
    case 'Hoàn thành': return 'success'
    default: return 'default'
  }
}

const addAssignment = () => {
  console.log('Mở form thêm phân công cho ngày:', selectedDate.value)
  // Tại đây bạn có thể mở dialog mới để nhập dữ liệu phân công
}
</script>

<style scoped>
.assignment-calendar {
  background: #f9fafb;
}
.el-calendar {
  background: #fff;
  border-radius: 12px;
}
</style>
