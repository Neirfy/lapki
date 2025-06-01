<script setup lang="ts">

const model = defineModel()
// const label = defineModel()

const props = defineProps<{
  // modelValue: string
  label?: string
  // error?: string
}>()
</script>

<template>
  <!-- <label v-if="props.label">{{ props.label }}</label> -->
  <input
    v-model="model"
  >
</template>
