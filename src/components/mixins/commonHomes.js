export default {
  data: function () {
    return {
      order: null
    }
  },
  methods: {
    setOrder: function () {
      if (this.order === null || this.order < 0) {
        // sort ascending
        this.order = 1
      } else {
        // sort descending
        this.order = -1
      }
    },
    sortedList: function (list) {
      let newList = [...list]
      return newList.sort((a, b) => {
        let titleA = a.title.toLowerCase()
        let titleB = b.title.toLowerCase()
        if (titleA > titleB) {
          return 1 * this.order
        }
        if (titleA < titleB) {
          return -1 * this.order
        }
        return 0
      })
    }
  }
}
