<template>
  <div class="photo_wrapper">
    <div
      class="photo_background"
      :style="'background-image: url(' + image.urls.raw + ');'"
    >
      <div class="photo_content">
        <div class="photo_content-header mt-5 d-flex align-center">
          <div
            :style="'background-image: url(' + image.user.profile_image.medium + ');'"
            class="photo-item_hover--image"
          />
          <div
            class="d-flex ml-3"
            style="flex-direction: column"
          >
            <h4>
              {{ image.user.name }}
            </h4>
            <h5>@{{ image.user.username }}</h5>
          </div>
          <v-spacer />
          <v-btn
            height="40px"
            width="40px"
            fab
            style="border-radius: 8px"
            @click="likeOrDislike({status: image.liked_by_user, id: image.id})"
          >
            <v-icon :color="image.liked_by_user ? 'red' : '#ADA6A4'">
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            color="success"
            height="40px"
            class="ml-3 photo-download_button"
            @click="downloadItem(image.id)"
          >
            <v-icon class="mr-2">
              mdi-download
            </v-icon>Download
          </v-btn>
          <v-btn
            color="success"
            height="40px"
            width="40px"
            class="ml-3 photo-download_button_mobile"
            fab
            @click="downloadItem(image.id)"
          >
            <v-icon>
              mdi-download
            </v-icon>
          </v-btn>
        </div>
        <img
          :src="image.urls.full"
          class="mt-6 mt-md-0 mb-6 mt-md-0"
        >
        <div class="text-center mb-4 photo_tags">
          <p>
            Похожие теги
          </p>
          <a
            v-for="(tag, index) in image.tags"
            :key="'tag_' + index"
            :href="'/search/' + tag.title"
          >
            <div class="photo_content-chip">
              {{ tag.title }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  props: {
    image: {
      type: Object,
      required: true
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
  .photo_wrapper {
    height: calc(100vh - 66px);
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: 700px) {
      height: max-content;
    }
  }
  .photo_background {
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    @media screen and (max-width: 700px) {
      background: none !important;
    }
  }
  .photo_background::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 2;
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  .photo_content {
    height: 100%;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    position: relative;
    flex-direction: column;
    @media screen and (max-width: 700px) {
      width: 95%
    }
    &-chip {
      background-color: #fff;
      border-radius: 8px;
      padding: 5px 11px;
      color: #828282;
      font-size: 18px;
      width: max-content;
      display: inline-block;
      margin: 4px;
    }
    &-header {
      display: flex;
      width: 100%;
      color: white;
    }
    &-header h4 {
      font-size: 22px;
      @media screen and (max-width: 700px) {
        font-size: 16px;
        color: black;
      }
    }
    &-header h5 {
      font-size: 14px;
      @media screen and (max-width: 700px) {
        font-size: 14px;
        color: black;
      }
    }
  }
  .photo_content img {
    height: 60vh;
    width: auto;
    box-shadow: 0px 4px 100px 0px #000000;
    border-radius: 8px;
    @media screen and (max-width: 700px) {
      box-shadow: none;
      width: 100%;
    }
  }
  .photo_content p {
    font-size: 24px;
    font-weight: 600;
  }
  .photo-item_hover--image {
    width: 54px;
    height: 54px;
    border-radius: 8px;
    border: 1px solid white;
    background-size: cover;
    @media screen and (max-width: 700px) {
      width: 48px  !important;
      height: 48px !important;
    }
  }
  .photo-download_button {
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  .photo-download_button_mobile {
    display: none;
    @media screen and (max-width: 700px) {
      display: block;
      border-radius: 8px;
    }
  }
  .photo_tags p {
    color: white;
    @media screen and (max-width: 700px) {
      color: black;
    }
  }
</style>