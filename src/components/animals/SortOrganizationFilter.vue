<script setup lang="ts">
import { useTypeStore } from '@/stores/animals/animal.types';
import { useBreedStore } from '@/stores/animals/breeds';
import { useAnimalFiltersStore } from '@/stores/animals/filter';
import { useStatusStore } from '@/stores/animals/statuses';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const animalFiltersStore = useAnimalFiltersStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const typeStore = useTypeStore()

const toggleOrder = (value: 'asc' | 'desc') => {
  animalFiltersStore.order = animalFiltersStore.order === value ? undefined : value
}

const handleAddAnimal = () => {
  void router.push('/organization/add')
}

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await typeStore.getTypes()
})
</script>

<template>
  <div class="sort-filter-section">
    <button
      class="sort-select"
      @click="toggleOrder('asc')"
    >
      <i class='bx bx-sort-up'></i>
      <!-- По возрастанию -->
    </button>
    <button
      class="sort-select"
      @click="toggleOrder('desc')"
    >
      <i class='bx bx-sort-down'></i>
      <!-- По убыванию -->
    </button>



    <select
      id="type"
      class="sort-select"
      v-model="animalFiltersStore.animalFilter.type"
      v-if="typeStore.types"
    >
      <option value="">— Вид не выбран —</option>
      <option v-for="type in typeStore.types" :value="type.id">
        {{ type.name }}
      </option>
    </select>

    <select
      id="breed"
      class="sort-select"
      v-model="animalFiltersStore.animalFilter.breed"
      v-if="breedStore.breeds"
    >
      <option value="">— Порода не выбрана —</option>
      <option v-for="breed in breedStore.breeds" :value="breed.id">
        {{ breed.name }}
      </option>
    </select>

    <select
      id="status"
      class="sort-select"
      v-model="animalFiltersStore.animalFilter.status"
      v-if="statusStore.statuses"
    >

      <option value="">— Статус не выбран —</option>
      <option v-for="status in statusStore.statuses" :value="status.id">
        {{ status.name }}
      </option>
    </select>

    <div >
      <button
        class="add-button"
        @click="handleAddAnimal">
        Добавить животное
      </button>
    </div>
  </div>
</template>


