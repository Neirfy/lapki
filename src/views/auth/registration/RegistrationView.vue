<script setup lang="ts">
import { onMounted } from 'vue';
import OrganizationView from '@/views/auth/registration/OrganizationView.vue';
import UserView from '@/views/auth/registration/UserView.vue'

import UiButton from '@/components/uikit/UiButton.vue';

import { useRoleStore } from '@/stores/users/roles';
// import { useCreateUserStore } from '@/stores/users/roles';


const roleStore = useRoleStore()

const handleRegistration = async () => {

}
onMounted(async () => {
  await roleStore.getRoles()
})
</script>

<template>
<div class="container1">
  <div class="filter">

    <span class="lbl" v-if="roleStore.selected">Регистрация

      <!-- {{roleStore.selected?.name}} -->
    </span>

    <!-- Добавить аватар
    <button>load</button> -->
    <div>

      <button
      class=""
        :class="{ selected: roleStore.selected?.name === 'user' }"

      @click="roleStore.selected = roleStore.roles[1]"
      >
      Пользователь
    </button >

    <button
    class=""
      :class="{ selected: roleStore.selected?.name === 'organization' }"

    @click="roleStore.selected = roleStore.roles[0]"

    >
    Приют
  </button >
</div>

    <OrganizationView v-if="roleStore.selected?.name=='organization'" />
    <UserView v-else />


  </div>

    <!-- <UiButton v-model="organization"/>
    <UiButton v-model="organization"/> -->
  </div>

</template>

<style scoped lang="scss">
.container1 {
    position: relative;

  max-width: 541px;
  // justify-content: center;
  align-items: center;
  justify-content: center;

}
.filter {
    position: fixed;

  min-height: 649px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #D9F1F9;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;
}

button {
  height: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 2px 2px 5px #ccc;

  &:active {
    background-color: #e0e0e0; // чуть затемнился
    box-shadow: inset 2px 2px 5px #aaa; // типа "вдавили"
    transform: scale(0.98); // немного сжал
  }

  &.selected {
    background-color: #3f51b5;
    color: #fff;
    box-shadow: 2px 2px 10px #999;
  }

}
</style>
