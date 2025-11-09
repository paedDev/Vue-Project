<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Briefcase,
  MapPin,
  DollarSign,
  Building2,
  Mail,
  Phone,
} from 'lucide-vue-next'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id

const state = reactive({
  job: null,
  isLoading: false,
  error: null,
})

const fetchById = async () => {
  try {
    state.isLoading = true
    const response = await axios.get(`/api/jobs/${jobId}`)
    state.job = response.data
    console.log('Full response:', response.data)
  } catch (error) {
    state.error = error
    console.error('Failed to fetch a single job:', error)
  } finally {
    state.isLoading = false
  }
}

const deleteJob = async () => {
  try {
    state.isLoading = true
    if (confirm('Are you sure you want to delete this Job Post?')) {
      const response = await axios.delete(`/api/jobs/${jobId}`)
      router.push('/jobs')
    }
  } catch (error) {
    state.error = error
    console.error('Failed to fetch job:', error)
  } finally {
    state.isLoading = false
  }
}

onMounted(() => {
  fetchById()
})
</script>

<template>
  <section class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Back Button -->
      <RouterLink
        to="/jobs"
        class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft :size="20" class="mr-2" />
        Back to Jobs
      </RouterLink>

      <!-- Loading State -->
      <div v-if="state.isLoading" class="flex justify-center items-center h-64">
        <PulseLoader color="#16a34a" />
      </div>

      <!-- Error State -->
      <div
        v-else-if="state.error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-600">Failed to load job details. Please try again.</p>
      </div>

      <!-- Job Content -->
      <div v-else-if="state.job" class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Job Header Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <span
                  class="inline-block bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium rounded-full mb-3"
                >
                  {{ state.job.type }}
                </span>
                <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ state.job.title }}</h1>

                <div class="flex flex-wrap gap-4 text-gray-600">
                  <div class="flex items-center">
                    <MapPin :size="18" class="mr-2 text-orange-600" />
                    <span>{{ state.job.location }}</span>
                  </div>
                  <div class="flex items-center">
                    <DollarSign :size="18" class="mr-2 text-green-600" />
                    <span class="font-semibold text-green-600">{{ state.job.salary }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <RouterLink
                :to="`/jobs/edit/${jobId}`"
                class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <Pencil :size="18" />
                Edit Job
              </RouterLink>
              <button
                @click="deleteJob"
                class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <Trash2 :size="18" />
                Delete Job
              </button>
            </div>
          </div>

          <!-- Job Description Card -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center mb-4">
              <Briefcase :size="20" class="text-green-600 mr-2" />
              <h2 class="text-xl font-bold text-gray-900">Job Description</h2>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ state.job.description }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Company Info Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <div class="flex items-center mb-4">
              <Building2 :size="20" class="text-green-600 mr-2" />
              <h2 class="text-xl font-bold text-gray-900">Company Info</h2>
            </div>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">
                  {{ state.job.company?.name }}
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ state.job.company?.description }}
                </p>
              </div>

              <div class="border-t border-gray-200 pt-4 space-y-3">
                <div>
                  <div class="flex items-center text-green-600 font-semibold mb-1">
                    <Mail :size="16" class="mr-2" />
                    Contact Email
                  </div>
                  <a
                    :href="`mailto:${state.job.company?.contactEmail}`"
                    class="text-blue-600 hover:text-blue-700 text-sm break-all"
                  >
                    {{ state.job.company?.contactEmail }}
                  </a>
                </div>

                <div>
                  <div class="flex items-center text-green-600 font-semibold mb-1">
                    <Phone :size="16" class="mr-2" />
                    Contact Phone
                  </div>
                  <a
                    :href="`tel:${state.job.company?.contactPhone}`"
                    class="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {{ state.job.company?.contactPhone }}
                  </a>
                </div>
              </div>

              <!-- Apply Button -->
              <button
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
