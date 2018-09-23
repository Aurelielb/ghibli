<template>
  <div>
    <h3 class="mb-3" v-if="people">People</h3>
    <ul class="list-unstyled row">
      <li class="list-item col-3"
        v-for="person in checkedPeople" :key="person"
        v-if="getCharacter(person)">
        <router-link
          :to="getUrl('people', getCharacter(person).id)">{{getCharacter(person).name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import commonFnct from './mixins/commonFnct'

export default {
  name: 'PeopleList',
  props: {
    people: {
      type: Array | String,
      required: true
    }
  },
  mixins: [commonFnct],
  computed: {
    checkedPeople: function () {
      if (typeof this.people === 'string') {
        return [this.people]
      }
      return this.people
    }
  },
  methods: {
    getCharacter: function (url) {
      if (!url) {
        return {}
      }
      let person = this.$store.getters.getCharacterById(this.getId(url))
      return person[0]
    }
  }
}
</script>
