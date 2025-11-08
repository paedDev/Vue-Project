<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import Joblisting from './Joblisting.vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
})
const state = reactive({
  jobs: [],
  isLoading: true,
})
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/jobs')
    state.jobs = response.data
  } catch (error) {
    console.error(`Error fetching jobs`, error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="max-w-7xl mx-auto">
    <div class="bg-blue-50 px-4 py-10">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Jobs</h2>
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
        <Joblisting
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block text-center px-6 py-4 rounded-xl bg-black hover:bg-gray-700 text-white"
      >View All Jobs</RouterLink
    >
  </section>
</template>
