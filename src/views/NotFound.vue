<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="min-h-screen max-w-7xl mx-auto my-20">
    <div class="flex flex-col h-full justify-center items-center space-y-4">
      <h1 class="text-6xl">404 Not Found</h1>
      <p>This page does not exists</p>
      <RouterLink to="/" class="bg-green-600 px-4 py-1 text-white rounded-xl"> Go Back </RouterLink>
    </div>
  </section>
</template>
