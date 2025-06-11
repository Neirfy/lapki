<script setup lang="ts">
import { useAnimalFiltersStore } from '@/stores/animals/filter';
// import { useRouter } from 'vue-router';

// const router = useRouter()
const animalFiltersStore = useAnimalFiltersStore()

const toggleOrder = (value: 'asc' | 'desc') => {
  animalFiltersStore.order = animalFiltersStore.order === value ? undefined : value
}

// const handleAddAnimal = () => {
//   void router.push('/organization/add')
// }
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
    </div>
</template>
