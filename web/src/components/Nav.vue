<template>
  <nav class="navbar navbar-expand-lg bg-white sticky-top">
    <a href="#" class="navbar-brand">
  	  <img src="assets/images/logo.png" height="28" alt="Forest Love">
    </a>
    <router-link 
      v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`"
      class="nav-link">
        {{routes.text}}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/'
        },
        {
          id: 1,
          text: 'About',
          page:'/about'
        }
      ]
    }
  }
}
</script>