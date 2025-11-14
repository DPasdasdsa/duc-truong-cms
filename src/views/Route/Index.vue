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
              <label class="label">Tìm kiếm theo tuyến đường</label>
              <el-input
                size="large"
                v-model="keyword"
                :disabled="loading"
                placeholder="Nhập từ khóa tìm kiếm ..."
                @keyup.enter="handleSearch()"
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
        <h3>DANH SÁCH TUYẾN ĐƯỜNG</h3>
      </div>
      <div class="box-layout_header-options">
        <el-button  @click="openModal('create')" :loading="loading" type="primary" :icon="Plus">Thêm mới</el-button>
      </div>
    </div>
    <div class="box-layout_body">
      <div class="mt-3">
        <el-table
          v-loading="loading"
          :data="routesData"
          :element-loading-spinner="ICON_LOADING"
          element-loading-svg-view-box="-10, -10, 50, 50"
          border
          stripe
          class="w-full mt-3 rounded-lg overflow-hidden"
        >
          <el-table-column label="STT"  type="index" width="60" align="center" />
          <el-table-column prop="name" label="Tên Tuyến" min-width="220" />
          <el-table-column prop="code" label="Mã Tuyến" width="120" align="center" />
          <el-table-column label="Điểm đi" prop="departure_location" width="180" />
          <el-table-column label="Điểm đến" prop="arrival_location" width="180" />
          <el-table-column label="Khoảng cách (km)" prop="distance_km" width="150" align="center">
            <template #default="{ row }">
              {{ row.distance_km }} km
            </template>
          </el-table-column>
          <el-table-column label="Ngày tạo" prop="created_at" width="200">
            <template #default="{ row }">
              {{ row.created_at }}
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" align="right" width="150">
            <template #default="scope">
              <el-button size="small" @click="openModal('edit', scope.row)">
                Sửa
              </el-button>
              <el-popconfirm
                title="Bạn có chắc chắn muốn xóa mục này không?"
                @confirm="confirmDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button size="small" type="danger">Xóa</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="el-pagination__rightwrapper"
          v-if="paginate && paginate.total_page > 1"
          :page-size="paginate.perPage"
          :current-page="parseInt(currentPage)"
          @current-change="setPaginate"
          layout="prev, pager, next"
          :total="paginate.total"
        />
      </div>
    </div>
    <el-dialog
      v-model="showModal"
      :title="isEditMode ? 'CHỈNH SỬA THÔNG TIN TUYẾN' : 'THÊM MỚI THÔNG TIN TUYẾN'"
      width="500"
      class="rounded-lg"
    >
      <el-form
        ref="vehicleFormRef"
        :model="formData"
        :rules="formRules"
        label-position="top"
      >
        <el-form-item label="Tên Tuyến" prop="name" class="form-group positionR">
          <el-input v-model="formData.name" placeholder="Nhập thông tin biển số xe" />
        </el-form-item>
        <el-form-item label="Điểm đi" prop="departure_location" class="form-group positionR">
          <el-input v-model="formData.departure_location" placeholder="Nhập thông tin điểm đi" />
        </el-form-item>
        <el-form-item label="Điểm đến" prop="arrival_location" class="form-group positionR">
          <el-input v-model="formData.arrival_location" placeholder="Nhập thông tin điểm đến" />
        </el-form-item>
        <el-form-item label="Khoảng cách (km)" prop="distance_km" class="form-group positionR">
          <el-input v-model="formData.distance_km" placeholder="Nhập thông tin khoảng cách" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showModal = false">Hủy</el-button>
          <el-button type="primary" :loading="formLoading" @click="createOrUpdate">
            {{ isEditMode ? 'Chỉnh sửa' : 'Thêm mới'}}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>
<script setup>
import {Filter, Plus} from "@element-plus/icons-vue"
import {onMounted, reactive, ref} from "vue"
import {ICON_LOADING} from "@/constants/common"
import {useRouteStore} from "@/store/route";
import {ElMessage} from "element-plus";
import router from "@/router";

onMounted(() => {
  loadData()
})

