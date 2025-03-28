<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" :class="positionClass" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">
          <svg width="30" height="30"
               x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g>
                <g>
                  <path
                    style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
                    d="
                    M457.588,378.778C479.42,343.008,492,300.973,492,256c0-130.339-105.661-236-236-236S20,125.661,20,256s105.661,236,236,236
                    c49.17,0,94.827-15.037,132.625-40.763"/>
                </g>
                <g>
                    <line
                      style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
                      x1="324.243" y1="187.757" x2="187.757" y2="324.243"/>

                  <line
                    style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
                    x1="324.243" y1="324.243" x2="187.757" y2="187.757"/>
                </g>
              </g>
              </svg>
        </button>
        <slot>Default Modal Content</slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalCommon',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    position: {
      type: String,
      default: 'center',
      validator: (value) => ['top', 'center'].includes(value),
    },
  },
  watch:{
    show(){
      document.body.classList.toggle('modal-open');
    }
  },
  computed: {
    positionClass() {
      return `modal-${this.position}`;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/_modalCommon.scss";
</style>
