<template>
  <div>
    <nav>
      <router-link
        class="spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      links: [
          {
              id: 0,
              text: "Top News",
              page: "TopNews"
          },
        {
          id: 1,
          text: "Search",
          page: "NewsVue"
        },

      ]
    };
  }
};
</script>
<style>
.spacing {
  margin-right: 5px;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  background: #333;
  padding: 0.3rem;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
