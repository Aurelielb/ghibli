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
    baseURL: 'https://ghibliapi.herokuapp.com',
    characterList: [],
    movieList: []
  },
  getters: {
    getMovieById: state => id => {
      let movies = state.movieList.filter(movie => {
        return movie.id === id
      })
      return movies
    },
    getCharacterById: state => id => {
      let movies = state.characterList.filter(movie => {
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
    fetchMovie: ({ state, getters, dispatch }, { id }) => {
      let movies = getters.getMovieById(id)
      if (movies.length === 0) {
        const options = getOptions()
        fetch(state.baseURL + '/films/' + id, options)
          .then(data => data.json())
          .then(json => {
            state.movieList.push(json)
            dispatch('fetchMovieResources', { movie: json })
          })
          .catch(error => console.log(error))
      } else {
        dispatch('fetchMovieResources', { movie: movies[0] })
      }
    },
    fetchMovieResources: ({ state, getters }, { movie }) => {
      for (let char of movie.people) {
        let id = char.substr(char.lastIndexOf('/') + 1)
        let character = getters.getCharacterById(id)
        if (character.length === 0) {
          let url = state.baseURL + '/people/' + encodeURI(id)
          const options = getOptions()
          fetch(url, options)
            .then(data => data.json())
            .then(json => {
              state.characterList.push(json)
            })
            .catch(error => console.log(error))
        }
      }
    }

  }
})
