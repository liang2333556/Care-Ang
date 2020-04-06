<template>

  <div class="newsVue">
    <news></news>
    <form v-on:submit.prevent="findNews">
      <div class="search">
      <p>
        Search news for:
        <input type="text" v-model="query" placeholder="Enter a topic">
        <button type="submit">Search</button>
      </p>
      </div>
    </form>
<!--    <news></news>-->

    <spinner v-if="showSpinner"></spinner>
    <ul class="articles" v-if="articles && articles.length > 0" :style="backgroundDiv">
      <li class="articles" v-for="(articles,index) in articles" :key="index">
        <a class="articleLink" v-bind:href="articles.url" target="_blank">
          <img class="articleImage" v-bind:src="articles.urlToImage">
          <h3>{{articles.title}}</h3>
          <p>{{articles.description}}</p>
          <p class="citation">Author: {{articles.author}} / Source: {{articles.source.name}}</p>
        </a>
      </li>
    </ul>

    <div class="no-articles" v-else-if="articles && articles.length==0" :style="backgroundDiv">
      <h2>No News Found</h2>
      <p>Please adjust your search to find more news.</p>
    </div>
    <error-list v-bind:errorList="errors"></error-list>
  </div>

</template>

<script>
import axios from "axios";
import news from "./news.vue";
require("vue2-animate/dist/vue2-animate.min.css");
import Spinner from "@/components/Spinner";
import ErrorList from "@/components/ErrorList";

export default {
  name: "NewsVue",
  components: {
    spinner: Spinner
  },
  data() {
    return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../../assets/img/newsb.jpg') + ')',
            backgroundRepeat: "repeat",
        },
      results: null,
      articles: [],
      errors: [],
      query: [],
      showSpinner: false
    };
  },
  methods: {
    findNews: function() {
      this.showSpinner = true; //Spinner on
      axios
        .get(
          "https://newsapi.org/v2/everything?apiKey=84d4d2e235b442abbc10d838567c37da",//This endpoint calls for everything
          {
            params: {
              q: this.query, //User inputted search term
              sortBy: "popularity",
              pageSize: 99, //The number entered here will dictate how many results show on the page
            }
          }
        )
        .then(response => { //Spinner off
          this.showSpinner = false;
          this.articles = response.data.articles;
        })
        .catch(error => {
          this.showSpinner = false;
          this.errors.push(error);
        });
    }
  },
  components: {
    "spinner": Spinner,
    "error-list": ErrorList,
      "news":news,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newsVue {
  top:20px;
  font-size: 1.2rem;
  font-family:word;
}
input[type="text"] {
  border-top: 20px;
  border-left: none;
  border-right: none;
  /*border-bottom: 1px solid #333;*/
  width: 300px;
  font-size: 1.4rem;

  font-weight: 300;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.5rem;
}
button {
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  border: none;
  color:#FFFFFF;
  font-family:word;
  cursor: pointer;
  font-size: 1.4rem;
  margin-left: 10px;
}
h1,
h2 {
  font-weight: normal;

}
h3 {
  font-weight: bold;
  text-decoration-line: underline;
}
.citation {
  font-size: 0.8rem;
}
ul.articles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}
.articles li {
  margin: 10px;
  padding: 0.5rem;
  max-width: 350px;
  background: black;
  border-radius: 15px;
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;

  padding: 0.5rem;
  margin: 10px 0;
}
.articleLink {
  text-decoration: none;
}
.articleImage {
  width: 350px;
  border-radius: 15px;
}
  .no-articles{
    color:#006699;
    font-family:word;
  }
  .search{
    color:#006699;
  }
</style>
