<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Become a Vue Dev',
  },
  subTitle: {
    type: String,
    default: 'Find the Vue job that fits your skills and needs',
  },
})
</script>

<template>
  <section className="py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{{ title }}</h1>
      <p className="text-lg text-gray-600">{{ subTitle }}</p>
    </div>
  </section>
</template>
