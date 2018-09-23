<template>
  <div id="app">
    <nav class="navbar navbar-light navbar-expand bg-light">
      <div class="container">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="$route.path == '/' ? 'active' : ''">
            <router-link class="nav-link" to="/">Movies</router-link>
          </li>
          <li class="nav-item" :class="$route.path == '/people/' ? 'active' : ''">
            <router-link class="nav-link" to="/people/">People</router-link>
          </li>
          <li class="nav-item" :class="$route.path == '/locations/' ? 'active' : ''">
            <router-link class="nav-link" to="/locations/">Locations</router-link>
          </li>
          <li class="nav-item" :class="$route.path == '/vehicles/' ? 'active' : ''">
            <router-link class="nav-link" to="/vehicles/">Vehicles</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <h1 class="mt-3 mb-5 text-center">Ghibli's library</h1>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
