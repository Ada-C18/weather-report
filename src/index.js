'use strict';
const state = {
  temp: 75,
  city: 'Seattle',
  lat: '47.6038321',
  long: '-122.330062',
};

// const axios = require('axios');
// const cityForm = document.querySelector('form');
// const landscape = document.querySelector('.card');
// const card = document.querySelector('.details')

const getLatAndLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        key: process.env['LOCATION_KEY'],
        q: state.city,
        format: 'json',
      },
    })
    .then((response) => {
      // console.log(response.data[0]);
      state.lat = response.data[0].lat;
      state.long = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log('Error in find the latitude and longitude!', error.response);
    });
};

const getWeather = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        appid: process.env['WEATHER_KEY'],
        lat: state.lat,
        lon: state.long,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = Math.round(convertFromKtoF(weather.main.temp));
      colorAndLandscape();
      city = weather['name'];
    })
    .catch((error) => {
      console.log('Error getting the weather:!', error);
    });
};

// get city
// function convertFromKtoF(temp) {
//   return (temp - 273) * (9 / 5) + 32;
// }
const convertFromKtoF = (temp) => (temp - 273) * (9 / 5) + 32;

const colorAndLandscape = () => {
  let temp = state.temp;
  let color = 'red';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp > 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp > 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const updateLandscape = document.querySelector('#iconLandscape');
  updateLandscape.textContent = landscape;
  const temperature = document.querySelector('#tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  colorAndLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  colorAndLandscape();
};

const cityOutput = document.querySelector('#cityOutput');

const updateCity = () => {
  const cityForm = document.querySelector('form').cityName.value;
  state.city = cityForm;
  cityOutput.textContent = state.city;
  // cityOutput.innerHTML =  `<h3>${state.city}</h3>`;
};

const resetCity = () => {
  const cityInput = document.getElementById('cityInput');
  cityInput.value = 'Seattle';
  updateCity();
};

const updateSky = () => {
  const weatherState = document.getElementById('wrapper2').value;
  const skyContainer = document.querySelector('#iconOfSky');
  let sky = '';
  let skyColor = '';
  if (weatherState === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = 'cloudy';
  } else if (weatherState === 'Sunny') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyColor = 'sunny';
  } else if (weatherState === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = 'rainy';
  } else if (weatherState === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = 'snowy';
  }
  skyContainer.textContent = sky;
  const bgLight = document.querySelector('.bg-light');
  bgLight.classList = `bg_light ${skyColor}`;
};

// registering event handlers
const registerEventHandlers = () => {
  colorAndLandscape();

  const tempInc = document.querySelector('#tempInc');
  tempInc.addEventListener('click', increaseTemp);

  const tempDec = document.querySelector('#tempDec');
  tempDec.addEventListener('click', decreaseTemp);

  updateSky();
  const weatherCondition = document.getElementById('wrapper2');
  weatherCondition.addEventListener('change', updateSky);

  updateCity();
  const cityInput = document.querySelector('#cityinput');
  cityInput.addEventListener('input', updateCity);

  const cityNameReset = document.getElementById('cityNameReset');
  cityNameReset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
