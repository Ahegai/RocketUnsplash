<template>
  <v-app>
    <Header />
    <div class="content-wrapper pt-12">
      <nuxt />
    </div>
    <div
      class="scroll_top"
      @click="scrollTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </div>
  </v-app>
</template>
<script>
import Header from '../components/Header'
import { mapActions } from 'vuex'
export default {
  components: {
    Header
  },
  data () {
    return {
      loading: false,
      input: {
        username: 'Ahegai',
        page: 1
      }
    }
  },
  async created() {
    this.loading = true;
    await this.getLikeList(this.input);
    this.loading = false;
  },
  mounted() {
    this.$nuxt.$on('updateLikes', () => {
      this.getLikeList(this.input);
    })
  },
  methods: {
    ...mapActions({
      getLikeList: 'Unsplash/getListLiked'
    }),
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>
<style lang="scss">
  .content-wrapper {
    width: 80%;
    margin: 0 auto;
    @media screen and (max-width: 800px) {
      width: 90%;
    }
  }
  .scroll_top {
    display: flex;
    justify-content: center;
    align-content: center;
    position: fixed;
    bottom: 20px;
    right: 4%;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: .3s ease-in-out;
    background-color: white;
  }
  .scroll_top:hover {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.3);
  }
</style>