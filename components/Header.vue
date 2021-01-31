<template>
  <div
    class="big_header"
    :class="{open_header: search}"
  >
    <div class="big_header-top">
      <div
        class="big_header-logo"
        @click="redirect('/')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 7.875V0H19.25V7.875H8.75ZM19.25 12.25H28V28H0V12.25H8.75V20.125H19.25V12.25Z"
            fill="white"
          />               
        </svg>
        <h3 class="pl-5 d-none d-md-block">
          ImageStock
        </h3>
      </div>
      <div class="big_header-links">
        <div
          class="mr-2"
          :class="{active_icon: search}"
          @click="search = !search; historyStatus = false"
        >
          <v-icon color="white">
            mdi-magnify
          </v-icon>
          <span class="d-none d-md-inline-block">
            Поиск
          </span>
        </div>
        <div
          class="ml-5 mr-2"
          @click="redirect('/favourites')"
        >
          <v-icon color="white">
            mdi-cards-heart
          </v-icon>
          <span class="d-none d-md-inline-block">
            Избранное            
          </span>
        </div>
        <div
          class="ml-5 mr-2"
          :class="{active_icon: historyStatus}"
          @click="historyStatus = !historyStatus; search = false"
        >
          <v-icon color="white">
            mdi-history
          </v-icon>
          <span class="d-none d-md-inline-block">
            История поиска
          </span>
        </div>
      </div>
    </div>
    <div
      class="big_header-disabled"
      :class="{'big_header-active mt-9 mb-12': historyStatus}"
    >
      <h1>Ваши запросы</h1>
      <div class="big_header-history">
        <span
          v-for="tag in history"
          :key="'hist_' + tag"
          class="ml-2"
          @click="redirect('/search/' + tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div
      class="big_header-disabled"
      :class="{'big_header-active mt-9': search}"
    >
      <h1>Поиск</h1>
      <v-text-field
        v-model="query"
        dark
        dense
        hide-details
        flat
        solo
        background-color="black"
        @keypress.enter="redirect(`/search/${query}`); saveHistory()"
      />
      <div class="big_header-divider" />
      <div class="big_header-tags mt-6">
        <p>Wallpapers</p>
        <p>Textures & Patterns</p>
        <p>Nature</p>
        <p>Current Event</p>
        <p>Architecture</p>
        <p>Buisness & Work</p>
        <p>Film</p>
        <p>Animals</p>
        <p>Travel</p>
        <p>Fashion</p>
        <p>Food & Drink</p>
        <p>Spirituality</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: false,
      query: '',
      history: [],
      historyStatus: false
    }
  },
  mounted () {
    const history = localStorage.getItem('searchHistory')
    if (history != null) {
      this.history = JSON.parse(history);
    }
    console.log(this.history)
    window.addEventListener('scroll', this.closeScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.closeScroll)
  },
  methods: {
    closeScroll() {
      if (this.search === true) {
        this.search = false;
      }
    },
    redirect(url) {
      this.$router.replace({ path: url })
    },
    saveHistory() {
      this.history.push(this.query)
      localStorage.setItem('searchHistory', JSON.stringify(this.history))
    }
  }
}
</script>
<style lang="scss" scoped>
	.big_header {
		background-color: black;
		color: white;
		display: flex;
		justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px 12%;
    transition: .4s ease-in;
	}
  .open_header {
    padding: 80px 12%;
  }
  .big_header-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .big_header-logo {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 100;
    cursor: pointer;
  }
  .big_header-links {
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .big_header-links div {
    cursor: pointer;
  }
  .big_header-disabled {
    opacity: 0;
    height: 0;
    transition: .4s;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .big_header-active {
    opacity: 1;
    height: 100%;
  }
  .big_header-search h1{
    font-size: 72px;
    font-weight: normal;
  }
  .big_header-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0.5) 50%, rgba(0,0,0,1) 100%);
  }
  .big_header-history {
    font-size: 18px;
  }
  .big_header-history span {
    line-height: 36px;
    cursor: pointer;
  }
  .big_header-tags {
    font-size: 18px;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    white-space: nowrap;
    position: relative;
  }
  .big_header-tags::before {
    content: '';
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 60%, rgba(0,0,0,1) 100%);
  }
  .big_header-tags p {
    margin-right: 16px;
  }
  .active_icon {
    width: max-content;
    position: relative;
  }
  .active_icon:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40%;
    border-bottom: 3px solid white;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
</style>
