<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAnimalUserStore } from '@/stores/animals/animal.user';
import Loader from '@/components/Loader.vue';

import { useRoute, useRouter } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';
import Modal from '@/components/popup/Modal.vue';

const route = useRoute()
const router = useRouter()
const uuid = route.params.id as string;
const animalStore = useAnimalUserStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()

const showConfirmModal = ref(false)
const handleRequest =() =>{
    showConfirmModal.value = true
}

const confirmRequest= async () => {
  showConfirmModal.value = false
  try {
    await animalStore.createRequest()
  router.push({name: 'main'})
  } catch (e) {
    console.error('Ошибка при сохранении', e)
  }
}

const cancelRequest = () => {
  showConfirmModal.value = false
}

const handleOpenSocial = (type: 'vk' | 'tg') => {
  const url = ref("")
  if (type === 'vk') {
    url.value = `https://${animalStore.animal?.organization.vk}`
  } else if (type === 'tg') {
    url.value = `https://${animalStore.animal?.organization.tg}`
  }

  if (url) {
    window.open(url.value, '_blank')
  }
}

// const handleRequest = async () => {
//   await animalStore.createRequest()
//   router.push({name: 'main'})
// }

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
    <Loader v-show="animalStore.isLoading" />
      <div class="animal-organization-wrapper">
        <div class="animal-wrapper">
          <div class="avatar-setting">
            <img
              v-if="animalStore.animal?.photo"
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

          <div class="info-section">
            <label>Имя животного: </label>
            <span>
              {{ animalStore.animal?.name }}
            </span>
            <label class="" for="breed">Порода: </label>
            <span>
              {{ breedStore.selected?.name }}
            </span>
            <label>Возраст:</label>
            <span>
               {{ animalStore.animal?.age }}
            </span>
          </div>

          <div class="info-section full-width-row">
            <label>История животного:</label>
            <textarea>{{animalStore.animal?.description}}</textarea>
          </div>
          <button
          v-if="animalStore.animal"
          class="btn "
          @click="handleRequest"
          >
          Подать заявку
        </button >
        </div>
        <div class="organization-wrapper">

          <div class="info-section-org">
            <div class="avatar-setting small">
            <img
              v-if="animalStore.animal?.photo"
              :src="animalStore.animal.photo"
              alt="Фото животного"
            />
            <img
              v-else
              class="skeleton2"
              src="@/assets/images/no-photo.png"
              alt="Нет фото"

            />
          </div>
            <label>
              Название приюта
            </label>
            <span>
              {{ animalStore.animal?.organization.name }}
            </span>
            <label>Адрес</label>
            <span>
              {{ animalStore.animal?.organization.address }}
            </span>
            <label>Контактные номера:</label>
            <span>
              {{ animalStore.animal?.organization.phone1 }}
            </span>
            <span>
              {{ animalStore.animal?.organization.phone2 }}
            </span>
            <label>Соц-сети:</label>
            <span>
              <img v-if="animalStore.animal?.organization.vk" src="@/assets/images/vk.png" alt="VK" @click="handleOpenSocial('vk')" />
              <img v-if="animalStore.animal?.organization.tg" src="@/assets/images/tg.png" alt="Telegram" @click="handleOpenSocial('tg')" />

            </span>
          </div>
        </div>


        <Modal
        :show="showConfirmModal"
        message="Вы уверены, что хотите подать заявку на усыновление живогного?"
        @confirm="confirmRequest"
        @cancel="cancelRequest"/>
      </div>
</template>
