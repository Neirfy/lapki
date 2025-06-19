<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreedStore } from '@/stores/animals/breeds'
import { useStatusStore } from '@/stores/animals/statuses'
import { useAnimalFiltersStore } from '@/stores/animals/filter'
import { useAnimalsStore } from '@/stores/animals/animals';
import { useOrganizationStore } from '@/stores/animals/organizations';
import { useTypeStore } from '@/stores/animals/animal.types';
import { useUserStore } from '@/stores/users/user';

const userStore = useUserStore()
const animalsStore = useAnimalsStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const animalFiltersStore = useAnimalFiltersStore()
const organizationStore = useOrganizationStore()
const typeStore = useTypeStore()

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await organizationStore.getOrganizations()
  await typeStore.getTypes()
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
          <label for="type">Вид животного:</label>
          <select
            id="type"
            class="sort-btn"
            v-model="animalFiltersStore.animalFilter.type"
            v-if="typeStore.types"
          >
            <option value="">— Не выбрано —</option>
            <option v-for="type in typeStore.types" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="filter-dropdown">
          <label class="lbl color-black" for="breed">Порода</label>
            <select
              id="breed"
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
          <!-- v-if="userStore.user?.role === 'user'" -->
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
