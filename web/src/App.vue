<template>
  <div id="app" class="container">
  	<navigation></navigation>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script>
import Nav from './components/Nav';
export default {
  name: 'app',
  components: {
    'navigation': Nav
  }
}
</script>