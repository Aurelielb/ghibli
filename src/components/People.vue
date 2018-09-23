<template>
  <div>
    <div class="row">
      <h2 class="col col-md-auto py-3">People</h2>
      <span class="col d-flex align-items-center">
        <button @click="setOrder()" class="btn btn-sm">Order</button>
      </span>
    </div>
    <ul class="row list-unstyled">
      <li class="col-3 d-flex"
        v-for="people in peopleList" :key="people.id">
        <div class="card mb-3"
          @click="gotoPerson(people.id)">
          <img class="card-img-top" src="/static/images/ghibli-rect.jpg" alt="Ghibli">
          <div class="card-body">
          <h3 class="card-title">{{people.name}}</h3>
          <router-link class="card-link"
            :to="getPeopleDetailLink(people.id)">View more</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mainLists from './mixins/commonHomes'

export default {
  name: 'People',
  mixins: [mainLists],
  computed: {
    peopleList () {
      if (this.order !== null) {
        return this.sortedList(this.$store.state.peopleList)
      }
      return this.$store.state.peopleList
    }
  },
  methods: {
    getPeopleDetailLink: (id) => {
      return '/people/' + id
    },
    gotoPerson: function (personId) {
      if (typeof personId !== 'string') {
        return false
      }
      return this.$router.push(this.getPeopleDetailLink(personId))
    }
  },
  created () {
    this.$store.dispatch('fetchAllPeople')
  }
}
</script>

<style>
</style>
