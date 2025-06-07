<script setup lang="ts">
import { useAnimalsStore } from '@/stores/animals/animals';
import Loader from '@/components/Loader.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/users/user';

const userStore = useUserStore()
const animalsStore = useAnimalsStore()

const router = useRouter()

const handleEditAnimal = async (id: string) => {
  if (userStore.user?.role === 'organization'){
    await router.push({ name: 'editAnimal', params: { id: id } })
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

  <div v-else class="cards-grid">

    <div class="card"
      v-if="animalsStore.animals"
      v-for="i in animalsStore.animals"
      @click="handleEditAnimal(i.id)"
    >

      <img v-if="i.photo" :src="i.photo">
      <img v-else
      class="skeleton"
      src="@/assets/images/no-photo.png">

      <p class="name">

        {{ i.name }}
      </p>
      <p class="description">

        {{ i.description }}
      </p>
    </div>
  </div>
</template>


<style scoped lang="scss">
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 карточки в ряд
  gap: 24px; // расстояние между ними
  padding: 24px; // отступ от краёв
  justify-items: center; // по центру, если надо
}

.card {
  width: 320px;
  height: 492px;
  background-color: #D9D9D9;
  border-radius: 40px;
  font-size: 24px;
  img {
    &.skeleton{
      padding: 40px;
    }

      padding: 4px;

    width: 320px;
    height: 320px;
    border-radius: 40px;

  }

  .name {
    padding: 2px 10px;
  }

  .description {
    font-size: 14px;
    padding: 2px 14px;
  }

}
</style>
