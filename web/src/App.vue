<template>
  <div id="app" class="container">
  	<navigation></navigation>
    <router-view/>
  </div>
</template>

<style>
/*@import url(http://webfonts-plus.herokuapp.com?family=Graphik);*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
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