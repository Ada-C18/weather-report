"use strict";

// const changeTemp = tempDisplay => {
//   const 
// }


// const increaseTemp = () => {
//   tempDisplay += 1;
//   changeTemp(tempDisplay)
// }


const getLocation = () => {
  axios
  .get ('http://127.0.0.1:5000/location'), {
    params: {
      key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
      q: loc_query,
      format: 'json'
    }
  }
  .then (function(response){
    let lat = response.data[0]["lat"];
    let long = response.data[0]["lon"];
  })

  .catch (function(error) {
    console.error(error);
  })
}