<script setup>
import { ref } from 'vue'

const name = 'John Doe'
const status = 'active'
const tasks = ['Task 1', 'Task 2', 'task 3']
</script>

<template>
  <h1>{{ name }}</h1>
  <p>User is {{ status }}</p>
  <ul>
    <li v-for="task in tasks" :key="task">
      {{ task }}
    </li>
  </ul>
</template>
