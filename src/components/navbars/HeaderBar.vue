<template>
    <header class="topbar" :class="{ hidden: userStore.isSidebarOpen }">
      <template v-if="!userStore.isSidebarOpen">
        <img src="@/assets/images/logo.png" alt="Logo" />
        <span class="title">Добрые лапки</span>
      </template>


      <div class="burger-group">
        <template v-if="userStore.isSidebarOpen">
          <span class="title-page">{{ route.meta.title }}</span>
        </template>
        <button class="burger" @click="toggleSidebar">{{ userStore.isSidebarOpen ? '<' : '>' }}</button>
        <button class="burger" @click="toggleSetting">X</button>
        <button class="burger" @click="toggleLogout">☰</button>
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
  userStore.isSidebarOpen = !userStore.isSidebarOpen
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

  img{
    width: 98px;
      height: 78px;
  }


  &.hidden {
    background-color: transparent;
    box-shadow: none;
    height: 56px;
    justify-content: flex-start;


    img,
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



// .sidebar {
//   position: fixed;
//   top: 0; // Было 56px — убираем
//   left: 0;
//   width: 260px;
//   height: 100vh; // Было calc(100vh - 56px)
//   background-color: #b3e6f3;
//   border-top-right-radius: 20px;
//   border-bottom-right-radius: 20px;
//   box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
//   transform: translateX(-100%);
// transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;

//   &.open {
//     transform: translateX(0);
//   }

//   &__content {
//     padding: 24px 16px;
//   }

//   &__logo {
//     display: flex;
//     align-items: center;
//     margin-bottom: 48px;
//   }

//   &__logo-icon {
//     font-size: 28px;
//     color: #ff7f50;
//     margin-right: 8px;
//   }

//   &__logo-text {
//     font-size: 20px;
//     font-weight: 600;
//     color: #ff7f50;
//     line-height: 1.1;
//   }

//   &__nav {
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//   }

//   &__item {
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     transition: opacity 0.2s ease;

//     &:hover {
//       opacity: 0.75;
//     }
//   }

//   &__icon {
//     font-size: 22px;
//     margin-right: 10px;
//     color: #000;
//   }

//   &__text {
//     font-size: 14px;
//     color: #000;
//   }
// }

// .content {
//   flex: 1;
//   margin-left: 0;
//   margin-top: 56px;
//   padding: 24px;
//   transition: margin-left 0.3s ease;
// }
</style>
