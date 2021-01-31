<template>
  <div>
    <div v-if="!loading">
      <photo :image="UNSPLASH.photo" />
      <div class="similar_container mt-12">
        <h1 class="mb-8">
          Похожие фотографии
        </h1>
        <mansory :photos="UNSPLASH.photosArray" />
        <loader v-if="other" />
        <v-card
          v-if="next"
          v-intersect.quiet="scroll"
          style="height: 10px"
          flat
        />
      </div>
    </div>
    <loader v-else />
  </div>
</template>
<script>
import Photo from '../../components/Photo'
import Loader from '../../components/Loader'
import Mansory from '../../components/Mansory.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Photo,
    Loader,
    Mansory
  },
  layout: 'photo',
  data() {
    return {
      loading: true,
      input: {
        query: '',
        page: 1,
        per_page: 30
      },
      other: false,
      next: true
    }
  },
  computed: {
    ...mapGetters({
      UNSPLASH: 'Unsplash/STATE'
    })
  },
  async created() {
    this.loading = true;
    await this.getPhoto(this.$route.params.id);
    const tagsArray = this.UNSPLASH.photo.tags.map(function (x) {
      return x.title;
    })
    this.input.query = tagsArray.join(' ').toString();
    await this.searchPhotos(this.input);
    this.$nuxt.$on('finishLoading', this.finish)
    this.loading = false;
  },
  beforeDestroy() {
    this.fillEmpty('search');
  },
  methods: {
    ...mapActions({
      getPhoto: 'Unsplash/getPhoto',
      searchPhotos: 'Unsplash/searchPhotos',
      fillEmpty: 'Unsplash/setEmpty'
    }),
    finish() {
      this.next = true;
      this.other = false;
    },
    async scroll() {
      this.next = false;
      this.other = true;
      this.input.page++;
      await this.searchPhotos(this.input)
      setTimeout(this.finish(), 3000)
    }
  }
}
</script>
<style lang="scss">
  .similar_container {
    width: 80%;
    margin: 0 auto;
  }
</style>