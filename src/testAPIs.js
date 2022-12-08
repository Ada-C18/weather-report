const axios = require('axios');
//function to call location API
const findLatandLong = (city) => {
  let latitude, longitude;
  //get
  axios
    .get('http://127.0.0.1:5000/location', (config = { params: { q: city } }))

    //then
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('response data', response.data[0]);
    })
    // //catch
    .catch((error) => {
      console.log('error missing fksdkf');
    })

    .finally(() => {
      let result = {
        cityLat: latitude,
        cityLong: longitude,
      };
      console.log(result);
      return result;
    });
};

findLatandLong('Hanoi');
findLatandLong('Paris');
