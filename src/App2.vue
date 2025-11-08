<script setup>
import { onMounted, reactive, ref } from 'vue'

const name = ref('John Doe')
const status = ref('active')
const newTask = ref('')
const tasks = ref(['Task 1', 'Task 2', 'task 3'])

const toggleStatus = () => {
  if (status.value === 'active') {
    status.value = 'pending'
  } else if (status.value === 'pending') {
    status.value = 'inactive'
  } else {
    status.value = 'active'
  }
}

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}
const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}
onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    tasks.value = data.map((task) => task.title)
  } catch (error) {
    console.log(`Error fetching tasks `, error)
  }
})
</script>

<template>
  <h1>{{ name }}</h1>
  <p>User is {{ status }}</p>

  <form @submit.prevent="addTask">
    <label for="newTask"> Add new Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  <button @click="toggleStatus">Change Status</button>
</template>
