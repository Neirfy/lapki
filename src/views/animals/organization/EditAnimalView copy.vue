<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAnimalEditStore } from '@/stores/animals/edit';
import UiInput from '@/components/uikit/UiInput.vue';
import { useRoute } from 'vue-router';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';

const file = ref<File | null>(null);

const route =useRoute()
const uuid = route.params.id as string;

const editAnimalStore = useAnimalEditStore()
const breedStore = useBreedStore()
const statusStore = useStatusStore()
const handleRegistration = async () => {
  // console.log(editAnimalStore.animalCreate)
  await editAnimalStore.editAnimal()
  // router.push('/login')
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    console.log(file.value)
  }
};

const handleChangePhoto = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('file', file.value); // ключ 'file' должен совпадать с тем, что сервер ждёт

  try {
    await editAnimalStore.changePhoto(formData); // передаём FormData
    await editAnimalStore.getAnimal(uuid);
  } catch (error) {
    console.error('Ошибка при загрузке фото', error);
  }
}

onMounted(async () => {
  console.log(uuid)
  await editAnimalStore.getAnimal(uuid)
  await breedStore.getBreeds()
  await statusStore.getStatuses()
})
</script>

<template>
  <div class="container1">

<!--
  -->
  <!-- <div class="filter"> -->
    <img v-if="editAnimalStore.animalEdit.photo" :src="editAnimalStore.animalEdit.photo">
      <img v-else
      class="skeleton"
      src="@/assets/images/no-photo.png">
      <button
        @click="handleChangePhoto"
      >
      <input type="file" @change="onFileChange" accept="image/*" />

      Изменить фото</button>

    <label
      class="lbl lbl-while"
      for="name">Имя животного
    </label>
    <UiInput
      class="inp "
      id="name"
      v-model="editAnimalStore.animalEdit.name"
      name="name"
      type="text"
    />
    <label
      class="lbl lbl-while"
      for="age">Возраст
    </label>
    <UiInput
      class="inp "
      id="age"
      v-model="editAnimalStore.animalEdit.age"
      name="age"
      type="number"
    />
    <label class="lbl color-black" for="breed">Роль</label>
    <select
      id="breed"
      class="ui-select"
      v-model="breedStore.selected"

      v-if="breedStore.breeds"
    >
      <option v-for="breed in breedStore.breeds" :value="breed">
        {{ breed.name }}
      </option>
    </select>

    <label class="lbl color-black" for="breed">Роль</label>
    <select
      id="breed"
      class="ui-select"
      v-model="statusStore.selected"
      v-if="statusStore.statuses"
    >
      <option v-for="status in statusStore.statuses" :value="status">
        {{ status.name }}
      </option>
    </select>

    <label
      class="lbl lbl-while"
      for="description">История животного
    </label>
    <UiInput
      class="inp "
      id="description"
      v-model="editAnimalStore.animalEdit.description"
      name="description"
      type="text"
    />

     <button
      class="btn "
      @click="handleRegistration"
    >
      Опубликовать
    </button >
</div>
</template>

<style scoped lang="scss">
.container1 {
  width: 350px;

}


.ui-select,
.inp {
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #ccc;
}

button {
  height: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 2px 2px 5px #ccc;
}
</style>

