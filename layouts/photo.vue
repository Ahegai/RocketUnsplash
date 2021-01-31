<template>
  <v-app>
    <Header />
    <div style="height: 100%">
      <nuxt />
    </div>
  </v-app>
</template>
<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>
