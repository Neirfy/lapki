<script setup lang="ts">
import { useAnimalsStore } from '@/stores/animals/animals';
import Loader from '@/components/Loader.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/users/user';

const userStore = useUserStore()
const animalsStore = useAnimalsStore()

const router = useRouter()

const handleShowAnimal = async (id: string) => {
  if (userStore.user?.role === 'organization'){
    await router.push({ name: 'animal', params: { id: id } })
  } else {
    await router.push({ name: 'userAnimal', params: { id: id } })
  }
}

onMounted(async () =>{
  await animalsStore.getAnimals()
})

</script>
<template>
<div v-if="animalsStore.isLoading">
    <Loader />
  </div>

  <div v-else class="animals-grid">
    <div
      class="card-container"
      v-if="animalsStore.animals"
      v-for="i in animalsStore.animals"
    >
      <div class="product-card"

        @click="handleShowAnimal(i.id)"
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