const routeStore = useRouteStore();
const loading = ref(true)
const keyword = ref(null)
const routesData = ref([])
const currentPage =ref(1)
const paginate = ref(null)
const showModal = ref(false)
const formLoading = ref(false)
const vehicleFormRef = ref(null)
const vehicleId = ref(0)
const formData = reactive({
  name: '',
  departure_location: '',
  arrival_location: '',
  distance_km: '',
})
const formRules = reactive({
  name: [
    { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
    { min: 3, max: 50, message: 'Tên tuyến phải từ 3 đến 50 ký tự', trigger: 'blur' }
  ],
  departure_location: [
    { required: true, message: 'Vui lòng nhập điểm đi', trigger: 'blur' },
    { min: 3, max: 50, message: 'Điểm đi phải từ 3 đến 50 ký tự', trigger: 'blur' }
  ],
  arrival_location: [
    { required: true, message: 'Vui lòng nhập điểm đến', trigger: 'blur' },
    { min: 3, max: 50, message: 'Điểm đến phải từ 3 đến 50 ký tự', trigger: 'blur' }
  ],
  distance_km: [
    { required: true, message: 'Vui lòng nhập khoảng cách', trigger: 'blur' },
    { min: 3, max: 50, message: 'Khoảng cách phải từ 3 đến 50 ký tự', trigger: 'blur' }
  ],
})
const isEditMode = ref(false)


const loadData = async () => {
  loading.value = true
  const payload = {
    keyword: keyword.value,
    page: currentPage.value,
  }

  await routeStore.actionGetRoute(payload).then((response) => {
    if (response && response.data) {
      const data =  response.data
      routesData.value = data.data
      paginate.value = {
        perPage: data.meta.perPage,
        total: data.meta.total,
        current_page: data.meta.current_page,
        total_page:data.meta.total_page,
      }
    }
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error',
      placement:'top-right'
    })
  })
  loading.value = false
}
const openModal = (mode, row = null) => {
  if (mode === 'create') {
    formData.name = formData.departure_location = formData.arrival_location = formData.distance_km = ''
    formData.status = 0
    isEditMode.value = false
  } else if (mode === 'edit' && row) {
    isEditMode.value = true
    vehicleId.value = row.id
    formData.name = row.name
    formData.departure_location = row.departure_location
    formData.arrival_location = row.arrival_location
    formData.distance_km = row.distance_km
  }
  showModal.value = true
}
const confirmDelete = async (id) => {
  await routeStore.actionDeleteVehicle(id).then(async (response) => {
    ElMessage({
      message: response.message,
      type: 'success',
      placement:'top-right'
    })
    await loadData();
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error',
      placement:'top-right'
    })
  })
}
const resetForm = () => {
  if (vehicleFormRef.value) {
    vehicleFormRef.value.resetFields()
    vehicleFormRef.value.clearValidate()
  }
  formData.name = formData.departure_location = formData.arrival_location = formData.distance_km = ''
  formLoading.value = false
  vehicleId.value = 0
  showModal.value = false
}
const setErrorField = (errors) => {
  if (!vehicleFormRef.value) return
  vehicleFormRef.value.clearValidate()
  vehicleFormRef.value.fields.forEach(field => {
    if (errors[field.prop]) {
      field.validateMessage = errors[field.prop][0]
      field.validateState = 'error'
    }
  })
}
const createOrUpdate = async () => {
  if(!vehicleFormRef.value) return
  await vehicleFormRef.value.validate((valid) => {
    if(valid) {
      formLoading.value = true
      const payload = {
        name: formData.name,
        departure_location: formData.departure_location,
        arrival_location: formData.arrival_location,
        distance_km: formData.distance_km,
        id:vehicleId.value,
      }
      const response = !vehicleId.value ? routeStore.actionCreateRoute(payload)
        :routeStore.actionUpdateRoute(payload)

      response.then(async (response) => {
        ElMessage({
          message: response.message,
          type: 'success',
          placement:'top-right'
        })
        // update list data
        await loadData();
        resetForm()
      }).catch((err) => {
        formLoading.value = false
        if(err.errors) {
          setErrorField(err.errors)
        }
        ElMessage({
          message: err.message,
          type: 'error',
          placement:'top-right'
        })
      })
    }
  })

}
const handleSearch = async () => {
  currentPage.value = 1
  await loadData()
  await router.push({
    query: {
      page: currentPage.value,
      keyword: keyword.value,
    }
  })
}
const setPaginate = (page) => {
  currentPage.value = page
  router.push({
    query: {
      page: page,
    }
  })
  loadData()
}

</script>
