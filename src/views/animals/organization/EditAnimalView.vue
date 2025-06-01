<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAnimalEditStore } from '@/stores/animals/edit';
import Loader from '@/components/Loader.vue';

import { useRoute, useRouter } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';

const fileInput = ref<HTMLInputElement | null>(null)
const route = useRoute()
const router = useRouter()
const uuid = route.params.id as string;
const editAnimalStore = useAnimalEditStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || !target.files.length) return
  const file = target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  try {
    await editAnimalStore.changePhoto(formData)
    target.value = ''
  } catch (e) {
    console.error('Ошибка загрузки фото', e)
  }
}

const handleRegistration = async () => {
  console.log(editAnimalStore.animalEdit)
  await editAnimalStore.editAnimal()
  router.push({name: 'orders'})
}

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await editAnimalStore.getAnimal(uuid)
})
</script>

<template>
  <section class="profile-section">
    <Loader v-if="editAnimalStore.isLoading" />
    <div v-else class="avatar-block">
      <img
        v-if="editAnimalStore.animalEdit.photo"
        :src="editAnimalStore.animalEdit.photo"
        alt="Фото животного"
        @click="triggerFileInput"
      />
      <img
        v-else
        class="skeleton"
        src="@/assets/images/no-photo.png"
        alt="Нет фото"
        @click="triggerFileInput"
      />
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="onFileChange"
        style="display: none"
      />
      <p class="changeme" @click="triggerFileInput">Сменить изображение</p>
    </div>
    <div class="info-card">
      <label>Имя:</label>
      <input
        v-model="editAnimalStore.animalEdit.name"
        type="text" />
      <label class="" for="breed">Порода:</label>
      <select
        id="breed"
        v-model="breedStore.selected"

        v-if="breedStore.breeds"
      >
        <option v-for="breed in breedStore.breeds" :value="breed">
          {{ breed.name }}
        </option>
      </select>
      <label>Возраст:</label>
      <input
        v-model="editAnimalStore.animalEdit.age"
        type="text" />
    </div>

    <div class="info-card full-width">
      <label>История животного:</label>
      <textarea
        v-model="editAnimalStore.animalEdit.description"
        type="text">
      </textarea>
    </div>

    </section>
    <button
      class="btn "
      @click="handleRegistration"
    >
      Опубликовать
    </button >
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

