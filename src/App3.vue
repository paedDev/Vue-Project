<script setup>
import { onMounted, reactive, ref } from 'vue'

const newMovie = reactive({
  title: '',
  year: '',
})
const movies = ref([])
const addMovieTitle = () => {
  if (newMovie.title.trim() && newMovie.year.trim()) {
    movies.value.push({ ...newMovie })
    // clear inputs
    newMovie.title = ''
    newMovie.year = ''
  }
}
</script>

<template>
  <form @submit.prevent="addMovieTitle">
    <label for="title">Title</label>
    <input type="text" id="title" v-model="newMovie.title" />
    <br />
    <label for="year">Year</label>
    <input type="number" id="year" v-model="newMovie.year" />
    <br />
    <button type="submit">Submit Form</button>

    <h2>Movie List</h2>
    <ul>
      <li v-for="(movie, index) in movies" :key="index">{{ movie.title }} - {{ movie.year }}</li>
    </ul>
  </form>
</template>
