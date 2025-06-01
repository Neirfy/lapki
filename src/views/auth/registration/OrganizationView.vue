<script setup lang="ts">
import { useCreateUserStore } from '@/stores/users/create';
import UiInput from '@/components/uikit/UiInput.vue';
import { useRoleStore } from '@/stores/users/roles';
import { useRouter } from 'vue-router';

const router =useRouter()
// const roleStore = useRoleStore()
const createUserStore = useCreateUserStore()

const handleRegistration = async () => {
  await createUserStore.createOrganization()
  router.push('/login')
}
</script>

<template>
  <div class="container1">
    <label
      class="lbl lbl-while"
      for="name">Название:
    </label>
    <UiInput
      class="inp "
      id="name"
      v-model="createUserStore.user.name"
      name="name"
      type="text"
    />
    <label
      class="lbl lbl-while"
      for="email">Почта:
    </label>
    <UiInput
      class="inp "
      id="email"
      v-model="createUserStore.user.email"
      name="email"
      type="text"
    />
     <label
      class="lbl lbl-while"
      for="username">Логин:
    </label>
    <UiInput
      class="inp "
      id="username"
      v-model="createUserStore.user.username"
      name="username"
      type="text"
    />

    <label
      class="lbl lbl-while"
      for="password">Пароль:
    </label>
    <UiInput
      class="inp "
      id="password"
      v-model="createUserStore.user.password"
      name="address"
      type="password"
    />


     <button
      class="btn "
      @click="handleRegistration"
    >
      Зарегестрироваться
    </button >
</div>
</template>

<style scoped lang="scss">
.container1 {
  width: 350px;
}


.ui-select,
.inp {
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #ccc;
}

button {
  height: 40px;
    padding: 0 10px;

  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 2px 2px 5px #ccc;
}
</style>

