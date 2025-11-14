<template>
  <div class="dispatch-scheduler-page">
    <el-row class="scheduler-layout">
      <el-col :span="6" class="fixed-sidebar-col">
        <div class="left-sidebar">

          <div class="calendar-wrapper">
            <div class="calendar-filter-header">
              <el-select v-model="selectedRouteFilter" placeholder="Chọn tuyến (Limo)" size="small" style="width: 100%">
                <el-option label="Thái Thụy - Vĩnh Bảo (Limo)" value="route1" />
                <el-option label="Hải Phòng - Thái Thụy (Limo)" value="route2" />
              </el-select>
            </div>

            <div class="calendar-navigation-controls">
              <el-button :icon="ArrowLeft" size="small" @click="navigateCalendar('prev_month')" />
              <el-button size="small" @click="navigateCalendar('today')">Hôm nay</el-button>
              <el-button :icon="ArrowRight" size="small" @click="navigateCalendar('next_month')" />

              <el-select v-model="activeDayFilter" placeholder="ON" size="small" style="width: 80px; margin-left: 10px;">
                <el-option label="Tất cả" value="all" />
                <el-option label="T- ON" value="on" />
                <el-option label="T- OFF" value="off" />
              </el-select>
            </div>

            <el-date-picker
              v-model="selectedDate"
              type="date"
              placeholder="Chọn ngày"
              :clearable="false"
              size="small"
              style="width: 100%;"
            />
          </div>

          <div class="timeline-actions">
            <el-button type="primary" :icon="Plus" size="small" plain @click="isShowAddTrip = true" class="w-100">
              Tăng cường chuyến
            </el-button>
          </div>

          <div class="trip-timeline-scroll">
            <div class="timeline-item-group">
              <div
                v-for="(trip, index) in tripsOfTheDay"
                :key="index"
                class="trip-timeline-item"
                :class="{
                        'is-active': trip.id === activeTripId,
                        'is-overdue': trip.isOverdue
                    }"
                @click="selectTrip(trip.id)"
              >
                <div class="trip-info">
                  <div class="time-block">
                    <span class="label">{{ trip.isOverdue ? 'Khởi hành' : 'Bắt đầu' }}</span>
                    <span class="time">{{ trip.departureTime }}</span>
                  </div>
                  <div class="time-block">
                    <span class="label">Kết thúc</span>
                    <span class="time">{{ trip.returnTime }}</span>
                  </div>
                </div>

                <div class="trip-details">
                  <el-tag :type="trip.isOverdue ? 'danger' : 'info'" size="small" effect="dark">
                    {{ trip.route }}
                  </el-tag>
                  <small class="seats-info">{{ trip.bookedSeats }}/{{ trip.totalSeats }}</small>
                </div>
              </div>
            </div>

            <div class="overdue-section">
              <h4 class="text-sm font-semibold text-red-500 my-2 px-2">Đã quá giờ khởi hành</h4>
              <div
                v-for="(trip, index) in overdueTrips"
                :key="'overdue-'+index"
                class="trip-timeline-item is-overdue"
                :class="{'is-active': trip.id === activeTripId}"
                @click="selectTrip(trip.id)"
              >
                <div class="trip-info">
                  <div class="time-block">
                    <span class="label">Khởi hành</span>
                    <span class="time">{{ trip.departureTime }}</span>
                  </div>
                  <div class="time-block">
                    <span class="label">Kết thúc</span>
                    <span class="time">{{ trip.returnTime }}</span>
                  </div>
                </div>

                <div class="trip-details">
                  <el-tag type="danger" size="small" effect="dark">
                    {{ trip.route }}
                  </el-tag>
                  <small class="seats-info">{{ trip.bookedSeats }}/{{ trip.totalSeats }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="main-content-col">
        <div class="main-content-wrapper">
          <div class="main-content-header">
            <h2 class="route-header-title">
              {{ currentTripDetails.route }}
              <span class="text-xs text-gray-500">({{ currentTripDetails.timeRange }})</span>
              - {{ formatDate(selectedDate) }}
            </h2>
            <div class="header-actions">
              <el-button type="info" :icon="Printer" circle title="In Phiếu" size="small"/>
              <el-button type="success" :icon="Refresh" circle title="Cập nhật" size="small"/>
              <el-button type="danger" :icon="Close" circle title="Hủy chuyến" size="small"/>
            </div>
          </div>

          <el-tabs v-model="activeTab" type="border-card" class="seat-map-tabs">
            <el-tab-pane label="Sơ đồ ghế" name="seat_map">
              <div class="seat-map-grid-container">
                <div class="seat-row-wrapper">
                  <div v-for="n in 4" :key="n" class="seat-block-col">
                    <div v-if="n === 1 || n === 3" class="seat-block large-block">
                      {{ n === 1 ? 'A1' : 'A2' }}
                    </div>
                    <div v-if="n === 2 || n === 4" class="seat-block large-block empty-block">
                      {{ n === 2 ? 'C1' : 'C2' }}
                    </div>
                  </div>
                </div>

                <p class="text-center text-gray-500 py-10">
                  [KHU VỰC SƠ ĐỒ GHẾ ĐÃ ĐƯỢC PHÁC THẢO THEO CÁC BLOCK]
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Khách hàng (3)" name="customers">Nội dung Khách hàng</el-tab-pane>
            <el-tab-pane label="Đón/Trả (3/10)" name="pickup_dropoff">Nội dung Đón/Trả</el-tab-pane>
            <el-tab-pane label="Thông tin chuyến" name="trip_info">Nội dung Thông tin chuyến</el-tab-pane>
            <el-tab-pane label="Thống kê" name="stats">Nội dung Thống kê</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <trip-quick-add-modal
        v-model:show="isShowAddTrip"
        @submit="handleFormSubmit"
      />
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { Plus, Printer, Refresh, Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import TripQuickAddModal from "@/components/TripQuickAddModal.vue";

const selectedDate = ref(new Date());
const activeTripId = ref(1);
const activeTab = ref('seat_map');
const selectedRouteFilter = ref('route1');
const activeDayFilter = ref('all');
const isShowAddTrip = ref(false)
// Loại bỏ datePickerRef và onMounted logic gọi handleOpen()

// Dữ liệu giả lập cho Timeline
const allTrips = ref([
  { id: 1, route: 'Thái Thụy - Vĩnh Bảo (Limo)', departureTime: '16:03', returnTime: '17:00', bookedSeats: 3, totalSeats: 9, isOverdue: false },
  { id: 2, route: 'Hải Phòng - Thái Thụy (Limo)', departureTime: '17:00', returnTime: '18:00', bookedSeats: 0, totalSeats: 9, isOverdue: false },
  { id: 3, route: 'Nam Định - HN', departureTime: '18:50', returnTime: '19:44', bookedSeats: 2, totalSeats: 9, isOverdue: false },
  // Quá giờ
  { id: 4, route: 'TP.HCM - Đà Lạt', departureTime: '03:40', returnTime: '08:50', bookedSeats: 5, totalSeats: 9, isOverdue: true },
  { id: 5, route: 'Sài Gòn - Nha Trang', departureTime: '04:55', returnTime: '05:55', bookedSeats: 8, totalSeats: 9, isOverdue: true },
]);

const tripsOfTheDay = computed(() => allTrips.value.filter(t => !t.isOverdue));
const overdueTrips = computed(() => allTrips.value.filter(t => t.isOverdue));

const currentTripDetails = computed(() => {
  const trip = allTrips.value.find(t => t.id === activeTripId.value);
  if (trip) {
    return {
      route: trip.route,
      timeRange: `${trip.departureTime} - ${trip.returnTime}`
    };
  }
  return { route: 'Vui lòng chọn chuyến xe', timeRange: '' };
});

const selectTrip = (id) => {
  activeTripId.value = id;
};

const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');

// Logic điều hướng lịch: Cập nhật selectedDate model
const navigateCalendar = (action) => {
  if (!selectedDate.value) return;

  let newDate = dayjs(selectedDate.value);
  if (action === 'prev_month') {
    newDate = newDate.subtract(1, 'month');
  } else if (action === 'next_month') {
    newDate = newDate.add(1, 'month');
  } else if (action === 'today') {
    newDate = dayjs();
  }
  selectedDate.value = newDate.toDate();
  // Popover sẽ tự động hiển thị tháng này khi được mở
}
const handleFormSubmit = () => {
  isShowAddTrip.value = false
  console.log('submit');
}
</script>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as *;
@use '@/assets/abstracts/variables' as *;

.dispatch-scheduler-page {
  height: calc(100vh - 60px);
  padding: 0;
  margin-left: 0 !important;
  background-color: var(--background-color-main);
}

.scheduler-layout {
  height: 100%;
  margin: 0 -20px;
}

.fixed-sidebar-col {
  width: 300px;
  flex-shrink: 0;
  padding: 0;
  border-right: 1px solid var(--border-color);
}

.left-sidebar {
  height: 100%;
  background-color: var(--background-color-light);
  @include flex-column;
}

.calendar-wrapper {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.calendar-filter-header {
  margin-bottom: 10px;
}

.calendar-navigation-controls {
  @include flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .el-button {
    padding: 0 10px;
    height: 28px;
  }
}

/* FIX: Loại bỏ các CSS hack cho inline calendar */
:deep(.custom-calendar-popper) {
  /* Đảm bảo popover hiển thị bình thường, không bị ép inline */
  box-shadow: var(--el-box-shadow-light);
  border: var(--el-border-color-light);
  position: absolute !important;
  transform: translate3d(0, 0, 0) !important;
}

.timeline-actions {
  padding: 10px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
}

.trip-timeline-scroll {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 100%;
  padding: 0 1px;
}

.trip-timeline-item {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
  @include flex-between;
  align-items: flex-start;
  line-height: 1.2;

  &.is-active {
    background-color: var(--el-color-primary-light-9);
    border-left: 4px solid var(--color-primary);
    padding-left: 6px;
  }

  &:hover:not(.is-active) {
    background-color: #f5f5f5;
  }

  &.is-overdue {
    background-color: #ffeaea;
    color: $color-danger;
  }

  .trip-info {
    @include flex-column;
    gap: 5px;

    .time-block {
      line-height: 1.1;
      .label {
        font-size: 10px;
        color: #888;
        display: block;
      }
      .time {
        font-weight: 700;
        font-size: 14px;
      }
    }
  }

  .trip-details {
    text-align: right;
    .seats-info {
      display: block;
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    .el-tag {
      font-weight: 600;
      font-size: 11px;
      padding: 0 5px;
      height: 20px;
    }
  }
}

.main-content-col {
  flex-grow: 1;
  padding: 0;
}

.main-content-wrapper {
  height: 100%;
  background-color: var(--background-color-main);
  @include flex-column;
}

.main-content-header {
  @include flex-between;
  padding: 15px 20px;
  background-color: var(--background-color-light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  z-index: 10;

  .route-header-title {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
  }
}

.seat-map-tabs {
  flex-grow: 1;
  overflow: hidden;
  margin-top: 0;

  :deep(.el-tabs__header) {
    border-bottom: none !important;
    background-color: var(--background-color-main);
    padding: 0 20px;
    margin-top: 5px;

    .el-tabs__item {
      border: 1px solid var(--border-color);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      height: 35px;
      line-height: 35px;
      font-weight: 600;
      font-size: 13px;
    }

    .el-tabs__item.is-active {
      border-bottom-color: var(--background-color-light) !important;
      color: var(--color-primary) !important;
      background-color: var(--background-color-light);
    }
  }

  :deep(.el-tabs__content) {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
    background-color: var(--background-color-light);
    height: calc(100% - 40px);
  }
}

.seat-map-grid-container {
  height: 100%;
  padding: 10px;
}

.seat-row-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.seat-block-col {
  min-height: 120px;
}

.seat-block {
  height: 100%;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-weight: 700;

  &.large-block {
    background-color: #f3e5e5;
    border-color: #ffcccc;
    color: $color-danger;
  }

  &.empty-block {
    background-color: #e5f3e5;
    border-color: #ccffcc;
    color: $color-success;
  }
}
</style>
