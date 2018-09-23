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
    peopleList: [],
    movieList: [],
    speciesList: [],
    locationsList: [],
    vehiclesList: []
  },
  getters: {
    getMovieById: state => id => {
      if (!id) {
        return []
      }
      let movies = state.movieList.filter(movie => {
        return movie.id === id
      })
      return movies
    },
    getCharacterById: state => id => {
      if (!id) {
        return []
      }
      let people = state.peopleList.filter(character => {
        return character.id === id
      })
      return people
    },
    getSpeciesById: state => id => {
      if (!id) {
        return []
      }
      let species = state.speciesList.filter(species => {
        return species.id === id
      })
      return species
    },
    getLocationById: state => id => {
      if (!id) {
        return []
      }
      let locations = state.locationsList.filter(location => {
        return location.id === id
      })
      return locations
    },
    getVehicleById: state => id => {
      if (!id) {
        return []
      }
      let vehicles = state.vehiclesList.filter(vehicle => {
        return vehicle.id === id
      })
      return vehicles
    },
    getAssetsByTypes: (state, getters) => (type, id) => {
      let datas, listName
      switch (type) {
        case 'films':
          datas = getters.getMovieById(id)
          listName = 'movieList'
          break
        case 'people':
          datas = getters.getCharacterById(id)
          listName = 'peopleList'
          break
        case 'locations':
          datas = getters.getLocationById(id)
          listName = 'locationsList'
          break
        case 'vehicles':
          datas = getters.getVehicleById(id)
          listName = 'vehiclesList'
          break
        default:
          console.log('assets not implemented:' + type)
          break
      }
      return { datas, listName }
    }
  },
  actions: {
    fetchAllMovies: ({ state, dispatch }) => {
      dispatch('fetchAllByType', { type: 'films', list: 'movieList' })
    },
    fetchAllPeople: ({ state, dispatch }) => {
      dispatch('fetchAllByType', { type: 'people', list: 'peopleList' })
    },
    fetchAllLocations: ({ state, dispatch }) => {
      dispatch('fetchAllByType', { type: 'locations', list: 'locationsList' })
    },
    fetchAllVehicles: ({ state, dispatch }) => {
      dispatch('fetchAllByType', { type: 'vehicles', list: 'vehiclesList' })
    },
    fetchAllByType: ({ state }, {type, list}) => {
      const options = getOptions()
      fetch(`${state.baseURL}/${type}`, options)
        .then(data => data.json())
        .then(json => {
          state[list] = json
        })
        .catch(error => console.log(error))
    },
    fetchData: ({ state, getters, dispatch }, { id, type }) => {
      let { datas, listName } = getters.getAssetsByTypes(type, id)
      if (datas.length > 0) {
        dispatch('getResources', { item: datas[0] })
      } else {
        const options = getOptions()
        fetch(`${state.baseURL}/${type}/${id}`, options)
          .then(data => data.json())
          .then(json => {
            state[listName].push(json)
            dispatch('getResources', { item: json })
          })
          .catch(error => console.log(error))
      }
    },
    getResources: ({ dispatch, getters }, { item }) => {
      if (!item) {
        return
      }
      dispatch('fetchResources', { datas: item.films, field: 'movie', getter: getters.getMovieById })
      dispatch('fetchResources', { datas: item.people, field: 'people', getter: getters.getCharacterById })
      dispatch('fetchResources', { datas: item.pilot, field: 'people', getter: getters.getCharacterById })
      dispatch('fetchResources', { datas: item.residents, field: 'people', getter: getters.getCharacterById })
      dispatch('fetchResources', { datas: item.species, field: 'species', getter: getters.getSpeciesById })
      dispatch('fetchResources', { datas: item.locations, field: 'locations', getter: getters.getLocationById })
      dispatch('fetchResources', { datas: item.vehicles, field: 'vehicles', getter: getters.getVehicleById })
    },
    fetchResources: ({ state }, { datas, field, getter }) => {
      if (typeof datas === 'string') {
        datas = [datas]
      } else if (typeof datas !== 'object') {
        return
      }

      for (let url of datas) {
        let id = url.substr(url.lastIndexOf('/') + 1)
        if (id === '') return

        let member = getter(id)
        if (member.length === 0) {
          const options = getOptions()
          fetch(url, options)
            .then(data => data.json())
            .then(json => {
              state[`${field}List`].push(json)
            })
            .catch(error => console.log(error))
        }
      }
    }
  }
})
