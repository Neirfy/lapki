<script setup lang="ts">
import Header from '@/components/navbars/Header.vue'
</script>
<template>
  <div class="">
    <Header />
    <main class="" >

    <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  // overflow: hidden;

  position: relative;
}
.content {
  // margin-left: 0;

  display: flex;           /* добавляем */
  justify-content: center; /* по горизонтали */
  flex: 1;
  // align-items: center;
  margin-top: 90px;
  padding: 24px;
  justify-content: center;
}

</style>
