//const axios = require('axios');
//const dotenv = require('dotenv').config();
//const API_KEY = process.env.API_KEY;

('use strict');
//call to the flask app to get weather
const lat = 47.6038321;
const lon = -122.330062;

//later, change
axios
  .get('http://127.0.0.1:5000/weather' + '?lat=' + lat + '&lon=' + lon)
  .then((response) => {
    const temp = response.data.main.temp;
    console.log(temp);
    const appearanceHeading = document.getElementById('temperaturenumber');
    appearanceHeading.textContent = temp + ' °F';
  });

//if loading,
