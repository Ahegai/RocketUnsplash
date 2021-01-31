<template>
  <div>
    <mansory
      v-if="!loading"
      :loading="loading"
      :photos="UNSPLASH.photosArray"
    />
    <loader v-else />
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Mansory from '../../components/Mansory.vue'
import Loader from '../../components/Loader'
export default {
  components: {
    Mansory,
    Loader
  },
  data() {
    return {
      input: {
        query: '',
        page: 1,
        per_page: 30
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      UNSPLASH: 'Unsplash/STATE'
    })
  },
  async created() {
    this.loading = true;
    this.input.query = this.$route.params.id;
    await this.searchPhotos(this.input);
    this.loading = false;
  },
  beforeDestroy() {
    this.fillEmpty('search');
  },
  methods: {
    ...mapActions({
      searchPhotos: 'Unsplash/searchPhotos',
      fillEmpty: 'Unsplash/setEmpty'
    })
  }
}
</script>