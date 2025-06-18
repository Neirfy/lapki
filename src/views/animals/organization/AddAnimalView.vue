<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAnimalCreateStore } from '@/stores/animals/create';
import Loader from '@/components/Loader.vue';

import { useRouter } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';
import Modal from '@/components/popup/Modal.vue';
import { useTypeStore } from '@/stores/animals/animal.types';

const fileInput = ref<HTMLInputElement | null>(null)

const router =useRouter()

const createAnimalStore = useAnimalCreateStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const typeStore = useTypeStore()
const showConfirmModal = ref(false)

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
    await createAnimalStore.addPhoto(formData)
    target.value = ''
  } catch (e) {
    console.error('Ошибка загрузки фото', e)
  }
}


const handleAdd =() =>{
    showConfirmModal.value = true
}

const confirmSave = async () => {
  showConfirmModal.value = false
  try {
    await createAnimalStore.createAnimal()
    void router.push({name: 'orgAnimals'})
  } catch (e) {
    console.error('Ошибка при сохранении', e)
  }
}

const cancelSave = () => {
  showConfirmModal.value = false
}

// const handleRegistration = async () => {
//   console.log(createAnimalStore.animalCreate)
//   await createAnimalStore.createAnimal()
//   router.push({name: 'orders'})
// }

onMounted(async () => {
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await typeStore.getTypes()
})
</script>

<template>
  <Loader v-show="createAnimalStore.isLoading" />
    <div class="animal-wrapper">
      <div class="avatar-container">
        <div class="avatar-setting">
          <img
            v-if="createAnimalStore.animalCreate.photo"
            :src="createAnimalStore.animalCreate.photo"
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
        </div>
        <button
        class="avatar-btn blue-btn"
        @click="triggerFileInput"
        >
          Сменить изображение
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="onFileChange"
          style="display: none"
        />
      </div>
    <div class="info-section">
      <label>Имя:</label>
      <input
        v-model="createAnimalStore.animalCreate.name"
        type="text" />

      <label class="" for="type">Вид:</label>
      <select
        id="type"
        v-model="createAnimalStore.animalCreate.id_type"
        v-if="breedStore.breeds"
      >
        <option v-for="type in typeStore.types" :value="type.id">
          {{ type.name }}
        </option>
      </select>


      <label class="" for="breed">Порода:</label>
      <select
        id="breed"
        v-model="createAnimalStore.animalCreate.id_breed"
        v-if="breedStore.breeds"
      >
        <option v-for="breed in breedStore.breeds" :value="breed.id">
          {{ breed.name }}
        </option>
      </select>

      <label class="" for="breed">Статус:</label>
      <select
        id="breed"
        v-model="createAnimalStore.animalCreate.id_status"
        v-if="statusStore.statuses"
      >
        <option v-for="status in statusStore.statuses" :value="status.id">
          {{ status.name }}
        </option>
      </select>

      <label>Возраст:</label>
      <input
        v-model="createAnimalStore.animalCreate.age"
        type="text" />
    </div>

    <div class="info-section full-width-row">
      <label>История животного:</label>
      <textarea
        v-model="createAnimalStore.animalCreate.description"
        type="text">
      </textarea>
    </div>

    <button
      class="btn "
      @click="handleAdd"
    >
      Опубликовать
    </button >

    <Modal
      :show="showConfirmModal"
      message="Вы уверены, что хотите добавить животное"
      @confirm="confirmSave"
      @cancel="cancelSave"/>
  </div>
</template>
