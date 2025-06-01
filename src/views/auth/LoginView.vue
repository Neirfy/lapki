<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiAuth from '@/api/requests/api.auth';
import UiInput from '@/components/uikit/UiInput.vue';
import Loader from '@/components/Loader.vue';
import type { UserLogin } from '@/types/user';
import { useUserStore } from '@/stores/users/user';

const userStore = useUserStore()
const router = useRouter()
const isLoading = ref(false)
// const username = ref("")
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
      if (userStore.user?.role == 'user'){
        void router.push({ name: 'userAnimals' })
      } else if (userStore.user?.role == 'organization'){
        void router.push({ name: 'orgAnimals' })
      }

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
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div
    v-else
   class="container1">
    <img class="img-left" src="@/assets/images/leftLogo.png" alt="Left Image" />
    <img class="img-right" src="@/assets/images/rightLogo.png" alt="Right Image" />

    <div class="card">
      <div class="content">
        <img src="@/assets/images/logo.png" alt="Logo" />
        <span class="color-primary">Добрые лапки</span>

        <label
          class="lbl lbl-login lbl-while"
          for="username">Логин</label>
        <UiInput
          class="inp inp-primary"
          id="username"
          v-model="loginData.username"
          name="username"
          type="stinrg"
          autocomplete="username"
        />

        <label
          class="lbl lbl-login lbl-while"
          for="password">Пароль</label>
        <UiInput
          class="inp inp-primary"
          id="password"
          v-model="loginData.password"
          name="password"
          type="password"
          autocomplete="current-password"
        />

        <button
          class="btn btn-primary"
          @click="handleLogin"
          >
        Войти
        </button >
        <button
          class="btn btn-primary"
          @click="handleRegistration"
        >Зарегестрироваться</button>
      </div>
    </div>
  </div>
</template>


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
</style>
