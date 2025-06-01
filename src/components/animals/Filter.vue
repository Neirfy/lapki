<script setup lang="ts">
import { useBreedStore } from '@/stores/animals/breeds'
import { useStatusStore } from '@/stores/animals/statuses'
import { useAnimalFiltersStore } from '@/stores/animals/filter'

import { onMounted } from 'vue';

import UiInput from '../uikit/UiInput.vue';
import { useAnimalsStore } from '@/stores/animals/animals';

const animalsStore = useAnimalsStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const animalFiltersStore = useAnimalFiltersStore()

const handleSearch = async () => {
  console.log(111)
  await animalsStore.getAnimals()
}


onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
})
</script>
<template>
  <div class="container1">
    <div class="filter">

    <label
      class="lbl lbl-while"
      for="age">Возраст
    </label>
    <UiInput
      class="inp "
      id="age"
      v-model="animalFiltersStore.animalFilter.age"
      name="age"
      type="number"
    />



    <label class="lbl color-black" for="breed">Порода</label>
    <select
      id="breed"
      class="ui-select"
      v-if="breedStore.breeds"
    >
      <option v-for="breed in breedStore.breeds" :value="breed.id">
        {{ breed.name }}
      </option>
    </select>

    <label
      class="lbl lbl-while"
      for="username">Город
    </label>
    <UiInput
      class="inp "
      id="username"
      v-model="animalFiltersStore.animalFilter.organization"
      name="username"
      type="text"
      autocomplete="username"
    />


    <label class="lbl color-black" for="status">Статус приручения</label>
    <select
      id="status"
      class="ui-select"
      v-if="breedStore.breeds"
    >
      <option v-for="status in statusStore.statuses" :value="status.id">
        {{ status.name }}
      </option>
    </select>
    <button
    @click="handleSearch"
    >Найти</button>
    </div>
</div>
</template>

<style scoped lang="scss">
.container1 {
  width: 350px;

}

.filter {
  height: 649px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #D9F1F9;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;
}

.ui-select,
.inp {
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #ccc;
}

button {
  height: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 2px 2px 5px #ccc;
}
</style>
