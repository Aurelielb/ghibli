import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Locations from '@/components/Locations'
import People from '@/components/People'
import Vehicles from '@/components/Vehicles'
import MovieDetail from '@/components/MovieDetail'
import PeopleDetail from '@/components/PeopleDetail'
import LocationDetail from '@/components/LocationDetail'
import VehicleDetail from '@/components/VehicleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/locations/',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/people/',
      name: 'People',
      component: People
    },
    {
      path: '/vehicles/',
      name: 'Vehicles',
      component: Vehicles
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/people/:id',
      name: 'PeopleDetail',
      component: PeopleDetail,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/location/:id',
      name: 'LocationDetail',
      component: LocationDetail,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/vehicle/:id',
      name: 'VehicleDetail',
      component: VehicleDetail,
      props: (route) => ({ id: route.params.id })
    }
  ]
})
