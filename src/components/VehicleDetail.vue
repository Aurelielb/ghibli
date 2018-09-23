<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title mb-0">{{vehicle.name}}</h2>
          <p class="card-subtitle mt-1 text-muted">Vehicle</p>
        </div>
        <div class="card-body">
          <p>{{vehicle.description}}</p>
          <p>Vehicle class: {{vehicle.vehicle_class}}</p>
          <p>Length: {{vehicle['length']}}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8 text-left">
      <people-list v-if="showMember(vehicle.pilot)" :people="vehicle.pilot"></people-list>
      <movies-list v-if="showMember(vehicle.films)" :films="vehicle.films"></movies-list>
    </div>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'
import PeopleList from './PeopleList'
import MoviesList from './MoviesList'

export default {
  name: 'VehicleDetail',
  props: {
    id: String
  },
  components: {
    MoviesList, PeopleList
  },
  computed: {
    vehicle () {
      const vehicles = this.$store.getters.getVehicleById(this.id)
      return vehicles.length ? vehicles[0] : {}
    }
  },
  mixins: [commonFnct],
  methods: {
  },
  created () {
    this.$store.dispatch('fetchData', { id: this.id, type: 'vehicles' })
  }
}
</script>
