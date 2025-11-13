<template>
  <div class="custom-loading-table">
    <div class="custom-loading-spinner">
      <div class="transport-loader">
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">

          <line x1="0" y1="85" x2="200" y2="85" stroke="#90A4AE" stroke-width="3" stroke-linecap="round">
            <animate attributeName="x1" values="0; -100" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="x2" values="100; 0" dur="1s" repeatCount="indefinite"/>
          </line>

          <g transform="translate(10, 0)">
            <animate attributeName="transform" type="translate" values="10 0; 10 -2; 10 0" dur="1.8s" repeatCount="indefinite" additive="sum"/>

            <rect x="0" y="30" width="55" height="30" rx="4" fill="#1877F2"/>

            <rect x="55" y="34" width="16" height="26" rx="3" fill="#0D47A1"/>

            <path d="M57 36 L68 36 L68 55 L57 55 Z" fill="#BBDEFB"/>

            <circle cx="70" cy="58" r="2.5" fill="#FFEB3B"/>

            <circle cx="15" cy="70" r="8" fill="#333333">
              <animateTransform attributeName="transform" type="rotate" from="0 15 70" to="360 15 70" dur="0.6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="15" cy="70" r="4" fill="#A9A9A9">
              <animateTransform attributeName="transform" type="rotate" from="0 15 70" to="360 15 70" dur="0.6s" repeatCount="indefinite"/>
            </circle>

            <circle cx="50" cy="70" r="8" fill="#333333">
              <animateTransform attributeName="transform" type="rotate" from="0 50 70" to="360 50 70" dur="0.6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="70" r="4" fill="#A9A9A9">
              <animateTransform attributeName="transform" type="rotate" from="0 50 70" to="360 50 70" dur="0.6s" repeatCount="indefinite"/>
            </circle>

          </g>
        </svg>
      </div>
    </div>
    <div class="animated-text">
      <span
        v-for="(char, index) in loadingTextArray"
        :key="index"
        :style="{'animation-delay': index * 0.08 + 's'}"
      >{{ char === ' ' ? '&nbsp;' : char }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'LoadingPage'
})

const loadingText = 'Đang tải dữ liệu...';
const loadingTextArray = computed(() => loadingText.split(''));
</script>

<style scoped>
/* Base Styles cho lớp phủ */
.custom-loading-table {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Sửa màu nền để không bị ảnh hưởng bởi Dark Mode mặc định của El-table */
  background: var(--background-color-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  border-radius: 0.85rem;
}

/* ===== Animation cho Text (CSS) ===== */
.animated-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  letter-spacing: 1px;
}

.animated-text span {
  display: inline-block;
  animation: bounce 1.2s infinite ease-in-out;
  transform-origin: bottom;
  white-space: pre;
}

/* Keyframe for Jumping Effect */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-5px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-3px);
  }
  80% {
    transform: translateY(0);
  }
}
</style>
