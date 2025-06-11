<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEditUserStore } from '@/stores/users/edit'
import Loader from '@/components/Loader.vue';
import Modal from '@/components/popup/Modal.vue';
import EditSocial from '@/components/popup/EditSocial.vue';


const editUserStore = useEditUserStore()
const showConfirmModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const showSocialModal = ref(false)
const socialType = ref<'vk' | 'tg' | null>(null)
const socialValue = ref('')


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


const handleEditSocial = (type: 'vk' | 'tg') => {
  socialType.value = type
  socialValue.value = editUserStore.user[type] || ''
  showSocialModal.value = true
}

const confirmSocialSave = (newValue: string) => {
  if (socialType.value) {
    editUserStore.user[socialType.value] = newValue
  }
  showSocialModal.value = false
}

const cancelSocialSave = () => {
  showSocialModal.value = false
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
          alt="Фото оргпнизации"
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
      <label>Название приюта:</label>
      <input
        v-model="editUserStore.user.name"
        type="text" />
      <label>Адрес:</label>
      <input
        v-model="editUserStore.user.address"
        type="text" />
      <label>Дата рождения:</label>
      <input
        v-model="editUserStore.user.birthday"
        type="date"
      />
      <button @click="handleEdit">Сохранить изменения</button>
    </div>

    <div class="info-section">
      <label>Контактные номера:</label>
      <input
        v-model="editUserStore.user.phone1"
        type="text" />
      <input
        v-model="editUserStore.user.phone2"
        type="text" />
      <label>Соц-сети:</label>
      <div class="social-icons">
        <img src="@/assets/images/vk.png" alt="VK" @click="handleEditSocial('vk')" />
        <img src="@/assets/images/tg.png" alt="Telegram" @click="handleEditSocial('tg')" />
      </div>
      <button @click="handleEdit">Сохранить</button>
    </div>

    <div class="info-section">
      <label>Информация о приюте (Описание):</label>
      <textarea
        v-model="editUserStore.user.patronymic"
        rows="5">
      </textarea>
      <button @click="handleEdit">Сохранить изменения</button>
    </div>
    <Modal
      :show="showConfirmModal"
      message="Вы уверены, что хотите сохранить изменения?"
      @confirm="confirmSave"
      @cancel="cancelSave"
    />
    <EditSocial
      :show="showSocialModal"
      :message="socialType === 'vk' ? 'Введите ссылку на VK' : 'Введите ссылку на Telegram'"
      :model-value="socialValue"
      @confirm="confirmSocialSave"
      @cancel="cancelSocialSave"
    />
  </div>
</template>
