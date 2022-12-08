// const { default: axios } = require("axios");

console.log('hello world Yang');

// const { default: axios } = require('axios');
// const mySecret =.env['LOCATION_KEY'];
// console.log(axios);

const findLocation = () => {
  console.log('check function work');
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: 'seattle',
        // format: 'json',
      },
    })
    .then((response) => {
      console.log('success');
    })
    .catch((error) => {
      console.log('error!');
    });
};
// findLocation();
if (document.readyState !== 'loading') {
  findLocation();
} else {
  document.addEventListener('DOMContentLoaded', findLocation);
}
