<template>
  <div class="dropdown" ref="dropdown">
    <button class="dropdown-toggle" :class="isOpen ? 'open-dropdown' : ''" @click="toggleDropdown" ref="toggleBtn">
      <slot name="toggle">{{ toggleText || 'Dropdown' }}</slot>
      <i v-if="!$slots.toggle" class="fas fa-caret-down" style="margin-left: 0.5rem;"></i>
    </button>
    <ul class="dropdown-menu" v-show="isOpen" ref="menu" :style="menuStyle" :class="{ 'show': isOpen }">
      <slot :select-item="selectItem" />
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Dropdown',
  props: {
    toggleText: {
      type: String,
      default: 'Dropdown',
    },
  },
  data() {
    return {
      isOpen: false,
      menuStyle: {}
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.adjustMenuPosition();
        });
      }
    },
    adjustMenuPosition() {
      const toggle = this.$refs.toggleBtn;
      const menu = this.$refs.menu;
      if (!toggle || !menu) return;

      const toggleRect = toggle.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      this.menuStyle = { position: 'absolute' };

      const spaceBelow = viewportHeight - toggleRect.bottom;
      const spaceAbove = toggleRect.top;
      if (spaceBelow < menuRect.height && spaceAbove > menuRect.height) {
        this.menuStyle.bottom = `${toggleRect.height}px`;
        this.menuStyle.top = 'auto';
      } else {
        this.menuStyle.top = `${toggleRect.height}px`;
        this.menuStyle.bottom = 'auto';
      }

      const spaceRight = viewportWidth - toggleRect.right;
      const spaceLeft = toggleRect.left;
      if (spaceRight < menuRect.width && spaceLeft > menuRect.width) {
        this.menuStyle.right = '0';
        this.menuStyle.left = 'auto';
      } else {
        this.menuStyle.left = '0';
        this.menuStyle.right = 'auto';
      }
    },
    closeDropdown(event) {
      if (
        this.$refs.toggleBtn &&
        !this.$refs.toggleBtn.contains(event.target) &&
        this.$refs.menu &&
        !this.$refs.menu.contains(event.target)
      ) {
        this.isOpen = false;
      }
    },
    selectItem(item) {
      this.$emit('select', item);
      this.isOpen = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
    window.addEventListener('resize', this.adjustMenuPosition);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
    window.removeEventListener('resize', this.adjustMenuPosition);
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.adjustMenuPosition();
      }
    },
  },
};
</script>
