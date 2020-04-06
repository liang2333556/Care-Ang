<template>
  <div id="app">
    <h1>Global News</h1>
    <Navigation></Navigation>
      <!--    <news></news>-->
    <router-view/>
  </div>
</template>

<script>
    import Navigation from '../../components/Navigation'
    // import news from './views/TopNews'

    export default {
        name: "app",
        components: {
            Navigation: Navigation,
            // news:news
        }
    };
</script>

<style>
  #app {
    background-color:#222222;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #EEEEEE;
    margin-top: 30px;
    margin-botton:30px;
  }

</style>
