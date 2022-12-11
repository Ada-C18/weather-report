"use strict";

const { default: axios } = require("axios");

// const changeTemp = tempDisplay => {
//   const 
// }


// const increaseTemp = () => {
//   tempDisplay += 1;
//   changeTemp(tempDisplay)
// }

// API Calls
const weatherforecast = (city_name) => {
  const getLocation = () => {
    axios
    .get ('http://127.0.0.1:5000/location'), {
      params: {
        key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
        q: city_name,
        format: 'json'
      }
    }
    .then (function(response){
      let lat = response.data[0]["lat"];
      let lon = response.data[0]["lon"];
      getWeatherFromLoc(lat, lon);
    })

    .catch (function(error) {
      console.error(error);
    })
  }

  const getWeatherFromLoc = (lat, lon) => {
    axios
    .get ('http://127.0.0.1:5000/weather'), {
      params: {
        appid: '76d80595e856e8e068fcdd93241e2622',
        lat: lat,
        lon: lon
      }
    }
    .then (function(response){
      let kelvinTemp = response.data['main']['temp'];
      let farhTemp = Math.floor((kelvinTemp - 273.15) * 1.8) + 32;
      // VARIABLE.innerText = farhTemp
    })
  }
}