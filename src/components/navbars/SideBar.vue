<script setup lang="ts">
import { useUserStore } from '@/stores/users/user';
import { onMounted, ref } from 'vue';
const userStore = useUserStore()

type MenuItem = {
  title: string
  icon: string
  route: string

}
const menus = ref<MenuItem[]>([])

onMounted(() => {
  menus.value.splice(0)
  if (userStore.user?.role == 'organization') {

    menus.value = [
      { title: 'Животные в приюте', icon: 'bx bx-home-heart', route: '/organization/animals' },
      { title: 'Управление аккаунтом', icon: 'bx bx-user-circle', route: '/organization/setting' },
      { title: 'Заявки на усыновление', icon: 'bx bx-task', route: '/organization/orders' },
    ]
  } else if (userStore.user?.role == 'user') {

    menus.value = [
      { title: 'Управление аккаунтом', icon: 'bx bx-user-circle', route: '/user/setting' },
      { title: 'Мои заявки', icon: 'bx bx-task', route: '/user/requests' },
    ]
  }
})
</script>


<template>
  <div class="left-sidebar">
    <div class="logo-block">
      <img src="@/assets/images/logo.png" alt="Logo" />
      <div class="logo-text">
        <span class="logo-highlight">Добрые</span>
        <span class="logo-highlight">лапки</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <router-link
        active-class="nav-active"
        class="nav-btn left-sidebar-btn"
        :to="menuItem.route"
        v-for="menuItem in menus"
      >
        <i :class="menuItem.icon"></i>{{ menuItem.title }}
      </router-link>
    </nav>
  </div>
</template>
