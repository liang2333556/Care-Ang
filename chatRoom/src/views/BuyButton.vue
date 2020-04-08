<template>
  <div class="buy">
  <a href="#" class="snipcart-add-item"
    :data-item-id="product.product_id"
    :data-item-name="product.name"
    :data-item-price="product.price"
    data-item-url="https://fervent-brattain-e6c67f.netlify.com/.netlify/functions/snipcart_json_crawler"
    :data-item-image="product.image">Buy for ${{ product.price | price }}&nbsp;</a>
  </div>
</template>

<script>
export default {
  name: 'BuyButton',
  props: ['product'],
};
</script>

<style>
.snipcart-add-item {
    display: inline-block;
    padding: .2em;
    background-color: 	#D2691E;
    text-decoration: none;
    color: inherit;
    border-radius: .3em;
}
  .buy{
    padding-right:-10px;
    padding-top:10px;

  }
</style>
