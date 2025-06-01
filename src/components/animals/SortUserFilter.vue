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
  <div class="container2">
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
            alt="Sort Asc"
            :class="{ active: animalFiltersStore.order === 'desc' }"
            @click="toggleOrder('desc')"
          >
      </div>

    </div>
    <div>

      <!-- <button
      @click="handleAddAnimal"
      >
      Добавить животное
    </button> -->
    </div>
  </div>
  <div class="container2">

    <!-- <button
      @click="handleAddAnimal"
    >
      Добавить животное
    </button> -->
  </div>
</template>

<style scoped lang="scss">
.container2 {
  width: 243px;
}

.filter {
  background-color: #D9F1F9;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    margin-left: 30px;
    margin-right: 30px;
    width: 32px;
    height: 32px;

    &.active {
      opacity: 1;
      transform: scale(1.2);
      // background-color: red;
      filter: drop-shadow(0 0 4px #6ec5ff);
    }
  }
}
</style>
