<template>
  <div>
    <h2>{{movie.title}}</h2>
    <div class="text-left">
      <p>{{movie.description}}</p>
      <p>Director: {{movie.director}}</p>
      <p>Producer: {{movie.producer}}</p>
      <p>Release date: {{movie.release_date}}</p>
      <p>Rt score: {{movie.rt_score}}</p>
      <h3>People</h3>
      <p>{{movie.people}}</p>
      <h3>Species</h3>
      <p>{{movie.species}}</p>
      <h3>Locations</h3>
      <p>{{movie.locations}}</p>
      <h3>Vehicles</h3>
      <p>{{movie.vehicles}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  computed: {
    movie () {
      const movies = this.$store.getters.getMovieById(this.$route.params.id)
      return movies.length ? movies[0] : {}
    }
  },
  created () {
    this.$store.dispatch('fetchMovie', {id: this.$route.params.id})
  }
}
</script>
