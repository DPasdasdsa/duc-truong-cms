<!-- src/components/CustomTable.vue -->
<template>
  <div class="table-wrapper" :class="{ 'responsive': responsive }">
    <!-- Header cố định -->
    <div class="table-header">
      <table
        class="custom-table"
        :class="[
          variant,
          { 'bordered': bordered },
          { 'hoverTable': hover },
          { 'striped': striped }
        ]"
      >
        <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.text }}
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <!-- Body cuộn -->
    <div class="table-body">
      <perfect-scrollbar class="table-scroll">
        <table
          class="custom-table"
          :class="[
            variant,
            { 'bordered': bordered },
            { 'hoverTable': hover },
            { 'striped': striped }
          ]"
        >
          <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              <template v-if="header.key !== 'options'">
                {{ row[header.key] }}
              </template>
              <template v-else>
                <div class="options">
                  <slot name="options" :row="row" :index="rowIndex" />
                </div>
              </template>
            </td>
          </tr>
          </tbody>
        </table>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      default: 'default',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.syncColumnWidths();
  },
  methods: {
    syncColumnWidths() {
      const headerThs = this.$el.querySelectorAll('.table-header th');
      const bodyTds = this.$el.querySelectorAll('.table-body td');
      headerThs.forEach((th, index) => {
        const width = th.offsetWidth;
        bodyTds[index].style.width = `${width}px`;
      });
    },
  },
};
</script>
