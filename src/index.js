console.log('Hello, World!');

const { default: axios } = require('axios');
axios
  .get('https://us1.locationiq.com/v1/search.php')
  .then((response) => {
    console.log('success!');
  })
  .catch(() => {
    console.log('error!');
  });
