<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title mb-0">{{movie.title}}</h2>
          <p class="card-subtitle mt-1 text-muted">Movie</p>
        </div>
        <div class="card-body">
          <p>Director: {{movie.director}}</p>
          <p>Producer: {{movie.producer}}</p>
          <p>Release date: {{movie.release_date}}</p>
          <p>Rt score: {{movie.rt_score}}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8 text-left">
      <p>{{movie.description}}</p>
      <people-list v-if="showMember(movie.people)" :people="movie.people"></people-list>
      <locations-list v-if="showMember(movie.locations)" :locations="movie.locations"></locations-list>
      <vehicles-list v-if="showMember(movie.vehicles)" :vehicles="movie.vehicles"></vehicles-list>
      <species-list v-if="showMember(movie.species)" :species="movie.species"></species-list>
    </div>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'
import PeopleList from './PeopleList'
import LocationsList from './LocationsList'
import VehiclesList from './VehiclesList'
import SpeciesList from './SpeciesList'

export default {
  name: 'MovieDetail',
  props: {
    id: String
  },
  components: {
    PeopleList, LocationsList, VehiclesList, SpeciesList
  },
  computed: {
    movie () {
      const movies = this.$store.getters.getMovieById(this.id)
      return movies.length ? movies[0] : {}
    }
  },
  mixins: [commonFnct],
  methods: {
  },
  created () {
    this.$store.dispatch('fetchData', { id: this.id, type: 'films' })
  }
}
</script>
