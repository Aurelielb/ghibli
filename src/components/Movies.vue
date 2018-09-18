<template>
  <div>
    <h2 class="py-3">Les films</h2>
    <ul class="row list-unstyled">
      <li class="col-3"
        v-for="movie in movieList" :key="movie.id">
        <h3>{{movie.title}}</h3>
        <p>{{movie.description | excerpt}}</p>
        <router-link :to="getMovieDetailLink(movie.id)">View more</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Movies',
  data () {
    return {
    }
  },
  computed: {
    movieList () {
      return this.$store.state.movieList
    }
  },
  methods: {
    getMovieDetailLink: (id) => {
      return '/movie/' + id
    }
  },
  created () {
    this.$store.dispatch('fetchAllMovies')
  },
  filters: {
    excerpt: (text) => {
      const excerptLimit = 150
      const arrayText = text.split(' ')
      const reducedText = arrayText.reduce(function (total, current, idx) {
        if (total && total.length < excerptLimit) {
          return total + ' ' + current
        } else {
          return total
        }
      })
      return reducedText + '...'
    }
  }
}
</script>

<style>
</style>
