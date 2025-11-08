<script setup>
import { defineProps, ref, computed } from 'vue'
import { MapPin } from 'lucide-vue-next'
const props = defineProps({
  job: Object,
})

const showFullDescription = ref(false)
const truncatedDescription = computed(() => {
  let description = props.job.description
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...'
  }
  return description
})
const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}
</script>

<template>
  <div class="shadow py-10 px-4 rounded-xl space-y-2 h-full bg-white">
    <div className="mb-3">
      <span
        className="inline-block text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
      >
        {{ job.type }}
      </span>
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{{ job.title }}</h2>

    <div className="text-gray-600 text-sm mb-4 ">
      <div>
        {{ truncatedDescription }}
        <button @click="toggleFullDescription" class="text-green-500 hover:text-green-600 mb-5">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-green-600 font-semibold text-sm">{{ job.salary }}</p>
    </div>
    <div className="border-t border-gray-200 my-4"></div>
    <div class="flex lg:flex-row flex-col lg:items-center justify-between">
      <div class="flex-1 min-w-0 lg:mb-0 mb-4">
        <div class="text-orange-700 font-medium text-sm flex items-center">
          <MapPin size="16" class="mr-1" />
          {{ job.location }}
        </div>
      </div>
      <RouterLink
        :to="'/jobs/' + job.id"
        class="text-center bg-green-600 px-4 py-2 rounded-xl text-white text-sm"
      >
        Read More
      </RouterLink>
    </div>
  </div>
</template>
