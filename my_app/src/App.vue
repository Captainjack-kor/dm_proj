<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Main_page />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Main_page from './components/Main_page.vue'

export default {
  name: 'App',
  components: {
    Main_page
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
