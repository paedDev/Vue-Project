<script setup>
import { Menu, Plus, X } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const isOpen = ref(false)

const toggleIsOpen = () => {
  isOpen.value = !isOpen.value
  console.log('isOpen:', isOpen.value)
}
</script>
<template>
  <div class="max-w-8xl mx-auto text-gray-600 bg-white shadow-lg mt-2">
    <div class="lg:p-6 p-4">
      <!-- Desktop Menu -->
      <div class="flex justify-between items-center">
        <RouterLink to="/" class="font-bold text-gray-800">Vue Jobs</RouterLink>

        <div class="md:flex md:items-center space-x-4 text-md hidden">
          <RouterLink
            to="/"
            class="px-4 py-2 hover:text-gray-800 rounded-xl cursor-pointer tion-all duration-500 relative group"
          >
            <span>Home</span>
            <div
              class="absolute h-0.5 w-0 left-0 bottom-0 bg-gray-600 group-hover:w-full transtion-all duration-500"
            ></div>
          </RouterLink>
          <RouterLink
            to="/jobs"
            class="px-4 py-2 hover:text-gray-800 rounded-xl cursor-pointer transition-all duration-500 relative group"
          >
            <span>Jobs</span>
            <div
              class="absolute h-0.5 w-0 left-0 bottom-0 bg-gray-600 group-hover:w-full transtion-all duration-500"
            ></div
          ></RouterLink>
          <RouterLink
            to="/jobs/add"
            class="flex items-center hover:text-gray-800 rounded-xl cursor-pointer transition-all duration-500 relative group"
          >
            <span>Add Jobs</span>
            <div
              class="absolute h-0.5 w-0 left-0 -bottom-2 bg-gray-600 group-hover:w-full transtion-all duration-500"
            />
          </RouterLink>
        </div>
        <button
          className="md:hidden block text-gray-600 hover:text-gray-800 transition-colors"
          @click="toggleIsOpen"
          aria-label="Toggle menu"
        >
          <X v-if="isOpen" :size="24" />
          <Menu v-else :size="24"></Menu>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        :class="[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0',
        ]"
      >
        <div class="flex flex-col space-y-2 pb-2 items-center">
          <a
            href="#"
            class="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-xl cursor-pointer transition-all duration-300 w-full text-center"
            @click="isOpen = false"
          >
            Home
          </a>
          <a
            href="#"
            class="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-xl cursor-pointer transition-all duration-300 w-full text-center"
            @click="isOpen = false"
          >
            Jobs
          </a>
          <a
            href="#"
            class="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-xl cursor-pointer transition-all duration-300 w-full text-center"
            @click="isOpen = false"
          >
            Add Job
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
