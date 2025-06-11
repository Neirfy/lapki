<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal">
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="btn-confirm" @click="$emit('confirm')">Да</button>
        <button class="btn-cancel" @click="$emit('cancel')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
}>()
defineEmits(['confirm', 'cancel'])
</script>
