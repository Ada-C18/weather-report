// const { default: axios } = require("axios");

'use strict';

axios;

let clicks = 32;

function changeColor() {
  let color = 'black';
  if (clicks <= 49) {
    color = 'teal';
  } else if (clicks <= 59) {
    color = 'green';
  } else if (clicks <= 69) {
    color = 'yellow';
  } else if (clicks <= 79) {
    color = 'orange';
  } else if (clicks > 79) {
    color = 'red';
  }
  document.getElementById('tempNumber').style.color = color;
  document.getElementById('tempHeader').style.color = color;
}

function clicksUpTemp() {
  clicks += 1;
  document.getElementById('tempNumber').innerHTML = clicks;
  changeColor();
  changeLandscape();
}

function clicksDownTemp() {
  clicks -= 1;
  document.getElementById('tempNumber').innerHTML = clicks;
  changeColor();
  changeLandscape();
}

function changeLandscape() {
  let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  if (clicks <= 59) {
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (clicks <= 69) {
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (clicks <= 79) {
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (clicks > 79) {
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
  document.getElementById('landscapeImage').innerHTML = landscape;
}

function changeCityName() {
  var x = document.getElementById('cityName').value;
  document.getElementById('currentCity').innerHTML = x;
}

function findLatLon() {
  let latitude, longitude;
  let query= document.getElementById('cityName').value;
  axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: query
    }
  })
  .then( (response) => {
    const latitude =response.data[0].lat;
    const longitude =response.data[0].lon;

    getWeather(latitude,longitude)
  })
  .catch( (error) => {
    console.log('error in findLatLon');
  });
}

function getWeather(latitude, longitude) {
  axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: latitude,
      lon: longitude,
    }
  })
  .then( (response) => {
    const temp= response.data.main.temp

    document.getElementById('tempNumber').innerHTML = Math.floor(1.8*(temp-273)+32)+"°F";
  })
  .catch( (error) => {
    
    console.log('error in getWeather');
    console.log(error)
  });
}


