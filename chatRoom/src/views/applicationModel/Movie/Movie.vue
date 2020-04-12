<template>

  <div id="movie" >
      <div class="movie_img">
        <router-link :to="{ name: 'Pelicula', params: { movieId: movieObj.id } }">
          <img v-bind:src="API.IMAGE_BASE_URL + API.POSTER_SIZE + '/' + movieObj.poster_path"  alt="image">
        </router-link>
      </div>
      <div class="intro">
        <router-link class="title" :to="{ name: 'Pelicula', params: { movieObj } }">
          <h3 >{{movieObj.title}}</h3>
        </router-link>
        <div class="gen">{{genrename}}</div>
        <div >Year : {{year}}</div>
        <div class="vote" >
          <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
          <span class="glyphicon glyphicon-star"></span>
          {{movieObj.vote_average}}</div>
<div class="btn">
        <button type="button"
                v-clipboard:copy="movieObj.title+':'+movieObj.overview"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">Share</button>
</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import API from '@/config.js'
import moment from 'moment'

export default {
  name: 'Movie',
  data () {
    return {
      API: API,
        newtitle:'',
      genrename: [],
      genrelist: [],
      year: '',
      movieId: '',

    }
  },
  props: {
    movieObj: Object
  },
  created () {
    this.year = moment(String(this.movieObj.release_date)).format('YYYY')
    this.setInit()
  },
  methods: {

      onCopy: function (e) {
          alert('Copy successfully: ' + e.text)
      },
      onError: function (e) {
          alert('Fail to copy')
      },
      getIdMovies(id){
          console.log(id);
          this.$router.push('/Pelicula/'+id)
      },
      setInit: function () {
      return axios.get(API.genre_endpoint).then(response => {
        this.genrelist = response.data.genres
        // call fun to get genre name
        this.getGenreName(this.genrename, this.movieObj.genre_ids)
      })
    },
    getGenreName: function (genrename, genreId) {
      // change genrelist from object to array
      Object.entries(this.genrelist)
      // loop for genrelist
      this.genrelist.forEach(function (genre) {
        // loop for genreId for each movie
        genreId.forEach(function (g) {
          // check the genreid match
          if (g === genre.id) {
            // add genre name to array
            genrename.push(genre.name)
          }
        })
      })
      // change array to string and return it
      this.genrename = genrename.toString()
    }
  }
}
</script>
<style>
  .btn{
    color:black;
  }
  </style>
