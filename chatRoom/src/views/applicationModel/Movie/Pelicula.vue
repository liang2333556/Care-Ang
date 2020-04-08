<template>
  <div class="fondo" :style="backgroundDiv">
    <div style="padding:80px;">
      <div class="img">
        <img  :src="imageUrl + this.movie.poster_path" style="float:left;" alt="Card image cap">
      </div>
      <div class="whole">
        <div style="height:650px; text-align:center;" >
          <h5 class="card-title">{{this.movie.title}}</h5>
          <b-progress style="margin-left:445px; width:640px;" :value="5" :max="this.movie.vote_average" :precision="2" show-progress class="mb-1"></b-progress>
          <div>
            <p class="card-text">{{this.movie.overview}}</p>
          </div>
          <br>
          <youtube :video-id="urlId" ref="youtube" @playing="playing"></youtube>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import BootstrapVue from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    Vue.use(BootstrapVue);


    export default {
        name: "app",
        created: function() {
            this.getMovie();
            this.verTrailer();

        },
        data () {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../../../assets/img/detail.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
                id : this.$route.params.movieId,
                movie: '',
                imageUrl: 'https://image.tmdb.org/t/p/w342',
                urlId: '',
                playerVars: {
                    autoplay: 1
                }

            }
        },

        methods: {
            getMovie(){
                axios.get('https://api.themoviedb.org/3/movie/'+this.id+'?api_key=b80639b9f5a2e4e880b931dedbec575b').then((response)=>{
                    this.movie = response.data;
                    console.log(this.movie);
                });
            },
            verTrailer(){
                axios.get('http://api.themoviedb.org/3/movie/'+this.id+'/videos?api_key=b80639b9f5a2e4e880b931dedbec575b').then((response)=>{
                    this.urlId = response.data.results[0].key;
                    console.log(this.urlId);

                });
            },
            playing() {
                console.log('\o/ we are watching!!!')
            }


        }
    }
</script>

<style scoped>
  .whole{
    color:#006699;
    font-family:word;
  }
  .lista {
    top: 65px;
    margin: 80px;
    padding-right: 200px;
    display: inline-block;
    vertical-align: top;
    width: 250px;
    position: relative;
    font-family: Arial, sans-serif
  }
  .img{
    padding-top:0px;
  }
  .logo{
    width: 55px;
    height: 55px;
  }

  .logo1{
    width: 80px;
    height: 80px;
    position:relative;
    padding-left: -50px;
    top: -07px;
  }

  .navbar{
  }

  .principal{
  }

  .fondo{
    background-repeat: repeat;
    background-size: cover;

  }

  .voto{
    position:absolute;
    top: 35px;
    padding-left: 30px;
  }

  .pie{
    width: 100%;
  }

</style>
