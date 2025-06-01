<script setup lang="ts">
import { useBreedStore } from '@/stores/animals/breeds';
import { useAnimalFiltersStore } from '@/stores/animals/filter';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const animalFiltersStore = useAnimalFiltersStore()
const breedStore = useBreedStore()


const toggleOrder = (value: 'asc' | 'desc') => {
  animalFiltersStore.order = animalFiltersStore.order === value ? undefined : value
}

const handleAddAnimal = () => {
  void router.push('/organization/add')
}

onMounted(async () => {
  await breedStore.getBreeds()
})
</script>

<template>
  <div class="top-row">
    <!-- СЛЕВА — фильтры -->
    <div class="filter">
      <div class="buttons-row">
        <img
          src="@/assets/images/asc.png"
          alt="Sort Asc"
          :class="{ active: animalFiltersStore.order === 'asc' }"
          @click="toggleOrder('asc')"
        >
        <img
          src="@/assets/images/desc.png"
          alt="Sort Desc"
          :class="{ active: animalFiltersStore.order === 'desc' }"
          @click="toggleOrder('desc')"
        >

        <select
          id="type"
          class="ui-select"
        >
          <option>Вид животного</option>
        </select>

        <select
          id="breed"
          class="ui-select"
          v-if="breedStore.breeds"
        >
          <option v-for="breed in breedStore.breeds" :value="breed.id">
            {{ breed.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- СПРАВА — кнопка -->
    <div class="add-button">
      <button @click="handleAddAnimal">
        Добавить животное
      </button>
    </div>
  </div>
</template>



<style scoped lang="scss">
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.filter {
  background-color: #D9F1F9;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;
  display: flex;
  flex-direction: column;
}

.buttons-row {
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 32px;
    height: 32px;
    cursor: pointer;

    &.active {
      filter: drop-shadow(0 0 4px #6ec5ff);
      transform: scale(1.2);
    }
  }

  select {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
}

.add-button {
  background-color: #D9F1F9;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;

  button {
    padding: 10px 20px;
    border-radius: 20px;
    // background-color: #b3e5fc;
    color: black;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #81d4fa;
    }
  }
}
</style>
