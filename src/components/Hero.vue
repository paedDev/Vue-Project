<script setup>
import { defineProps, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

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

onMounted(() => {
  // Create timeline for pin section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#pin',
      start: 'top top',

      scrub: 1,
      pin: true,
    },
  })

  // Animate the pin text scaling
  tl.fromTo(
    '#pin-text',
    {
      opacity: 1,
      scale: 1,
    },
    {
      scale: 20,
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
    },
  )

  // Animate the pin icon appearing
  tl.fromTo(
    '#pin-icon',
    {
      rotate: 45,
      opacity: 0,
      scale: 0,
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      ease: 'back.out(1.7)',
      duration: 0.8,
    },
    '-=0.3',
  )

  // Scale up the pin icon
  tl.to('#pin-icon', {
    scale: 20,
    opacity: 0,
    ease: 'power2.in',
    duration: 1,
  })

  // Change background color
  tl.fromTo(
    '#overlay',
    {
      background: 'linear-gradient(to bottom right, rgb(249, 250, 251), rgb(243, 244, 246))',
    },
    {
      background: 'linear-gradient(to bottom right, rgb(16, 185, 129), rgb(5, 150, 105))',
      duration: 0.5,
    },
    '-=0.5',
  )

  // Slide the overlay up to reveal the hero section
  tl.to('#overlay', {
    yPercent: -100,
    ease: 'power2.inOut',
    duration: 1,
    onComplete: () => {
      document.getElementById('overlay').style.pointerEvents = 'none'
    },
  })

  // Fade in the hero content
  tl.fromTo(
    '#hero-content',
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    },
    '-=0.5',
  )
})
</script>

<template>
  <section class="relative min-h-screen overflow-hidden" id="pin">
    <!-- Hero Section (Behind) -->
    <div
      class="py-20 px-4 bg-linear-to-br from-green-50 to-emerald-100 min-h-screen flex items-center justify-center"
    >
      <div id="hero-content" class="max-w-4xl mx-auto text-center opacity-0">
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          {{ title }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-700 mb-8">
          {{ subTitle }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/jobs"
            class="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            Browse Jobs
          </RouterLink>
          <RouterLink
            to="/jobs/add"
            class="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-green-600"
          >
            Post a Job
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Overlay that slides up -->
    <div
      id="overlay"
      class="absolute inset-0 z-50 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center">
        <!-- PIN Text that scales up -->
        <h1 id="pin-text" class="text-8xl md:text-9xl font-black text-gray-800 absolute">
          Vue Jobs
        </h1>

        <!-- Pin Icon SVG -->
        <svg
          id="pin-icon"
          class="absolute"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
            class="text-green-600"
          />
        </svg>
      </div>
    </div>
  </section>

  <!-- Additional Content -->
  <section class="py-20 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Us?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="p-8 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-gray-900">Top Companies</h3>
          <p class="text-gray-600 leading-relaxed">
            Connect with leading tech companies looking for talented Vue developers.
          </p>
        </div>
        <div
          class="p-8 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-gray-900">Remote Work</h3>
          <p class="text-gray-600 leading-relaxed">
            Find remote opportunities from anywhere in the world with flexible schedules.
          </p>
        </div>
        <div
          class="p-8 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-gray-900">Competitive Pay</h3>
          <p class="text-gray-600 leading-relaxed">
            Get paid what you deserve with transparent salary ranges and benefits.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="py-20 px-4 bg-gray-50">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-6">Ready to Start?</h2>
      <p class="text-xl text-gray-600 mb-8">
        Join thousands of Vue developers who have found their dream jobs through our platform.
      </p>
      <button
        class="px-10 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
      >
        Get Started Now
      </button>
    </div>
  </section>
</template>
