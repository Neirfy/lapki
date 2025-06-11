<script setup lang="ts">
import { useBreedStore } from '@/stores/animals/breeds';
import { useAnimalFiltersStore } from '@/stores/animals/filter';
import { useStatusStore } from '@/stores/animals/statuses';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const animalFiltersStore = useAnimalFiltersStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()


const toggleOrder = (value: 'asc' | 'desc') => {
  animalFiltersStore.order = animalFiltersStore.order === value ? undefined : value
}

const handleAddAnimal = () => {
  void router.push('/organization/add')
}

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
})
</script>

<template>
  <div class="sort-section">
    <button
      class="sort-btn"
      @click="toggleOrder('asc')"
    >
      <i class='bx bx-sort-up'></i>
      По возрастанию
    </button>
    <button
      class="sort-btn"
      @click="toggleOrder('desc')"
    >
      <i class='bx bx-sort-down'></i>
      По убыванию
    </button>


    <select
      id="breed"
      class="sort-btn"
      v-model="animalFiltersStore.animalFilter.status"
      v-if="statusStore.statuses"
    >

      <option value="">— Не выбрано —</option>
      <option v-for="status in statusStore.statuses" :value="status.id">
        {{ status.name }}
      </option>
    </select>

    <select
      id="breed"
      class="sort-btn"
      v-model="animalFiltersStore.animalFilter.breed"
      v-if="breedStore.breeds"
    >
      <option value="">— Не выбрано —</option>
      <option v-for="breed in breedStore.breeds" :value="breed.id">
        {{ breed.name }}
      </option>
    </select>
    <div class="add-button">
      <button @click="handleAddAnimal">
        Добавить животное
      </button>
    </div>
  </div>
</template>


