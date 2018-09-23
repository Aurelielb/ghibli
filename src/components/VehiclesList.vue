<template>
  <div>
    <h3>Vehicles</h3>
    <ul class="list-unstyled row">
      <li class="list-item col-3"
        v-for="vehicle in vehicles" :key="vehicle"
        v-if="getVehicle(vehicle)">
        <router-link
          :to="getUrl('vehicles', getVehicle(vehicle).id)">{{getVehicle(vehicle).name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'

export default {
  name: 'VehiclesList',
  props: {
    vehicles: {
      type: Array,
      required: true
    }
  },
  mixins: [commonFnct],
  methods: {
    getVehicle: function (url) {
      if (!url) {
        return {}
      }
      let vehicle = this.$store.getters.getVehicleById(this.getId(url))
      return vehicle[0]
    }
  }
}
</script>
