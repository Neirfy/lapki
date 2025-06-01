<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEditUserStore } from '@/stores/users/edit'
import Loader from '@/components/Loader.vue';


const editUserStore = useEditUserStore()

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || !target.files.length) return

  const file = target.files[0]

  // Заливаем файл сразу по выбору
  const formData = new FormData()
  formData.append('file', file)

  try {
    await editUserStore.editPhoto(formData)
    // После успешной загрузки можно обновить превью
    // Если createAnimalStore.animalCreate.photo обновляется автоматически — отлично

    // Очищаем input чтобы сработало на тот же файл
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
  <!-- <div class="account-settings"> -->
    <!-- <aside class="sidebar">
      <div class="logo">🐾 Добрые лапки</div>
      <nav>
        <ul>
          <li class="active">🐶 Животные в приюте</li>
          <li>👤 Управление аккаунтом</li>
          <li>📩 Заявки на усыновление</li>
        </ul>
      </nav>
    </aside> -->

    <!-- <main class="content">
      <header class="header">
        <h1>Управление аккаунтом</h1>
        <div class="header-icons">
          <button>&lt;</button>
          <button>🔁</button>
          <button>👤</button>
        </div>
      </header> -->

      <section class="profile-section">
        <Loader v-if="editUserStore.isLoading" />
        <div v-else class="avatar-block">

          <img
            v-if="editUserStore.user.photo"
            :src="editUserStore.user.photo"
            alt="Фото животного"
            />
            <!-- @click="triggerFileInput" -->
          <img
            v-else
            class="skeleton"
            src="@/assets/images/no-photo.png"
            alt="Нет фото"
            />
            <!-- @click="triggerFileInput" -->
          <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
    />


          <!-- <img v-if="editUserStore.user.photo" :src="editUserStore.user.photo">
      <img v-else
      class="skeleton"
      src="@/assets/images/no-photo.png">
      <button
        @click="handleChangePhoto"
      >
      <input type="file" @change="onFileChange" accept="image/*" />

      Изменить фото</button> -->

          <!-- <div class="avatar-placeholder">👤</div> -->
          <p class="changeme" @click="triggerFileInput">Сменить аватар</p>
        </div>

        <div class="info-card">
          <label>Название приюта:</label>
          <input
            v-model="editUserStore.user.name"
            type="text" />
          <label>Адрес:</label>
          <input
            v-model="editUserStore.user.address"
            type="text" />
          <!-- <label>Дата создания:</label>
          <input
            v-model="editUserStore.user."
            type="date"
          /> -->
          <button>Сохранить изменения</button>
        </div>

        <div class="contacts-card">
          <label>Контактные номера:</label>
          <input type="text" />
          <input type="text" />
          <label>Соц-сети:</label>
          <div class="social-icons">
            <!-- <img src="/vk.svg" alt="VK" />
            <img src="/tg.svg" alt="Telegram" /> -->
          </div>
          <button>Сохранить</button>
        </div>

        <div class="description-card">
          <label>Информация о приюте (Описание):</label>
          <textarea
            v-model="editUserStore.user.patronymic"

            rows="5">
          </textarea>
          <button>Сохранить изменения</button>
        </div>
      </section>
    <!-- </main> -->
  <!-- </div> -->
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.avatar-block {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 200px;
    max-height: 200px;
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
.contacts-card,
.description-card {
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
</style>
