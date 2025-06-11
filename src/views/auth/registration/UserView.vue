<script setup lang="ts">
import { useCreateUserStore } from '@/stores/users/create';
import { useRouter } from 'vue-router';

const router = useRouter()
const createUserStore = useCreateUserStore()
const fields = [
  {
    name: "surname",
    title: "Фамилия:",
    type: "text",
    model: createUserStore.user.surname
  },
  {
    name: "name",
    title: "Имя:",
    type: "text",
    model: createUserStore.user.name
  },
  {
    name: "patronymic",
    title: "Отчество*:",
    type: "text",
    model: createUserStore.user.patronymic
  },
  {
    name: "email",
    title: "Почта:",
    type: "text",
    model: createUserStore.user.email
  },{
    name: "address",
    title: "Город проживания:",
    type: "text",
    model: createUserStore.user.address
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
  <section >
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
      Зарегестрироваться
    </button >
    </form>
  </section>
</template>

