<script setup lang="ts">
import { useOrderStore } from '@/stores/animals/order';
import { onMounted } from 'vue';

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.getOrders()
})
</script>

<template>
  <div>
    <div v-for="order in orderStore.orders" :key="order.id" class="order-row">
      <div class="user-info">
        <img v-if="order.user.photo" :src="order.user.photo" alt="User photo" class="photo" />
        <img v-else src="@/assets/images/no-photo.png" alt="User photo" class="photo" />

        <div class="user-text">
          {{ order.user.name }} {{ order.user.surname }} {{ order.user.patronymic }}
        </div>
      </div>

      <div class="animal-info">
        <img v-if="order.animal.photo" :src="order.animal.photo" alt="Animal photo" class="photo" />
        <img v-else src="@/assets/images/no-photo.png" alt="User photo" class="photo" />
        <div class="animal-text">{{ order.animal.name }}</div>
      </div>

      <div class="status-info">
        <button class="status-button">
          <img src="@/assets/images/accept.png" alt="Status" class="status-image" />
        </button>
        <button class="status-button">
          <img src="@/assets/images/reject.png" alt="Status" class="status-image" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr; // юзер и животное по 2 части, статус — 1 часть
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  // border-bottom: 1px solid #ddd;
}

.user-info, .animal-info {
  height: 80px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info{
  background-color: #82B6C8C2;
}

.animal-info {
  background-color: #D9D9D9;
  border-radius: 40px;
}
.photo {
  width: 80px;
  height: 80px;
  padding: 5px;
  object-fit: cover;
  border-radius: 50%;
}

.user-text, .animal-text {
  font-weight: 500;
  white-space: nowrap;
}

.status-info {
  display: flex;
  justify-content: center;
}

.status-image {
  width: 44px;
  height: 44px;
}

.status-button {
  height: 80px;
  width: 80px;
  margin-left: 10px;
  background-color: #FF6F61;
  border-radius: 15px;
  border: none;

}


</style>
