<script setup lang="ts">
import { useCreateUserStore } from '@/stores/users/create';
import { useRouter } from 'vue-router';

const router = useRouter()
const createUserStore = useCreateUserStore()
type UserField = keyof typeof createUserStore.user;

const fields: { name: UserField; title: string; type: string; required: boolean }[] = [
  {
    name: "surname",
    title: "Фамилия:",
    type: "text",
    // model: createUserStore.user.surname,
    required: true
  },
  {
    name: "name",
    title: "Имя:",
    type: "text",
    // model: createUserStore.user.name,
    required: true
  },
  {
    name: "patronymic",
    title: "Отчество*:",
    type: "text",
    // model: createUserStore.user.patronymic,
    required: false
  },
  {
    name: "email",
    title: "Почта:",
    type: "text",
    // model: createUserStore.user.email,
    required: true
  },{
    name: "address",
    title: "Город проживания:",
    type: "text",
    // model: createUserStore.user.address,
    required: true

  },
  {
    name: "username",
    title: "Логин:",
    type: "text",
    // model: createUserStore.user.username,
    required: true,
  },
  {
    name: "password",
    title: "Пароль:",
    type: "password",
    // model: createUserStore.user.password,
    required: true
  },
]

const handleUserRegistration = async () => {
  for (const field of fields) {
    if (field.required && !createUserStore.user[field.name]) {
      console.warn(`Поле "${field.name}" не заполнено`)
      return
    }
  }
  await createUserStore.createOrganization()
  router.push('/login')
}
</script>

<template>
  <section >
    <form class="form-toggle active" @submit.prevent="handleUserRegistration">
    <div v-for="field in fields" class="input-box">
      <label :for="field.name">
        {{ field.title }}
      </label>
      <input
        :id="field.name"
        v-model="createUserStore.user[field.name]"
        :name="field.name"
        :type="field.type"
        :required="field.required"
      />
    </div>
     <button
      class="register-btn"
      type="submit"
      >
      <!-- @click="handleRegistration" -->
      Зарегистрироваться
    </button >
    </form>
  </section>
</template>

