<template>
  <div>
    <h3>Locations</h3>
    <ul class="list-unstyled row">
      <li class="list-item col-3"
        v-for="location in locations" :key="location"
        v-if="getLocation(location)">
        <router-link
          :to="getUrl('location', getLocation(location).id)">{{getLocation(location).name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'

export default {
  name: 'LocationsList',
  props: {
    locations: {
      type: Array,
      required: true
    }
  },
  mixins: [commonFnct],
  methods: {
    getLocation: function (url) {
      if (!url) {
        return {}
      }
      let location = this.$store.getters.getLocationById(this.getId(url))
      return location[0]
    }
  }
}
</script>
