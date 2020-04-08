<template>
  <div>
  <div class="product-details"  :style="backgroundDiv">
    <div class="detail">
    <figure>
      <img :src="product.fields.image" :alt="product.fields.name" class="img" />
    </figure>
    <section class="content">
      <div class="name">
       {{product.fields.name}}
      </div>
        <div class="des">{{product.fields.description}}</div>
      <div class="btn">
      <buy-button :product="product.fields" />
      </div>
    </section>
    </div>
  </div>
  </div>
</template>

<script>
import butter from '@/buttercms';
import BuyButton from './BuyButton';
// import NotFound from './Not';

export default {
  name: 'ProductPage',
  components: {
    // Not,
    BuyButton,
  },
  data() {
    return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../assets/img/snake.jpg') + ')',
            backgroundRepeat: "repeat",

        },
      product: {
        slug: '',
        fields: {},
      },
      // notFound: false,
    };
  },
  props: ['slug'],
  methods: {
    getProduct() {
      butter.page.retrieve('product', this.slug)
        .then((res) => {
          this.product = res.data.data;
        }).catch(() => {
          // this.notFound = true;
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style>
@media (min-width: 300px) {

  .product-details {
    background-color: rgba(97, 189, 255, 0.34);
    color:#330099;
    padding-top:60px;
    display: flex;
    height:1000px;
  }
  .product-details figure {
    width: 50%;
  }
  .btn{
    padding-right:400px;
  }
  .des{
    margin-top:30px;
    padding-bottom:20px;
    padding-left:20px;
    padding-top:20px;
    padding-right:20px;
    width:60%;
    background-color:#FFDAB9;
    border-radius:20px;
  }
.detail{
  background-color: rgba(97, 189, 255, 0.34);
  color:#330099;
  padding-top:30px;
  display: flex;
  width:100%;
  height:40%;
}
  .name{
    margin-left:90px;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:20px;
    padding-right:20px;
    width:30%;
    background-color:#FFDAB9;
    border-radius:20px;
  }
  .img{
    padding-top:60px;
    height:200px;
    width:200px;
  }

}
</style>
