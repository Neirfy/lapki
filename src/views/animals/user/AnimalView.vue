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
<!--
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

.profile {
  // background: #e0e0e0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  margin-top: 20px;
  border-radius: 40px;
  padding: 20px;
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

.profile-organization {
  background: #e0e0e0;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // grid-template-rows: auto auto;
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
  // img.
}
.skeleton2 {
    padding: 40px;
    width: 30px;
    height: 30px;
      border-radius: 40px;
    background-color: white;
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
 -->
