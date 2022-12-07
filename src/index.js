console.log('Hello, World Fataneh!');

const axios = require('axios');
axios
  .get('API url')
  .then((response) => {
    console.log('success!');
  })
  .catch(() => {
    console.log('error!');
  });
