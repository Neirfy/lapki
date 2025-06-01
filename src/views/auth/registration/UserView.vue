<!-- <script setup lang="ts">
import UiInput from '@/components/uikit/UiInput.vue';

</script>
<template>

  <UiInput
    class="inp"
    name=""
  />
  Фамилия
  Имя
  Отчество-
  Дата
  email
  Логин
  Пароль
</template> -->
<script setup lang="ts">
import { useCreateUserStore } from '@/stores/users/create';
import UiInput from '@/components/uikit/UiInput.vue';
import { useRoleStore } from '@/stores/users/roles';
import { useRouter } from 'vue-router';

const router =useRouter()
// const roleStore = useRoleStore()
const createUserStore = useCreateUserStore()

const handleRegistration = async () => {
  await createUserStore.createOrganization()
  router.push('/login')
}
</script>

<template>
  <div class="container1">

    <label
      class="lbl lbl-while"
      for="address">Фамилия
    </label>
    <UiInput
      class="inp "
      id="address"
      v-model="createUserStore.user.surname"
      name="address"
      type="text"
    />
    <label
      class="lbl lbl-while"
      for="username">Имя:
    </label>
    <UiInput
      class="inp "
      id="username"
      v-model="createUserStore.user.name"
      name="username"
      type="text"
    />
    <label
      class="lbl lbl-while"
      for="patronymic">Отчество*:
    </label>
    <UiInput
      class="inp "
      id="patronymic"
      v-model="createUserStore.user.patronymic"
      name="patronymic"
      type="text"
    />
    <label
      class="lbl lbl-while"
      for="email">Почта:
    </label>
    <UiInput
      class="inp "
      id="email"
      v-model="createUserStore.user.email"
      name="email"
      type="text"
    />




    <label
      class="lbl lbl-while"
      for="address">Город проживания:
    </label>
    <UiInput
      class="inp "
      id="address"
      v-model="createUserStore.user.address"
      name="address"
      type="text"
    />

     <label
      class="lbl lbl-while"
      for="username">Логин:
    </label>
    <UiInput
      class="inp "
      id="username"
      v-model="createUserStore.user.username"
      name="username"
      type="text"
    />

    <label
      class="lbl lbl-while"
      for="password">Пароль:
    </label>
    <UiInput
      class="inp "
      id="password"
      v-model="createUserStore.user.password"
      name="password"
      type="password"
    />


     <button
      class="btn btn-primary"
      @click="handleRegistration"
    >
      Зарегестрироваться
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

// button {
//   // height: 40px;
//     padding: 0 10px;

//   border-radius: 10px;
//   background-color: #ffffff;
//   cursor: pointer;
//   box-shadow: 2px 2px 5px #ccc;
// }
</style>

