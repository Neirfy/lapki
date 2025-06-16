<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-name">
        <img src="@/assets/images/logo.png" alt="Логотип" class="logo-img">
        <div class="logo-name-text">
          <span>Добрые</span>
          <span>лапки</span>
        </div>
      </div>
      <div class="user-controls">
        <i
          v-if="route.path === '/main'"
          class='bx bx-cog' @click="toggleSetting"
        ></i>
        <i v-else
          @click="toggleMain"
        >←</i>

        <i class='bx bx-exit' @click="toggleLogout"></i>
        <div class="avatar-preview">
          <img
            v-if="userStore.user?.photo"
            :src="userStore.user?.photo" alt="Аватар">
          <img
            v-else
            src="@/assets/images/avatar_default.png" alt="Аватар">
        </div>
      </div>
    </div>
  </header>
  <Modal
    :show="showConfirmModal"
    message="Вы уверены, что хотите выйти?"
    @confirm="confirmLogout"
    @cancel="cancelLogout"/>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import Modal from '@/components/popup/Modal.vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const showConfirmModal = ref(false)

// const toggleSidebar = () => {
//   userStore.isSidebarOpen = !userStore.isSidebarOpen
// }

const toggleSetting = () => {
  if (userStore.user?.role === 'organization') {
    void router.push({name: 'orgSettings'})
  } else {
    void router.push({name: 'userSettings'})
  }
}

const toggleMain = () => {
  void router.push({name: 'main'})

}

const toggleLogout = () => {
  showConfirmModal.value = true

}
const confirmLogout = () => {

  localStorage.removeItem('token')
  void router.push('login')
}

const cancelLogout = () => {
  showConfirmModal.value = false
}
</script>
