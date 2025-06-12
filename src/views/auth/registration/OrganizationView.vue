<script setup lang="ts">
import { useCreateUserStore } from '@/stores/users/create';
import UiInput from '@/components/uikit/UiInput.vue';
import { useRouter } from 'vue-router';

const router =useRouter()
const createUserStore = useCreateUserStore()
const fields = [
  {
    name: "name",
    title: "Название:",
    type: "text",
    model: createUserStore.user.name
  },
  {
    name: "address",
    title: "Адрес:",
    type: "text",
    model: createUserStore.user.address
  },
  {
    name: "email",
    title: "Почта:",
    type: "text",
    model: createUserStore.user.email
  },

  {
    name: "username",
    title: "Логин:",
    type: "text",
    model: createUserStore.user.username
  },
  {
    name: "password",
    title: "Пароль:",
    type: "password",
    model: createUserStore.user.password
  },
]

const handleRegistration = async () => {
  await createUserStore.createOrganization()
  router.push('/login')
}
</script>

<template>
  <section class="">
    <form class="form-toggle active" action="">
      <div v-for="field in fields" class="input-box">
        <label :for="field.name">
          {{ field.title }}
        </label>
        <input
          :id="field.name"
          v-model="field.model"
          :name="field.name"
          :type="field.type"
        />
      </div>
      <button
        class="register-btn"
        @click="handleRegistration"
      >
        Зарегистрироваться
      </button>
    </form>
  </section>
</template>

