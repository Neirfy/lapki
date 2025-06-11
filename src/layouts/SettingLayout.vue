<script setup lang="ts">
import HeaderSetting from '@/components/navbars/HeaderSetting.vue'
import SideBar from '@/components/navbars/SideBar.vue'
import { useUserStore } from '@/stores/users/user'
// import { ref } from 'vue'
const userStore = useUserStore()
</script>
<template>
  <div class="dashboard-wrapper">

    <SideBar />
    <main class="main-area" >
      <HeaderSetting />
      <RouterView/>
    </main>
  </div>
</template>

