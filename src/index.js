"use strict";

// changes selected city
function changeCity() {
}

//makes call to OpenWeather get weather by city API; converts result from kelvin to fahrenheit
function getWeather(city) {
  const axios = require('axios');
  let fahrenheit;
  axios
    .get('api.openweathermap.org/data/2.5/weather', {
      params: {
        //need to hide this secret key
        key:'a04af2cbfa950c11dcae350eb97c823e',
        q: city,
        format: 'json',
      },
    }) 
    .then((response) => {
      const kelvin = response.data[main][temp];
      fahrenheit = 1.8(kelvin - 273) + 32 
    })
    .catch((error) => {
      console.log('An error occured, please try')
    });
};

function changeTemp(amount) {
  const x = document.getElementById('temp-slider').value;
  document.getElementById('current-temp').innerHTML = inputTempVariable;
};