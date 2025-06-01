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
      { title: 'Животные в приюте', icon: '🐾', route: '/organization/animals' },
      { title: 'Управление аккаунтом', icon: '👤', route: '/organization/setting' },
      { title: 'Заявки на усыновление', icon: '✉️', route: '/organization/orders' },
    ]
  } else if (userStore.user?.role == 'user') {

    menus.value = [
      // { title: 'Животные в приюте', icon: '🐾', route: '/user/animals' },
      { title: 'Управление аккаунтом', icon: '👤', route: '/user/setting' },
      { title: 'Заявки на усыновление', icon: '✉️', route: '/user/animals' },
    ]
  }
})
</script>


<template>
  <aside class="sidebar" :class="{ open: userStore.isSidebarOpen }">
      <div class="sidebar__content">
        <div class="sidebar__logo">
                  <img src="@/assets/images/logo.png" alt="Logo" />

          <!-- <div class="sidebar__logo-icon">🐾</div> -->
          <div class="sidebar__logo-text">
            <div>Добрые</div>
            <div>лапки</div>
          </div>
        </div>

        <nav class="sidebar__nav">
          <div v-for="menuItem in menus" class="sidebar__item">
            <!-- <span class="sidebar__icon">🐾</span> -->
            <router-link class="sidebar__item" :to="menuItem.route">
              <span class="sidebar__icon">{{ menuItem.icon }}</span>
              <span class="sidebar__text">{{ menuItem.title }}</span>
            </router-link>
            <!-- <a class="sidebar__text" href="/organization/animals">Животные в приюте</a> -->
            <!-- <span class="sidebar__text">Животные в приюте</span> -->
          </div>
          <!-- <div class="sidebar__item">
            <span class="sidebar__icon">👤</span>
            <span class="sidebar__text">Управление аккаунтом</span>
            <a class="sidebar__text" href="/organization/setting">Управление аккаунтом</a>
          </div>
          <div class="sidebar__item">
            <span class="sidebar__icon">✉️</span>
            <span class="sidebar__text">Заявки на усыновление</span>
            <a class="sidebar__text" href="/organization/orders">Заявки на усыновление</a>

          </div> -->
        </nav>
      </div>
    </aside>
</template>


<style lang="scss" scoped>
a { text-decoration: none;}
.sidebar {
  position: fixed;
  top: 0; // Было 56px — убираем
  left: 0;
  width: 260px;
  height: 100vh; // Было calc(100vh - 56px)
  background-color: #b3e6f3;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
  z-index: 99;

  &.open {
    transform: translateX(0);
  }

  &__content {
    padding: 24px 16px;
  }

  &__logo {
    display: flex;
    align-items: center;
    margin-bottom: 48px;
  }

  &__logo-icon {
    font-size: 28px;
    color: #ff7f50;
    margin-right: 8px;
  }

  &__logo-text {
    font-size: 20px;
    font-weight: 600;
    color: #ff7f50;
    line-height: 1.1;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__icon {
    font-size: 22px;
    margin-right: 10px;
    color: #000;
  }

  &__text {
    font-size: 14px;
    color: #000;
  }
}
</style>
