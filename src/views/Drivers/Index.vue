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
            <div class="col-6 form-group mb-0">
              <label class="label">Tìm kiếm theo từ khóa</label>
              <el-input
                size="large"
                v-model="keyword"
                placeholder="Nhập từ khóa tìm kiếm ..."
                :disabled="loading"
                @keyup.enter="handleSearch()"
              />
            </div>
            <div class="col-6 form-group mb-0">
              <label class="label">Tìm kiếm theo chức vụ</label>
              <el-select v-model="roleSearch" filterable @change="handleSearch()"
                         placeholder="Tìm kiếm theo chức vụ" size="large">
                <el-option
                  v-for="item in optionRoles"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
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
          <el-table-column fixed label="STT" type="index" width="80" align="center"/>
          <el-table-column prop="name" label="Tên lái xe" />
          <el-table-column prop="phone" label="Số điện thoại" width="140" />
          <el-table-column prop="role" label="Chức vụ" width="160">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.role)">
                {{ row.role === 'driver' ? 'Tài xế' : 'Phụ xe' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="Ngày tạo" width="200" />
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
          :current-page="currentPage"
          @current-change="setPaginate"
          layout="prev, pager, next"
          :total="paginate.total"
        />
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
          <el-button type="primary" :loading="formLoading" @click="createOrUpdate">
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
import router from "@/router";
import {useRoute} from "vue-router";
const employeeStore = useEmployeeStore();
const route = useRoute()


onMounted(() => {
  keyword.value = route.query.keyword ?? null
  currentPage.value = route.query.page ?? 1
  loadData();
})

const loading = ref(true)
// 🔹 Dữ liệu mẫu
const drivers = ref([])
const keyword = ref(null)
const roleSearch = ref(null)
const showModal = ref(false)
const currentDriverId = ref(null)
const formLoading = ref(false)
const isEditMode = ref(false)
const driverFormRef = ref(null)
const currentPage = ref(1)
const paginate = ref(null)
const optionRoles = [
  {id: null, name: "Tất cả"},
  {id: "driver", name: "Tài xế"},
  {id: "assistant", name: "Phụ xe"},
]
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
    keyword: keyword.value,
    role: roleSearch.value,
    page: currentPage.value,
  }).then((response) => {
    if (response && response.data) {
      const data =  response.data
      drivers.value =data.data
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
const getStatusType = (role) => {
  switch (role) {
    case 'driver':
      return 'success'
    default:
      return 'info'
  }
}
const resetForm = () => {
  if (driverFormRef.value) {
    driverFormRef.value.resetFields()
  }
  formData.name = formData.phone = ''
  formData.role = 'driver'
  formLoading.value = false
  showModal.value = false
}
const openModal = (mode, row = null) => {
  if (mode === 'create') {
    formData.name = formData.phone = ''
    formData.role = 'driver'
    isEditMode.value = false
    currentDriverId.value = null
  } else if (mode === 'edit' && row) {
    isEditMode.value = true
    currentDriverId.value = row.id
    formData.role = row.role
    formData.name = row.name
    formData.phone = row.phone
  }
  showModal.value = true
}
const setErrorField = (errors) => {
  if (!driverFormRef.value) return
  driverFormRef.value.clearValidate()
  driverFormRef.value.fields.forEach(field => {
    if (errors[field.prop]) {
      field.validateMessage = errors[field.prop][0]
      field.validateState = 'error'
    }
  })
}
const createOrUpdate = async () => {
  if(!driverFormRef.value) return
  await driverFormRef.value.validate((valid, fields) => {
    if (valid) {
      formLoading.value = true
      const payload = {
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        id:currentDriverId.value,
      }
      const response = !currentDriverId.value ? employeeStore.actionCreateEmployee(payload)
      :employeeStore.actionUpdateEmployee(payload)
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
      page: 1,
      keyword: keyword.value,
      role: roleSearch.value
    }
  })
}
const confirmDelete = async (id) => {
  await employeeStore.actionDeleteEmployee(id).then(async (response) => {
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
