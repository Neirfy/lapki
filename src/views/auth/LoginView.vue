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
  <div class="login-wrapper">
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

<style>

</style>
