<template>
  <div style="width: 100%">
    <masonry :cols="{default: 3, 700: 1}" :gutter="16">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="grid-item elevation-4 mb-4"
      >
        <div class="grid-item_hover">
          <div
            :style="'background-image: url(' + photo.user.profile_image.medium + ');'"
            class="grid-item_hover--image"
          />
          <h4>
            {{ photo.user.name }}
          </h4>
          <h5>@{{ photo.user.username }}</h5>
          <div class="d-flex mt-12">
            <v-hover v-slot="{ hover }">
              <v-btn
                icon
                @click="likeOrDislike({status: photo.liked_by_user, id: photo.id})"
              >
                <v-icon :size="hover ? '36' : '26'" :color="photo.liked_by_user ? 'red' : hover ? 'white' : '#ADA6A4' ">
                  mdi-heart
                </v-icon>
              </v-btn>
            </v-hover>
            <v-hover v-slot="{ hover }">
              <v-btn
                icon
                :color="hover ? 'white' : '#ADA6A4'"
                :to="'/photo/' + photo.id"
              >
                <v-icon :size="hover ? '36' : '26'">
                  mdi-arrow-expand
                </v-icon>
              </v-btn>
            </v-hover>
            <v-hover v-slot="{ hover }">
              <v-btn
                icon
                :color="hover ? 'white' : '#ADA6A4'"
                @click="downloadItem(photo.id)"
              >
                <v-icon :size="hover ? '36' : '26'">
                  mdi-download
                </v-icon>
              </v-btn>
            </v-hover>
          </div>
        </div>
        <v-img
          :src="photo.urls.small"
          :alt="photo.alt_description"
          style="border-radius: 8px"
        />
      </div>
    </masonry>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    photos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imagesloaded: 0,
      loadingImg: true
    }
  },
  methods: {
    ...mapActions({
      download: 'Unsplash/downloadPhoto',
      like: 'Unsplash/likePhoto',
      dislike: 'Unsplash/unlikePhoto'
    }),
    async downloadItem (id) {
      await this.download(id);
    },
    async likeOrDislike(input) {
      let result;
      if(input.status == true) {
        result = await this.dislike(input.id);
      } else {
        result = await this.like(input.id);
      }
      if (result === true) {
        this.$nuxt.$emit('updateLikes')
      }
    }
  }
}
</script>
<style lang="scss">
  .grid-item {
    margin-bottom: 10px;
    position: relative;
    border-radius: 8px;;
  }
  .grid-item_hover {
    background-color: rgba(40, 36, 22, 0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    border-radius: 8px;
    transition: .3s ease-in-out;
    opacity: 0;
  }
  .grid-item_hover h4 {
    color: white;
    font-size: 18px;
  }
  .grid-item_hover h5 {
    color: white;
    font-size: 16px;
  }
  .grid-item_hover--image {
     width: 70px;
     height: 70px;
     border-radius: 8px;
     border: 1px solid white;
     background-size: cover
  }
  .grid-item_hover:hover {
    opacity: 1;
  }
</style>