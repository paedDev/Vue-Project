<script setup>
import Card from './Card.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="max-w-7xl mx-auto mb-10 lg:p-6 p-4">
    <!-- Cards Component -->
    <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
      <Card>
        <h2 class="lg:text-3xl text-2xl font-bold mb-2">For Developers</h2>
        <p class="text-gray-600 mb-4">Browse our Vue Jobs and start your career today</p>
        <RouterLink to="/jobs" class="bg-zinc-900 px-4 py-1 text-white rounded-md text-sm"
          >Browse Jobs</RouterLink
        >
      </Card>
      <Card bg="bg-green-100">
        <h2 class="lg:text-3xl text-2xl font-bold mb-2">For Employers</h2>
        <p class="text-gray-600 mb-4">List your job to find the perfect developer for the role</p>
        <RouterLink to="/jobs/add" class="bg-green-500 px-4 py-1 text-white rounded-md text-sm"
          >Add Job</RouterLink
        >
      </Card>
    </div>
  </section>
</template>
