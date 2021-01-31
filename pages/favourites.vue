<template>
  <div>
    <mansory :photos="UNSPLASH.likeList" />
  </div>
</template>
<script>
import Mansory from '../components/Mansory.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    Mansory
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      UNSPLASH: 'Unsplash/STATE'
    })
  },
  created() {
    this.$nuxt.$on('loadingDone', this.finish)
  }
}
</script>