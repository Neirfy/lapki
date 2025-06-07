<template>
    <header class="topbar" :class="{ hidden: userStore.isSidebarOpen }">
      <template v-if="!userStore.isSidebarOpen">
        <img
          class="logo"
          src="@/assets/images/logo.png" alt="Logo" />
        <span class="title">Добрые лапки</span>
      </template>


      <div class="burger-group">
        <template v-if="userStore.isSidebarOpen">
          <span class="title-page">{{ route.meta.title }}</span>
        </template>
        <button class="burger">
          <img
            :class="userStore.isSidebarOpen ? 'show' : ''"
            style="padding: 10px;"
            src="@/assets/images/show.png"
             @click="toggleSidebar"
          />
        </button>
        <button class="burger" @click="toggleLogout">
          <img
            class=""
            style="padding: 8px;"
            src="@/assets/images/logout.png"
             @click="toggleSetting"

          />

        </button>
        <button class="burger" @click="toggleSetting">
        <img
            class=""
            src="@/assets/images/no-photo.png"
             @click="toggleSetting"
          />
        </button>
      </div>
    </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const toggleSidebar = () => {
  userStore.isSidebarOpen = !userStore.isSidebarOpen
}

const toggleSetting = () => {
  if (userStore.user?.role === 'organization') {
    void router.push({name: 'orgSettings'})
  } else {
    void router.push({name: 'userSettings'})
  }
}

const toggleLogout = () => {
  localStorage.removeItem('token')
  void router.push('login')
}
</script>

<style scoped lang="scss">


.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 130px;
  background-color: #B2E2F2;
  border-radius: 0 0 32px 32px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 100;
  transition: all 0.3s ease;
      transition: transform 0.3s ease;


  img{
    width: 34px;
    height: 34px;
  }
  img.show{
    transform: rotate(180deg);

  }


  &.hidden {
    // background-color: transparent;
    width: calc(100% - 266px);
    background-color: white;
    // border-radius: 0;
    box-shadow: none;
    height: 66px;
    justify-content: flex-start;
    transform: translateX(266px);

    img.logo,
    .title {
      display: none;
    }
  }

  .title-page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    font-weight: bold;
    color: black;
  }

  .burger-group {
    margin-left: auto; // чтобы оттолкнуть к правому краю
    display: flex;
    gap: 8px; // расстояние между кнопками
  }
//   .title-page {
//     gap: 10px;
//   // right: 0;
//   // margin-left: 20px;
//   font-size: 32px;
//   font-weight: bold;
//   color: black;
// }

}

.burger {
  margin-right: auto;
  background: none;
  border: none;
  color: black;
  font-size: 28px;
  cursor: pointer;
  z-index: 999;
  right: 16px;
  transition: all 0.3s ease transform 0.3s ease 0.1s;// добавили анимацию

  .hidden & {
    margin-left: auto;
    margin-right: 12px;
  }
}
// .burger {
//   position: absolute;
//   right: 16px;
//   top: 16px;
//   z-index: 999;
// }
.title {
  font-size: 18px;
  margin-left: 12px;
  font-weight: 600;
}


</style>
