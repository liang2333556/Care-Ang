
var butter = require('buttercms')("9ac63745bffc23603cf3a8de1ec1ac85e05a6522");

exports.handler = function(event, context, callback) {

  // snipcart send a GET request when crawling products
  if(event.httpMethod !== 'GET') {
    return callback(null, {
      statusCode: 200,
      body: ''
    });
  }

  // list products the same way we do on the website
  butter.page.list('product')
    .then((res) => {
      var products = res.data.data.map((product) => {
        return {
          id: product.fields.product_id,
          name: product.fields.name,
          price: product.fields.price,
          description: product.fields.description,
          image: product.fields.image,
          url: 'https://fervent-brattain-e6c67f.netlify.com/.netlify/functions/snipcart_json_crawler',
        };
      });

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(products),
      });
    }); // we would normally handle errors right? ;)
}
