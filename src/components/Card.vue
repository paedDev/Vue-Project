<script setup>
import { defineProps } from 'vue'

defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100',
  },
})
</script>

<template>
  <div :class="`${bg} border p-6  rounded-xl border-gray-200`">
    <slot></slot>
  </div>
</template>
