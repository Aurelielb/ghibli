export default {
  methods: {
    showMember: function (member) {
      if (typeof member === 'string') {
        return this.getId(member) !== ''
      }
      if (member.length === 1) {
        return this.getId(member[0]) !== ''
      }
      if (member.length > 1) {
        return true
      }
      return false
    },
    getId: function (url) {
      if (typeof url !== 'string') {
        return ''
      }
      return url.substr(url.lastIndexOf('/') + 1)
    },
    getUrl: function (type, id) {
      if (typeof type !== 'string' || typeof id !== 'string') {
        return '/'
      }
      return `/${type}/${id}`
    }
  }
}
