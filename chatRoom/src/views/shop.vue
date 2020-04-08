<template>
  <div>
  <div id="app">
    <div :style="backgroundDiv">
    <header>
      <div class="content">
        <router-link tag="h1" :to="{name: 'Products'}">
          <img src="../assets/img/home.png" alt="">
          Snack house
        </router-link>
        <div>Snacks as gifts can bring happiness and happiness to others</div>
        <a>  This shop is a magical snack shop. You can buy happiness, happiness and everything~</a>
      </div>
    </header>
    <slide></slide>
    <router-view class="content main"/>
   <product></product>
  </div>
  </div>
  </div>
</template>

<script>
    import product from './ProductList.vue';
    import slide from '../components/slide.vue';

    export default {
        name: 'APP',
        data() {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/img/snake.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
            }
        },
        components: {
            product,
            slide,
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style>
  html, body, #app {
    margin: 0;
    height: 100%;
  }
  #app {
    font-family: word, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    display: flex;
    flex-direction: column;
  }

  header, footer {
    background-color: #CC9999;
    width: 100%;
    padding: 1em 0;
    flex:0 0 auto;
  }

  .content {
    width: 100%;
    max-width: 100%;
    margin: auto;
    box-sizing: border-box;
    padding: 0 1em;
  }

  .main {
    flex:1 1 100%;
    padding: 3em 1em;
  }

  h1 a:before {
    display: inline-block;
    content: "";
    width: 100%;
    position: relative;
    top: 0px;

    background-image: url('/assets/home.png');
    background-repeat: no-repeat;
  }

  h1 a {
    color: inherit;
    text-decoration: none;
  }
</style>
