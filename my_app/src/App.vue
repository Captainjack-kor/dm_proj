<template>
  <v-app>

    <v-main>
      <Main_page/>
    </v-main>
  </v-app>
</template>

<script>
import Main_page from './components/Main_page';

export default {
  name: 'App',

  components: {
    Main_page,
  },

  data: () => ({
    //
  }),
};
</script>
