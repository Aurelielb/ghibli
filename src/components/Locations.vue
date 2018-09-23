<template>
  <div>
    <div class="row">
      <h2 class="col col-md-auto py-3">Locations</h2>
      <span class="col d-flex align-items-center">
        <button @click="setOrder()" class="btn btn-sm">Order</button>
      </span>
    </div>
    <ul class="row list-unstyled">
      <li class="col-3 d-flex"
        v-for="location in locationsList" :key="location.id">
        <div class="card mb-3"
          @click="gotoLocation(location.id)">
          <img class="card-img-top" src="/static/images/ghibli-rect.jpg" alt="Ghibli">
          <div class="card-body">
          <h3 class="card-title">{{location.name}}</h3>
          <router-link class="card-link"
            :to="getLocationDetailLink(location.id)">View more</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mainLists from './mixins/commonHomes'

export default {
  name: 'Locations',
  mixins: [mainLists],
  computed: {
    locationsList () {
      if (this.order !== null) {
        return this.sortedList(this.$store.state.locationsList)
      }
      return this.$store.state.locationsList
    }
  },
  methods: {
    getLocationDetailLink: (id) => {
      return '/location/' + id
    },
    gotoLocation: function (locationId) {
      if (typeof locationId !== 'string') {
        return false
      }
      this.$router.push(this.getLocationDetailLink(locationId))
    }
  },
  created () {
    this.$store.dispatch('fetchAllLocations')
  }
}
</script>
