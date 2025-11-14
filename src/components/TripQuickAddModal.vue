<template>
  <el-dialog
    v-model="visible"
    title="Tăng cường chuyến"
    width="650px"
    :before-close="handleClose"
    custom-class="quick-add-trip-dialog"
  >
    <el-form :model="formData" ref="formRef" label-position="top">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tuyến" prop="route">
            <el-select v-model="formData.route" placeholder="Thái Thụy - Mỹ Đình (Limo)" size="large" style="width: 100%">
              <el-option label="Tuyến A" value="A" />
              <el-option label="Tuyến B" value="B" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Ngày" prop="date">
            <el-input v-model="formData.date" size="large" readonly placeholder="13/11/2025" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Giờ xuất bến" prop="time">
            <el-input v-model="formData.time" size="large" placeholder="GG : PP" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mb-4">
        <el-col :span="12">
          <el-checkbox v-model="formData.isTicketSale" label="Chuyến bán vé" size="large" />
        </el-col>
        <el-col :span="12">
          <el-checkbox v-model="formData.isCargo" label="Chuyến chở hàng" size="large" />
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Xe" prop="vehicle">
            <el-select v-model="formData.vehicle" placeholder="Chọn biển số xe" size="large" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Sơ đồ ghế" prop="seatMap">
            <el-select v-model="formData.seatMap" placeholder="Limousine 15 chỗ (Phụ)" size="large" style="width: 100%">
              <el-option label="15 chỗ thường" value="15t" />
              <el-option label="15 chỗ phụ" value="15p" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tài xế" prop="driver">
            <el-select v-model="formData.driver" placeholder="Chọn tài xế" size="large" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Phụ xe" prop="assistant">
            <el-select v-model="formData.assistant" placeholder="Chọn phụ xe" size="large" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Tải" prop="load">
            <el-input v-model="formData.load" placeholder="Nhập thông tin tải" size="large" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ghi chú" prop="note">
            <el-input v-model="formData.note" placeholder="Nhập ghi chú" size="large" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Nhãn hiệu" prop="brand">
            <el-select v-model="formData.brand" placeholder="Chọn nhãn chuyến" size="large" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">Cập nhật</el-button>
        <el-button @click="handleClose">Đóng</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {computed, ref} from 'vue';
import { ElMessage } from 'element-plus';

// Props để kiểm soát hiển thị Modal từ component cha
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:show', 'submit']);

const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
});

const formRef = ref(null);
const formData = ref({
  route: '',
  date: '13/11/2025',
  time: '',
  isTicketSale: true,
  isCargo: false,
  vehicle: '',
  seatMap: '15p',
  driver: '',
  assistant: '',
  load: '',
  note: '',
  brand: '',
});

const handleClose = () => {
  visible.value = false;
  formRef.value.resetFields();
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('Dữ liệu form:', formData.value);
      emit('submit', formData.value);
      ElMessage.success('Tăng cường chuyến thành công!');
      handleClose();
    } else {
      ElMessage.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return false;
    }
  });
};
</script>

<style scoped>
/* Đảm bảo các el-form-item có khoảng cách phù hợp */
.el-form-item {
  margin-bottom: 20px;
}

/* Fix margin cho checkbox row */
.mb-4 {
  margin-bottom: 15px;
}

/* Fix chiều cao input */
.el-input, .el-select {
  height: 40px; /* Đảm bảo chiều cao input size="large" được đồng bộ */
}
</style>
