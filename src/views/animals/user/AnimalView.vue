<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAnimalStore } from '@/stores/animals/animal';
import Loader from '@/components/Loader.vue';

import { useRoute, useRouter } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';

const route = useRoute()
const router = useRouter()
const uuid = route.params.id as string;
const animalStore = useAnimalStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()


const handleRequest = async () => {
  await animalStore.createRequest()
  router.push({name: 'orders'})
}

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await animalStore.getAnimal(uuid)
})

onUnmounted(()=>{
  animalStore.clean()
})
</script>

<template>
  <section >
    <Loader v-if="animalStore.isLoading" />
    <template v-else>
      <div
        v-if="animalStore.animal"
        class="profile-section">
        <div class="avatar-block">
          <img
            v-if="animalStore.animal.photo"
            :src="animalStore.animal.photo"
            alt="Фото животного"
          />
          <img
            v-else
            class="skeleton"
            src="@/assets/images/no-photo.png"
            alt="Нет фото"

          />

        </div>
        <div class="info-card">
          <h1>
          <label>Имя животного: </label>
          <span>
            {{ animalStore.animal.name }}
          </span>
          </h1>
          <label class="" for="breed">Порода: {{ breedStore.selected?.name }}</label>
          <label>Возраст: {{ animalStore.animal.age }}</label>
        </div>

        <div class="info-card full-width">
          <label>История животного:</label>
          <span>{{animalStore.animal.description}}</span>
        </div>

      </div>
      <div         class="profile-section">
        </div>
      <button
        v-if="animalStore.animal"
        class="btn "
        @click="handleRequest"
        >
        Подать заявку
      </button >
    </template>
  </section>
</template>

<style scoped lang="scss">
.changeme{
  cursor: pointer;
}
.account-settings {
  display: flex;
  font-family: sans-serif;
}

.sidebar {
  background: #b3e5fc;
  width: 200px;
  padding: 20px;
  border-right: 2px solid #2196f3;
}

.logo {
  font-weight: bold;
  margin-bottom: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
  cursor: pointer;
}

nav li.active {
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 20px;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-section {
  background: #e0e0e0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto auto;
  gap: 20px;
  margin-top: 20px;
  border-radius: 40px;
  padding: 20px;
}

.full-width {
  grid-column: 1 / -1; // растягиваем на всю ширину грида
  margin-top: 0;
}

.avatar-block {
  display: flex;

  flex-direction: column;
  // align-items: center;
  padding: 2px;
    align-items: flex-start; // прижимаем влево


  img {
    padding: 40px;
    max-width: 300px;
    max-height: 300px;
      border-radius: 40px;


  }
  img.skeleton {
    background-color: white;
  }
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: #ffcdd2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.info-card,
// .contacts-card,
.description-card {

  // margin: 40px;
  background: #e0e0e0;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  align-self: flex-end;
  background: #ff8a80;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.social-icons img {
  height: 32px;
  margin-right: 8px;
  cursor: pointer;
}

textarea {
  resize: none;
  height: 120px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

