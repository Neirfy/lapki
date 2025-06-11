<script setup lang="ts">
import { useOrderStore } from '@/stores/animals/order';
import { onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/popup/Modal.vue';

const orderStore = useOrderStore()

const showModal = ref(false)
const message = ref("")
const currentOrderId = ref<string | null>(null)
const operationType = ref<'accept' | 'reject' | null>(null)


const handleOperation = (id: string, type: 'accept' | 'reject') => {
  currentOrderId.value = id
  operationType.value = type
  showModal.value = true

  message.value =
    type === 'accept'
      ? 'Вы уверены, что хотите принять заявку?'
      : 'Вы уверены, что хотите отклонить заявку?'
}

const confirmOperation = async () => {
  showModal.value = false
  if (!currentOrderId.value || !operationType.value) return

  try {
    if (operationType.value === 'accept') {
      await orderStore.acceptOrder(currentOrderId.value)
    } else {
      await orderStore.declineOrder(currentOrderId.value)
    }
  } catch (e) {
    console.error('Ошибка при выполнении операции', e)
  } finally {
    currentOrderId.value = null
    operationType.value = null
  }
}

const cancelOperation = () => {
  showModal.value = false
  currentOrderId.value = null
  operationType.value = null
}

onMounted(() => {
  orderStore.getOrders()
})
</script>

<template>

  <div>
    <Loader v-show="orderStore.isLoading" />
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
        <button
          class="status-button"
          @click="handleOperation(order.id, 'accept')"
        >
          <img src="@/assets/images/accept.png" alt="Status" class="status-image" />
        </button>
              <div class="status-info">
              </div>
        <button
          class="status-button"
          @click="handleOperation(order.id, 'reject')"
        >
          <img src="@/assets/images/reject.png" alt="Status" class="status-image" />
        </button>
      </div>
    </div>
    <Modal
      :show="showModal"
      :message="message"
      @confirm="confirmOperation"
      @cancel="cancelOperation"/>

  </div>
</template>

<style scoped lang="scss">
.order-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr; // юзер и животное по 2 части, статус — 1 часть
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 10px;
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
  // background-color: #D9D9D9;
  border: 1px solid black;
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

@media (max-width: 1200px) {
  .order-row {
    display: grid;
    grid-template-columns: 1fr 80px;
    grid-template-rows: auto auto;
    gap: 10px;
    padding: 10px;
    border: 1px solid black;
  }

  .user-info {
    grid-column: 1 / 2;
    grid-row: 1;
    background-color: #82B6C8C2;
  }

  .animal-info {
    grid-column: 1 / 2;
    grid-row: 2;
  }

  .status-info {
    grid-column: 2 / 3;
    grid-row: 1 / 3; /* занимает 2 строки */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .status-button {
    // height: 44px;
    // width: 44px;
    margin: 10px auto;
    // background-color: #FF6F61;
    // border-radius: 10px;
    // border: none;
  }

  .status-image {
    width: 100%;
    height: 100%;
  }

  .photo {
    width: 60px;
    height: 60px;
  }
}

</style>
