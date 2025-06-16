<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/users/user';
import { useViewsStore } from '@/stores/users/views';

const viewsStore = useViewsStore()
const userStore = useUserStore()
const router = useRouter()

const handleEditAnimal = async (id: string) => {
  if (userStore.user?.role === 'organization'){
    await router.push({ name: 'editAnimal', params: { id: id } })
  } else {
    await router.push({ name: 'userAnimal', params: { id: id } })
  }
}

onMounted(async () =>{
  await viewsStore.getViews()
})

</script>
<template>
<!-- <div v-if="viewsStore.isLoading">
</div> -->

<div class="animals-grid2">
    <Loader v-show="viewsStore.isLoading"/>
    <div
      class="card-container"
      v-if="viewsStore.views"
      v-for="i in viewsStore.views"
    >
      <div class="product-card" @click="handleEditAnimal(i.id)">
        <div class="image-block">
          <img v-if="i.photo" :src="i.photo">
          <img v-else src="@/assets/images/no-photo.png">
        </div>
        <div class="product-info">
          <h2>{{ i.name }}</h2>
          <p> {{ i.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

