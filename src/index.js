console.log('Hello, World Fataneh!');

const axios = require('axios');
axios
  .get('http://127.0.0.1:5000/location',
  {
    params:{
      q:'seattle',
      format:'json'
    },
  })

  .then((response) => {
    console.log('success!');
  })
  .catch(() => {
    console.log('error!');
  });
