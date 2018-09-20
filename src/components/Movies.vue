<template>
  <div>
    <h2 class="py-3">Les films</h2>
    <ul class="row list-unstyled">
      <li class="col-3"
        v-for="movie in movieList" :key="movie.id">
        <div class="card mb-3">
          <img class="card-img-top" src="/static/images/ghibli.jpg" alt="Ghibli">
          <div class="card-body">
          <h3 class="card-title">{{movie.title}}</h3>
          <p class="card-text">{{movie.description | excerpt}}</p>
          <router-link class="card-link"
            :to="getMovieDetailLink(movie.id)">View more</router-link>
          </div>
        </div>
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
