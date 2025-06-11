<script setup lang="ts">
import { onMounted } from 'vue';
import OrganizationView from '@/views/auth/registration/OrganizationView.vue';
import UserView from '@/views/auth/registration/UserView.vue'
import { useRoleStore } from '@/stores/users/roles';

const roleStore = useRoleStore()

onMounted(async () => {
  await roleStore.getRoles()
})
</script>

<template>
  <div class="wrapper">
    <h2 class="registration-title">Регистрация</h2>
      <div class="role-selector">
        <label class="role-label">Роль:</label>
        <div class="role-buttons">
          <button
            class="role-button"
            :class="{ active: roleStore.selected?.name === 'user' }"
            @click="roleStore.selected = roleStore.roles[1]"
          >
            Пользователь
          </button>
          <button
            class="role-button"
            :class="{ active: roleStore.selected?.name === 'organization' }"
            @click="roleStore.selected = roleStore.roles[0]"
          >
            Приют
          </button >

        </div>
      </div>
    <OrganizationView v-if="roleStore.selected?.name=='organization'" />
    <UserView v-else />
  </div>
</template>
