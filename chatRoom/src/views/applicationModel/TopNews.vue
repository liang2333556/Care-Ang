<template>
  <div class="topNews" :style="backgroundDiv">
    <news></news>
<!--    <h2>Top News</h2>-->
    <spinner v-if="showSpinner"></spinner>
    <ul class="articles" v-if="articles && articles.length > 0">
      <li class="articles" v-for="(articles,index) in articles" :key="index">
        <a class="articleLink" v-bind:href="articles.url" target="_blank">
          <img class="articleImage" v-bind:src="articles.urlToImage">
          <h3>{{articles.title}}</h3>
          <p>{{articles.description}}</p>
          <p class="citation">Author: {{articles.author}} / Source: {{articles.source.name}}</p>
        </a>
      </li>
    </ul>
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
  name: "TopNews",
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
    getNews: function() {
      this.showSpinner = true; //Spinner on
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=84d4d2e235b442abbc10d838567c37da",
          {
            params: {
              pageSize: 99 //The number entered here will dictate how many results show on the page
            }
          }
        ) //This endpoint calls for top-headlines
        .then(response => {
          //Spinner off
          this.showSpinner = false;
          this.articles = response.data.articles;
        })
        .catch(error => {
          this.showSpinner = false;
          this.errors.push(error);
        });
    }
  },
  created: function() {
    //This will call the above function on page load
    this.getNews();
  },
  components: {
    spinner: Spinner,
    "error-list": ErrorList,
      news:news,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topNews {
  font-size: 1.2rem;
}
input[type="text"] {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.5rem;
}
button {
  font-weight: bold;
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
  color: #fff;
  background: black;
  border-radius: 15px;
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}
.articleLink {
  text-decoration: none;
  color: #fff;
}
.articleImage {
  width: 350px;
  border-radius: 15px;
}
</style>
