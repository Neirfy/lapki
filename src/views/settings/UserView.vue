<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEditUserStore } from '@/stores/users/edit'
import Loader from '@/components/Loader.vue';
import Modal from '@/components/popup/Modal.vue';

const editUserStore = useEditUserStore()
const showConfirmModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const handleEdit =() =>{
    showConfirmModal.value = true
}

const confirmSave = async () => {
  showConfirmModal.value = false
  try {
    await editUserStore.editUser()
  } catch (e) {
    console.error('Ошибка при сохранении', e)
  }
}

const cancelSave = () => {
  showConfirmModal.value = false
}

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
    await editUserStore.editPhoto(formData)
    // target.value = ''
  } catch (e) {
    console.error('Ошибка загрузки фото', e)
  }
}

onMounted(() => {
  editUserStore.setUser()
})
</script>

<template>
  <div class="setting-wrapper">
    <Loader v-show="editUserStore.isLoading" />
    <div class="avatar-container">
      <div class="avatar-setting">
        <img
          v-if="editUserStore.photo.path"
          :src="editUserStore.photo.path"
          alt="Аватар"
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
          Изменить аватар
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
      <label for="surname">Фамилия:</label>
      <input
        id="surname"
        v-model="editUserStore.user.surname"
        type="text" />
      <label>Имя:</label>
      <input
        v-model="editUserStore.user.name"
        type="text" />
      <label>Отчество*:</label>
      <input
        v-model="editUserStore.user.patronymic"
        type="text" />
      <label>Дата рождения:</label>
      <input
        v-model="editUserStore.user.birthday"
        type="date"
      />
      <button @click="handleEdit">Сохранить изменения</button>
    </div>

    <div class="info-section">
      <label>Номер телефона:</label>
      <input
        v-model="editUserStore.user.phone1"
        type="text" />
      <label>Почта:</label>
      <input
        v-model="editUserStore.user.email"
        type="text" />
      <label>Город проживания:</label>
      <input
        v-model="editUserStore.user.address"
        type="text" />

      <button @click="handleEdit">Сохранить</button>
    </div>
    <Modal
      :show="showConfirmModal"
      message="Вы уверены, что хотите сохранить изменения?"
      @confirm="confirmSave"
      @cancel="cancelSave"/>
  </div>
</template>
