<template>
  <div>
    <div class="errorsWrapper" v-if="errorList.length > 0">
      <p class="errors" v-for="(error,index) in errorList" :key="index">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorList",
  data() {
    return {};
  },
  props: {
    errorList: Array
  }
};
</script>

<style scoped>
.errorsWrapper {
  display: inline-block;
  margin: 10px;
  justify-content: center;
}
.errors {
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  max-width: 350px;
  color: #fff;
  background: black;
  border-radius: 15px;
}
</style>