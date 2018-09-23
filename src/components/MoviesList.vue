<template>
  <div>
    <h3 class="mb-3">Movies</h3>
    <ul class="list-unstyled row">
      <li class="list-item col-3"
        v-for="movie in checkedMovies" :key="movie"
        v-if="getMovie(movie)">
        <router-link
          :to="getUrl('movie', getMovie(movie).id)">{{getMovie(movie).title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'

export default {
  name: 'MoviesList',
  props: {
    films: {
      type: Array | String,
      required: true
    }
  },
  mixins: [commonFnct],
  computed: {
    checkedMovies: function () {
      if (typeof this.films === 'string') {
        return [this.films]
      }
      return this.films
    }
  },
  methods: {
    getMovie: function (url) {
      if (!url) {
        return {}
      }
      let movie = this.$store.getters.getMovieById(this.getId(url))
      return movie[0]
    }
  }
}
</script>
