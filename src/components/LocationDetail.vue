<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title mb-0">{{location.name}}</h2>
          <p class="card-subtitle mt-1 text-muted">Location</p>
        </div>
        <div class="card-body">
          <p>Climate: {{location.climate}}</p>
          <p>Terrain: {{location.terrain}}</p>
          <p>Surface water: {{location.surface_water}}</p>
          <p>Rt score: {{location.rt_score}}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8 text-left">
      <p>{{location.description}}</p>
      <movies-list v-if="showMember(location.films)" :films="location.films"></movies-list>
      <people-list v-if="showMember(location.residents)" :people="location.residents"></people-list>
    </div>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'
import MoviesList from './MoviesList'
import PeopleList from './PeopleList'

export default {
  name: 'LocationDetail',
  props: {
    id: String
  },
  components: {
    MoviesList, PeopleList
  },
  computed: {
    location () {
      const locations = this.$store.getters.getLocationById(this.id)
      return locations.length ? locations[0] : {}
    }
  },
  mixins: [commonFnct],
  methods: {
  },
  created () {
    this.$store.dispatch('fetchData', { id: this.id, type: 'locations' })
  }
}
</script>
