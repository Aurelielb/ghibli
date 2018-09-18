import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getOptions = () => {
  const httpHeaders = { 'Content-Type': 'application/json' }
  const headers = new Headers(httpHeaders)
  return {
    method: 'GET',
    headers
  }
}

export default new Vuex.Store({
  state: {
    movieList: [],
    baseURL: 'https://ghibliapi.herokuapp.com'
  },
  getters: {
    getMovieById: state => id => {
      let movies = state.movieList.filter(movie => {
        return movie.id === id
      })
      return movies
    }
  },
  actions: {
    fetchAllMovies: ({state}) => {
      const options = getOptions()
      fetch(state.baseURL + '/films', options)
        .then(data => data.json())
        .then(json => {
          state.movieList = json
        })
        .catch(error => console.log(error))
    },
    fetchMovie: ({state, getters}, {id}) => {
      let movies = getters.getMovieById(id)
      if (movies.length === 0) {
        const options = getOptions()
        fetch(state.baseURL + '/films/' + id, options)
          .then(data => data.json())
          .then(json => {
            state.movieList.push(json)
          })
          .catch(error => console.log(error))
      }
    }

  }
})
