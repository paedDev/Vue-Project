<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

import {
  Briefcase,
  FileText,
  AlignLeft,
  DollarSign,
  MapPin,
  Building2,
  Info,
  Mail,
  Phone,
  Check,
} from 'lucide-vue-next'
onMounted(() => {})
const router = useRouter()
const route = useRoute()
const toast = useToast()
const jobId = route.params.id
const formState = reactive({
  isError: null,
  type: '',
  title: '',
  description: '',
  salary: '',
  location: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  },
})

const state = reactive({
  job: {},
  isLoading: true,
})

const submitForm = async () => {
  try {
    formState.isLoading = true
    const response = await axios.put(`/api/jobs/${jobId}`, {
      type: formState.type,
      title: formState.title,
      description: formState.description,
      salary: formState.salary,
      location: formState.location,
      company: {
        name: formState.company.name,
        description: formState.company.description,
        contactEmail: formState.company.contactEmail,
        contactPhone: formState.company.contactPhone,
      },
    })
    toast.success(' Job Updated Succesfully ')

    router.push('/jobs')
  } catch (error) {
    console.error('Error adding job:', error)
    toast.error(error.message || 'Job was not Updated')
  } finally {
    formState.isLoading = false
  }
}
onMounted(async () => {
  try {
    state.isLoading = true
    const response = await axios.get(`/api/jobs/${jobId}`)
    state.job = response.data
    // Populate input
    formState.type = state.job.type
    formState.title = state.job.title
    formState.description = state.job.description
    formState.salary = state.job.salary
    formState.location = state.job.location
    formState.company.name = state.job.company.name
    formState.company.description = state.job.company.description
    formState.company.contactEmail = state.job.company.contactEmail
    formState.company.contactPhone = state.job.company.contactPhone
  } catch (error) {
    console.error('Error fetching job', error)
  } finally {
    state.isLoading = false
  }
})
</script>
<template>
  <section class="p-6 max-w-8xl mx-auto min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
    <div class="flex items-center justify-center">
      <div class="border shadow-2xl border-gray-200 h-full w-3xl bg-white p-8 rounded-2xl">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
          >
            <Briefcase :size="32" class="text-green-600" />
          </div>
          <h2 class="text-4xl font-bold text-gray-800">Edit Job Listing</h2>
          <p class="text-gray-500 mt-2">Edit details to jobs</p>
        </div>

        <form action="" @submit.prevent="submitForm" class="space-y-5">
          <!-- Job type -->
          <div v-if="formState.isError" class="text-red-600 font-semibold">
            <p>{{ formState.isError }}</p>
          </div>
          <div class="flex flex-col justify-start space-y-2">
            <label for="type" class="font-semibold text-gray-700 flex items-center gap-2">
              <FileText :size="20" class="text-green-600" />
              Job Type
            </label>
            <select
              name="type"
              id="type"
              v-model="formState.type"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            >
              <option disabled value="">Select a Job type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div>

          <!-- Job Listing -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="title" class="font-semibold text-gray-700 flex items-center gap-2">
              <Briefcase :size="20" class="text-green-600" />
              Job Listing Name
            </label>
            <input
              v-model="formState.title"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <!-- Description -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="description" class="font-semibold text-gray-700 flex items-center gap-2">
              <AlignLeft :size="20" class="text-green-600" />
              Description
            </label>
            <textarea
              v-model="formState.description"
              class="border border-gray-300 px-4 py-2.5 rounded-lg min-h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="text"
              id="description"
              name="description"
              placeholder="Add any job duties, expectations, requirements, etc"
              required
            />
          </div>

          <!-- Salary -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="salary" class="font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign :size="20" class="text-green-600" />
              Salary
            </label>
            <select
              name="salary"
              id="salary"
              v-model="formState.salary"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            >
              <option disabled value="">Select a Salary range</option>
              <option value="Under $50k">Under $50k</option>
              <option value="$50k-$60k">$50k-$60k</option>
              <option value="$60k-$70k">$60k-$70k</option>
              <option value="$70k-$80k">$70k-$80k</option>
              <option value="$80k-$90k">$80k-$90k</option>
              <option value="Above $90k">Above $90k</option>
            </select>
          </div>

          <!-- Location -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="location" class="font-semibold text-gray-700 flex items-center gap-2">
              <MapPin :size="20" class="text-green-600" />
              Location
            </label>
            <input
              v-model="formState.location"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="text"
              id="location"
              name="location"
              placeholder="e.g., San Antonio"
              required
            />
          </div>

          <div class="border-t border-gray-200 my-6"></div>

          <div class="flex items-center gap-2 mb-4">
            <Building2 :size="24" class="text-green-600" />
            <h2 class="text-xl font-bold text-gray-800">Company Information</h2>
          </div>

          <!-- Company Name -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="name" class="font-semibold text-gray-700 flex items-center gap-2">
              <Building2 :size="20" class="text-green-600" />
              Company Name
            </label>
            <input
              v-model="formState.company.name"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Alpha Elite"
              required
            />
          </div>

          <!-- Company Description -->
          <div class="flex flex-col justify-start space-y-2">
            <label
              for="company-description"
              class="font-semibold text-gray-700 flex items-center gap-2"
            >
              <Info :size="20" class="text-green-600" />
              Company Description
            </label>
            <textarea
              v-model="formState.company.description"
              class="border border-gray-300 px-4 py-2.5 rounded-lg min-h-28 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="text"
              id="company-description"
              name="company-description"
              placeholder="e.g., A leading technology company specializing in digital solutions..."
              required
            />
          </div>

          <!-- Company Email -->
          <div class="flex flex-col justify-start space-y-2">
            <label for="contactEmail" class="font-semibold text-gray-700 flex items-center gap-2">
              <Mail :size="20" class="text-green-600" />
              Contact Email
            </label>
            <input
              v-model="formState.company.contactEmail"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="email"
              id="contactEmail"
              name="contactEmail"
              placeholder="e.g., contact@company.com"
              required
            />
          </div>

          <!-- Company Phone -->
          <div class="flex flex-col justify-start space-y-2">
            <label
              for="contactPhone"
              class="font-semibold text-gray-700 flex items-center gap-2 outline-none"
            >
              <Phone :size="20" class="text-green-600" />
              Contact Phone
            </label>
            <input
              v-model="formState.company.contactPhone"
              class="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              type="tel"
              id="contactPhone"
              name="contactPhone"
              placeholder="e.g., 555-555-5555"
              required
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <RouterLink
              to="/"
              class="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Cancel
            </RouterLink>
            <button
              type="submit"
              :disabled="formState.isLoading"
              class="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Check v-if="!formState.isLoading" :size="20" />
              <span v-if="formState.isLoading">Editing...</span>
              <span v-else>Edit Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
