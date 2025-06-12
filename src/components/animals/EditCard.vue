<script setup lang="ts">
import { useAnimalsOrganizationStore } from '@/stores/animals/animals.organization';
import Loader from '@/components/Loader.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useUserStore } from '@/stores/users/user';

// const userStore = useUserStore()
const animalsOrganizationStore = useAnimalsOrganizationStore()

const router = useRouter()

const handleEditAnimal = async (id: string) => {
  // if (userStore.user?.role === 'organization'){
    await router.push({ name: 'editAnimal', params: { id: id } })
  // } else {
  //   await router.push({ name: 'userAnimal', params: { id: id } })
  // }
}

onMounted(async () =>{
  await animalsOrganizationStore.getAnimals()
})

</script>
<template>
<div v-if="animalsOrganizationStore.isLoading">
    <Loader />
  </div>

  <div v-else class="animals-grid">
    <div
      class="card-container"
      v-if="animalsOrganizationStore.animals"
      v-for="i in animalsOrganizationStore.animals"
    >
      <div class="product-card"

        @click="handleEditAnimal(i.id)"
      >

        <div class="image-block">
        <img v-if="i.photo" :src="i.photo">
        <img v-else src="@/assets/images/no-photo.png">
        <!-- class="skeleton" -->
        </div>
        <div class="product-info">
          <h2>{{ i.name }}</h2>
          <p> {{ i.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
