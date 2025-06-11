<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  message: string
  modelValue?: string
}>()

const emit = defineEmits(['confirm', 'cancel', 'update:modelValue'])

const inputValue = ref(props.modelValue || '')

watch(() => props.modelValue, (val) => {
  inputValue.value = val || ''
})

const handleConfirm = () => {
  emit('confirm', inputValue.value)
}
</script>

<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal">
      <p>{{ message }}</p>
      <input type="text" v-model="inputValue" />
      <div class="modal-buttons">
        <button class="btn-confirm" @click="handleConfirm">Да</button>
        <button class="btn-cancel" @click="$emit('cancel')">Отмена</button>
      </div>
    </div>
  </div>
</template>
