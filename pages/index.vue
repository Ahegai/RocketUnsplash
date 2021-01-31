<template>
  <div>
    <mansory
      :photos="UNSPLASH.randomArray"
      @finishLoading="finish"
    />
    <loader v-if="loading" />
    <v-card style="height: 10px" flat v-if="next" v-intersect.quiet="scroll"></v-card>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Mansory from '../components/Mansory.vue'
import Loader from '../components/Loader'
export default {
  components: {
    Mansory,
    Loader
  },
  data() {
    return {
      loading: false,
      next: false
    }
  },
  computed: {
    ...mapGetters({
      UNSPLASH: 'Unsplash/STATE'
    })
  },
  async created() {
    this.loading = true;
    await this.getRandom();
    this.loading = false;
    this.next = true;
    this.$nuxt.$on('finishLoading', this.finish)
  },
  beforeDestroy () {
    this.fillEmpty('EMPTY_STOCK')
  },
  methods: {
    ...mapActions({
      getRandom: 'Unsplash/getRandomPhoto',
      getNext: 'Unsplash/getNexPhotos',
      fillEmpty: 'Unsplash/setEmpty'
    }),
    finish() {
      this.next = true;
      this.loading = false;
    },
    async scroll() {
      this.next = false;
      this.loading = true;
      await this.getNext()
      setTimeout(this.finish(), 3000)
    },
  }
}
</script>
