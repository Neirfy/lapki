<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiAuth from '@/api/requests/api.auth';
import type { UserLogin } from '@/types/user';
import { useUserStore } from '@/stores/users/user';

const userStore = useUserStore()
const router = useRouter()
const isLoading = ref(false)

const loginData = ref<UserLogin>({
  username: "",
  password: ""
})

const handleLogin = async () => {
  isLoading.value = true
  try {
    if (!loginData.value.password || !loginData.value.username) {
      return
    }
    const response = await apiAuth.loginUser(loginData.value);
    if (response) {
      localStorage.setItem('token', response.access_token)
      await userStore.getUser();
      void router.push({ name: 'main' })

      // if (userStore.user?.role == 'user'){
      //   void router.push({ name: 'userAnimals' })
      // } else if (userStore.user?.role == 'organization'){
      //   void router.push({ name: 'orgAnimals' })
      // }

    }
  } catch (err) {
    console.error('Login failed:', err);
  } finally {
    isLoading.value =false
  }
};

const handleRegistration = () => {
  void router.push("register")
}
</script>

<template>
  <!-- <div v-if="isLoading">
    <Loader></Loader>
  </div> -->
  <div class="login-wrapper">
    <!-- <img class="img-left" src="@/assets/images/leftLogo.png" alt="Left Image" />
    <img class="img-right" src="@/assets/images/rightLogo.png" alt="Right Image" /> -->

    <!-- <div class="card"> -->
      <div class="login">
        <div class="logo-name">
          <img src="@/assets/images/logo.png" alt="">
          <div class="logo-name-text">
            <h2>Добрые</h2>
            <h2>лапки</h2>
          </div>
        </div>
        <h1>Логин:</h1>
        <div class="input-box">
            <input
              v-model="loginData.username"
              id="login"
              type="text" placeholder="Введите логин" required>
            <!-- <i class='bx bxs-user'></i> -->
        </div>
        <h1>Пароль:</h1>

        <div class="input-box">
            <input
              v-model="loginData.password"
              id="password"
              type="password"
              placeholder="Введите пароль"
              required>
            <!-- <i class='bx bxs-lock-alt' ></i> -->
        </div>
        <button
          class="btn"
          @click="handleLogin"
          >
        Войти
        </button >
        <button
          class="register-link"
          @click="handleRegistration"
        >Зарегистрироваться
      </button>
    </div>
  </div>
</template>

<!--
<style scoped lang="scss">

.container1 {
  position: relative;
  /* margin: 0; */
  /* padding: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
    background-color: #B2E2F2;

}

.card {
  position: fixed;
  width: 500px;
  height: 760px;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8ACFE6FA;
  border-radius: 32px;
  /* padding: 1rem; */
  gap: 1rem;
  z-index: 1;
}

.img-left,
.img-right {
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 0;
}

.img-left {
  left: 0;
}

.img-right {
  right: 0;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

</style> -->
