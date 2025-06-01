<script setup lang="ts">
import HeaderBar from '@/components/navbars/HeaderBar.vue'
import SideBar from '@/components/navbars/SideBar.vue'
import { useUserStore } from '@/stores/users/user'
// import { ref } from 'vue'
const userStore = useUserStore()
</script>
<template>
  <div class="layout">

    <HeaderBar>
    </HeaderBar>
    <SideBar />
    <main class="content" :class="{ open: userStore.isSidebarOpen }">
      <RouterView/>
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  height: 100vh;
  // overflow: hidden;
  position: relative;
}
.content {

  flex: 1;

  margin-top: 130px;
  padding: 24px;
  height: calc(100vh - 130px);
  transition: margin-left 0.3s ease 0.1s, transform 0.3s ease 0.1s;
    transition: margin-top 0.3s ease 0.1s, transform 0.3s ease 0.1s;

  &.open {
    margin-top: 100px;
   margin-left: 250px;
    // transform: translateX(0);
  }

}

</style>
