<template>
  <div>
    <h2>Base Vue 3 created by IT team.</h2>
    <div>Vue router & middleware: {{ $t('messages.title_popup_success') }}</div>
    <div>Vuex & call api: {{ $t('messages.title_popup_success') }}</div>
    <div>Helper & mixins: {{ $t('messages.title_popup_success') }}</div>
    <div>Multi language: {{ $t('messages.title_popup_success') }}</div>
    <div>
      <Form @submit="testValidate()">
        <label for="name">Test validate</label>
        <Field name="duong" type="text" rules="required|decimal"/>
        <ErrorMessage name="duong"/>
      </Form>
    </div>
  </div>
  <div>
    <h3>Button Custom</h3>
    <br>
    <div class="list-group-item">
      <button class="btn btn-primary" @click="openModal1('top')">Mở Modal (Top)</button>
      <button class="btn btn-info" @click="openModal2('center')">Mở Modal (Center)</button>
    </div>
    <h3>Grid Layout</h3>
    <br>
    <div class="container-fluid">
      <div class="row">
        <div class="col-1 themed-grid-col">.col-1</div>
        <div class="col-2 themed-grid-col">.col-2</div>
        <div class="col-3 themed-grid-col">.col-3</div>
        <div class="col-4 themed-grid-col">.col-4</div>
        <div class="col-5 themed-grid-col">.col-5</div>
        <div class="col-6 themed-grid-col">.col-6</div>
        <div class="col-7 themed-grid-col">.col-7</div>
        <div class="col-8 themed-grid-col">.col-8</div>
        <div class="col-9 themed-grid-col">.col-9</div>
        <div class="col-10 themed-grid-col">.col-10</div>
        <div class="col-11 themed-grid-col">.col-11</div>
        <div class="col-12 themed-grid-col">.col-12</div>
      </div>
    </div>
    <br>
    <h3>Paginate</h3>
    <nav class="pagination-wrapper">
      <ul class="pagination">
        <li class="page-item disabled">
          <a href="#" class="page-link">
            Trang trước
          </a>
        </li>
        <li class="page-item active">
          <a href="#" class="page-link">1</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">2</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">3</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">4</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">5</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            Trang sau
          </a>
        </li>
      </ul>
    </nav>
    <br>
    <h3>Collapse (USE ELEMENT UI)</h3>
    <br>
  </div>
  <ModalCommon :show="isShowModal" :position="modalPosition" @close="closeModal">
    <div v-if="modal_1">
      <h2 class="modal-header">Modal 1 - position Top</h2>
    </div>
    <div v-else>
      <h2 class="modal-header">Modal 2 - position Center</h2>
    </div>
  </ModalCommon>
</template>
<script>
import {ErrorMessage, Field} from "vee-validate";
import ModalCommon from "@/components/ui/ModalCommon.vue";

export default {
  name: 'BaseTemplate',
  components: {ModalCommon, ErrorMessage, Field},
  data() {
    return {
      posts: [],
      isShowModal: false,
      modalPosition: 'center',
      modal_1: true,
      modal_2: false,
    }
  },
  async created() {
  },
  methods: {
    testValidate() {
      console.log(4343)
    },
    openModal1(position) {
      this.modalPosition = position;
      this.isShowModal = true;
      this.modal_1 = true;
    },
    openModal2(position) {
      this.modalPosition = position;
      this.isShowModal = true;
      this.modal_2 = true;
    },
    closeModal() {
      this.isShowModal = false;
      this.modal_1 = false;
      this.modal_2 = false;
    },
  }
};
</script>
