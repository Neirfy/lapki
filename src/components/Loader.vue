<script setup lang="ts">
defineModel()
</script>
<template>
  <div class="fullscreen-loader">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.fullscreen-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7); /* светлый прозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 5px solid rgba(0,0,0,0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
