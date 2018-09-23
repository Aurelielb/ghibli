<template>
  <div>
    <div class="row">
      <h2 class="col col-md-auto py-3">Vehicles</h2>
      <span class="col d-flex align-items-center">
        <button @click="setOrder()" class="btn btn-sm">Order</button>
      </span>
    </div>
    <ul class="row list-unstyled">
      <li class="col-3 d-flex"
        v-for="vehicle in vehicleList" :key="vehicle.id">
        <div class="card mb-3"
          @click="gotoVehicle(vehicle.id)">
          <img class="card-img-top" src="/static/images/ghibli-rect.jpg" alt="Ghibli">
          <div class="card-body">
          <h3 class="card-title">{{vehicle.name}}</h3>
          <router-link class="card-link"
            :to="getVehiclesDetailLink(vehicle.id)">View more</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mainLists from './mixins/commonHomes'

export default {
  name: 'Vehicles',
  mixins: [mainLists],
  computed: {
    vehicleList () {
      if (this.order !== null) {
        return this.sortedList(this.$store.state.vehiclesList)
      }
      return this.$store.state.vehiclesList
    }
  },
  methods: {
    getVehiclesDetailLink: (id) => {
      return '/vehicle/' + id
    },
    gotoVehicle: function (vehicleId) {
      if (typeof vehicleId !== 'string') {
        return false
      }
      return this.$router.push(this.getVehiclesDetailLink(vehicleId))
    }
  },
  created () {
    this.$store.dispatch('fetchAllVehicles')
  }
}
</script>

<style>
</style>
