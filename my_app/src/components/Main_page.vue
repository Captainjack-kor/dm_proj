/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <Header />
  </div>

   <!-- <v-text-field
    label="Outlined"
    outlined
  ></v-text-field> -->
</template>

<script>
import Header from '../components/Header_part.vue'
export default {
  name: 'Main_page',
  components: {
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
