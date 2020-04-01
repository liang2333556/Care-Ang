<!--<template>-->
<!--  <div id="movieslist">-->
<!--    <h3>Movies</h3>-->
<!--      <div class="search-wrapper">-->
<!--        <input class="textbox" type="text" v-model="search" placeholder="Search title.."/>-->
<!--      </div>-->
<!--      <div class="btn-group">-->
<!--        <b-button variant="light" @click="btnEventCall(API.popular_endpoint)">Popular</b-button>-->
<!--        <b-button variant="light" @click="btnEventCall(API.toprated_endpoint)">Top</b-button>-->
<!--        <b-button variant="light" @click="btnEventCall(API.upcoming_endpoint)">Upcoming</b-button>-->
<!--        <b-button variant="light" @click="btnEventCall(API.nowplaying_endpoint)">NowPlaying</b-button>-->
<!--      </div>-->
<!--      <div class="list">-->
<!--        <div class="movie_box" v-for="movie in displayedMovielist" :key="movie.id">-->
<!--          <movie :movieObj="movie"></movie>-->
<!--        </div>-->
<!--      </div>-->
<!--      <paginate-->
<!--        :page-count="numberOfPages"-->
<!--        :container-class="'pagination'"-->
<!--        :prev-text="'prev'"-->
<!--        :next-text="'next'"-->
<!--        :active-class="'active'"-->
<!--        :clickHandler="clickCallback" v-if="numberOfPages>1">-->
<!--      </paginate>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios'-->
<!--import Movie from '@/components/Movie/Movie'-->
<!--import API from '@/config.js'-->

<!--export default {-->
<!--  name: 'List',-->
<!--  components: {-->
<!--    Movie-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      API,-->
<!--      movielist: [],-->
<!--      pageNumber: 0,-->
<!--      page: 1,-->
<!--      perPage: 10,-->
<!--      pages: [],-->
<!--      numberOfPages: 0,-->
<!--      search: '',-->
<!--      movie: []-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.setInit()-->
<!--  },-->
<!--  watch: {-->
<!--    movielist () {-->
<!--      this.setPages()-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    displayedMovielist () {-->
<!--      if (this.search === '') {-->
<!--        return this.paginate(this.movielist)-->
<!--      } else {-->
<!--        this.searchedMovielist()-->
<!--        return this.paginate(this.movielist)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    setInit: function () {-->
<!--      return axios.get(API.popular_endpoint).then(response => {-->
<!--        this.movielist = response.data.results-->
<!--      }).catch(e => {})-->
<!--    },-->
<!--    searchedMovielist: function () {-->
<!--      return axios.get(API.search_endpoint + this.search).then(response => {-->
<!--        this.movielist = response.data.results-->
<!--      }).catch(e => {})-->
<!--    },-->
<!--    setPages () {-->
<!--      this.numberOfPages = Math.ceil(this.movielist.length / this.perPage)-->
<!--      for (let index = 1; index <= this.numberOfPages; index++) {-->
<!--        this.pages.push(index)-->
<!--      }-->
<!--    },-->
<!--    paginate (movielist) {-->
<!--      let page = this.page-->
<!--      let perPage = this.perPage-->
<!--      let from = (page * perPage) - perPage-->
<!--      let to = (page * perPage)-->
<!--      return movielist.slice(from, to)-->
<!--    },-->
<!--    clickCallback (pageNum) {-->
<!--      this.page = pageNum-->
<!--      this.paginate(this.movielist)-->
<!--    },-->
<!--    btnEventCall (URL) {-->
<!--      this.search = ''-->
<!--      return axios.get(URL).then(response => {-->
<!--        this.movielist = response.data.results-->
<!--      }).catch(e => {})-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
