<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreedStore } from '@/stores/animals/breeds'
import { useStatusStore } from '@/stores/animals/statuses'
import { useAnimalFiltersStore } from '@/stores/animals/filter'
import { useAnimalsStore } from '@/stores/animals/animals';
import { useOrganizationStore } from '@/stores/animals/organizations';

const animalsStore = useAnimalsStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const animalFiltersStore = useAnimalFiltersStore()
const organizationStore = useOrganizationStore()


onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await organizationStore.getOrganizations()
})
</script>

<template>
    <div class="filters-sidebar">
      <div class="filters-section">
        <h3>Фильтры</h3>
        <div class="filter-dropdown">
          <label for="age">Возраст</label>
          <input
            class="inp "
            id="age"
            v-model="animalFiltersStore.animalFilter.age"
            name="age"
            type="number"
          />
          <!-- @update:modelValue="(val) => {animalFiltersStore.animalFilter.age = val === '' ? null : Number(val)}" -->
        </div>
        <div class="filter-dropdown">
          <label class="lbl color-black" for="organization">Порода</label>
            <select
              id="organization"
              v-model="animalFiltersStore.animalFilter.breed"
              class="ui-select"
              v-if="breedStore.breeds"
            >
              <option value="">— Не выбрано —</option>

              <option v-for="breed in breedStore.breeds" :value="breed.id">
                {{ breed.name }}
              </option>
            </select>
        </div>
        <div class="filter-dropdown">
          <label for="breed">Организация</label>
          <select
            id="breed"
            v-model="animalFiltersStore.animalFilter.organization"
            class="ui-select"
            v-if="breedStore.breeds"
          >
            <option value="">— Не выбрано —</option>

            <option v-for="organization in organizationStore.organizations" :value="organization.id">
              {{ organization.name }}
            </option>
          </select>
        </div>
        <div class="filter-dropdown">
          <label for="status">Статус приручения</label>
          <select
            id="status"
            v-model="animalFiltersStore.animalFilter.status"
            class="ui-select"
            v-if="breedStore.breeds"
          >
            <option value="">— Не выбрано —</option>
            <option v-for="status in statusStore.statuses" :value="status.id">
              {{ status.name }}
            </option>
          </select>
          <button
            class="btn"
            @click="animalsStore.getAnimals"
          >
            Найти
          </button>
        </div>
        </div>
      </div>
</template>
