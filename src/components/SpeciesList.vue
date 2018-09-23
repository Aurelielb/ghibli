<template>
  <div>
    <h3>Species</h3>
    <ul class="list-unstyled row">
      <li class="list-item col-3"
        v-for="member in checkedSpecies" :key="member"
        v-if="getSpecies(member)">
        {{getSpecies(member).name}}
      </li>
    </ul>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'

export default {
  name: 'SpeciesList',
  props: {
    species: {
      type: Array | String,
      required: true
    }
  },
  mixins: [commonFnct],
  computed: {
    checkedSpecies: function () {
      if (typeof this.species === 'string') {
        return [this.species]
      }
      return this.species
    }
  },
  methods: {
    getSpecies: function (url) {
      if (!url) {
        return {}
      }
      let species = this.$store.getters.getSpeciesById(this.getId(url))
      return species[0]
    }
  }
}
</script>
