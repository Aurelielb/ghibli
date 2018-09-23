<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title mb-0">{{character.name}}</h2>
          <p class="card-subtitle mt-1 text-muted">Character</p>
        </div>
        <div class="card-body">
          <p>Gender: {{character.gender}}</p>
          <p>Age: {{character.age}}</p>
          <p>Eye color: {{character.eye_color}}</p>
          <p>Hair color: {{character.hair_color}}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8 text-left">
      <movies-list v-if="showMember(character.films)" :films="character.films"></movies-list>
      <species-list v-if="showMember(character.species)" :species="character.species"></species-list>
    </div>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'
import SpeciesList from './SpeciesList'
import MoviesList from './MoviesList'

export default {
  name: 'PeopleDetail',
  props: {
    id: String
  },
  components: {
    MoviesList, SpeciesList
  },
  computed: {
    character () {
      const movies = this.$store.getters.getCharacterById(this.id)
      return movies.length ? movies[0] : {}
    }
  },
  mixins: [commonFnct],
  methods: {
  },
  created () {
    this.$store.dispatch('fetchData', { id: this.id, type: 'people' })
  }
}
</script>
