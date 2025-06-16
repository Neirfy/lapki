<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAnimalEditStore } from '@/stores/animals/edit';
import { useRoute, useRouter } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/popup/Modal.vue';


const fileInput = ref<HTMLInputElement | null>(null)
const route = useRoute()
const router = useRouter()
const uuid = route.params.id as string;
const editAnimalStore = useAnimalEditStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const showConfirmModal = ref(false)
const isEdit  = ref(false)

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


const handleEdit =() =>{
    showConfirmModal.value = true
}

const confirmSave = async () => {
  showConfirmModal.value = false
  try {
    isEdit.value = false
    await editAnimalStore.editAnimal()
    // void router.push({name: 'main'})
  } catch (e) {
    console.error('Ошибка при сохранении', e)
  }
}

const cancelSave = () => {
  showConfirmModal.value = false
}


onMounted(async () => {
  editAnimalStore.uuid = uuid
  await breedStore.getBreeds()
  await statusStore.getStatuses()
  await editAnimalStore.getAnimal()
})
</script>

<template>
  <div>
  <div class="animal-wrapper">
    <Loader v-show="editAnimalStore.isLoading" />
    <div class="avatar-container">
      <div class="avatar-setting">
        <img
          v-if="editAnimalStore.animalEdit.photo"
          :src="editAnimalStore.animalEdit.photo"
          alt="Фото животного"
        />
        <img
          v-else
          class="skeleton"
          src="@/assets/images/no-photo.png"
          alt="Нет фото"
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

      <input v-if="isEdit"
      v-model="editAnimalStore.animalEdit.name"
      type="text" />
      <span v-else>
        {{ editAnimalStore.animalEdit.name }}
      </span>

      <label class="" for="breed">Порода:</label>
      <select
        v-if="isEdit"
        id="breed"
        v-model="editAnimalStore.animalEdit.id_breed"
      >
        <option v-for="breed in breedStore.breeds" :value="breed.id">
          {{ breed.name }}
        </option>

      </select>
      <span v-else>
        {{     breedStore.breeds.find(b => b.id === editAnimalStore.animalEdit.id_breed)?.name || '—' }}
      </span>

      <label>Возраст:</label>
      <input v-if="isEdit"
        v-model="editAnimalStore.animalEdit.age"
        type="text" />
      <span v-else>
        {{ editAnimalStore.animalEdit.age }}
      </span>
    </div>

    <div class="info-section full-width-row">
      <label>История животного:</label>
      <textarea v-if="isEdit"
        v-model="editAnimalStore.animalEdit.description"
        type="text">
      </textarea>
      <textarea v-else
        v-model="editAnimalStore.animalEdit.description"
        type="text"
        :readonly="!isEdit"
      >
      </textarea>
    </div>

    <button
      class="btn "
      @click="isEdit = !isEdit"
    >
      Изменить анкету
    </button >
    <button
      class="btn "
      @click="handleEdit"
    >
      Опубликовать
    </button >
    </div>

    <Modal
      :show="showConfirmModal"
      message="Вы уверены, что хотите сохранить изменения?"
      @confirm="confirmSave"
      @cancel="cancelSave"/>
  </div>
</template>
