<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion__item"
      :class="{ 'accordion__item--active': item.isOpen }"
    >
      <div class="accordion__header" @click="toggleItem(index)">
        <span>{{ item.title }}</span>
        <span class="accordion__icon"></span>
      </div>

      <div
        class="accordion__content"
        :style="{
          maxHeight: item.isOpen ? `${item.contentHeight}px` : '0',
        }"
      >
        <slot :name="`content-${index}`" :item="item" :index="index">
          <p>{{ index }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
      validator: (items) => items.every(item => typeof item.title === 'string' && typeof item.isOpen === 'boolean'),
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleItem(index) {
      if (this.isGroup) {
        this.items.forEach((item, i) => {
          if (i !== index) {
            item.isOpen = false;
          }
        });
      }

      this.items[index].isOpen = !this.items[index].isOpen;

      if (this.items[index].isOpen && !this.items[index].contentHeight) {
        this.$nextTick(() => {
          const contentElement = this.$el.querySelectorAll('.accordion__content')[index];
          this.items[index].contentHeight = contentElement.scrollHeight;
        });
      }
    },
  },
  mounted() {
    this.items.forEach((item, index) => {
      if (item.isOpen) {
        const contentElement = this.$el.querySelectorAll('.accordion__content')[index];
        item.contentHeight = contentElement.scrollHeight;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/_collapse.scss";
</style>
