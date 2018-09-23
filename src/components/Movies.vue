<template>
  <div>
    <div class="row">
      <h2 class="col col-md-auto py-3">Movies</h2>
      <span class="col d-flex align-items-center">
        <button @click="setOrder()" class="btn btn-sm">Order</button>
      </span>
    </div>
    <ul class="row list-unstyled">
      <li class="col-3 d-flex"
        v-for="movie in movieList" :key="movie.id">
        <div class="card mb-3"
          @click="gotoMovie(movie.id)">
          <img class="card-img-top" src="/static/images/ghibli-rect.jpg" alt="Ghibli">
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
import mainLists from './mixins/commonHomes'

export default {
  name: 'Movies',
  data () {
    return {
      order: null
    }
  },
  mixins: [mainLists],
  computed: {
    movieList () {
      if (this.order !== null) {
        return this.sortedList()
      }
      return this.$store.state.movieList
    }
  },
  methods: {
    getMovieDetailLink: (id) => {
      return '/movie/' + id
    },
    gotoMovie: function (movieId) {
      if (typeof movieId !== 'string') {
        return false
      }
      return this.$router.push(this.getMovieDetailLink(movieId))
    },
    setOrder: function () {
      if (this.order === null || this.order < 0) {
        this.order = 1
      } else {
        this.order = -1
      }
    },
    sortedList: function () {
      let movieList = [...this.$store.state.movieList]
      return movieList.sort((a, b) => {
        let titleA = a.title.toLowerCase()
        let titleB = b.title.toLowerCase()
        if (titleA > titleB) {
          return 1 * this.order
        }
        if (titleA < titleB) {
          return -1 * this.order
        }
        return 0
      })
    }
  },
  created () {
    this.$store.dispatch('fetchAllMovies')
  },
  filters: {
    excerpt: (text) => {
      const excerptLimit = 150
      const arrayText = text.split(' ')
      const reducedText = arrayText.reduce(function (total, current) {
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
