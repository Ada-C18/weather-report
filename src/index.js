'use strict';

const { default: axios } = require('axios');

console.log('testing');

const BASE_URL = 'http://localhost:5000';

const state = {
  city: 'Seattle',
  temp: 70,
  lat: 47.6062,
  lon: -122.3321,
};

const increaseTemperature = (event) => {
  console.log('in increaseTemp:', event);
  state.temp += 1;
  changeColorAndGarden();
};

const decreaseTemperature = (event) => {
  console.log('in decreaseTemp:', event);
  state.temp -= 1;
  changeColorAndGarden();
};

const changeColorAndGarden = () => {
  let temp = state.temp;
  let color = 'red';
  let garden = '🦜🦜__😎_ 🌞__⛱⛱_ ';

  if (temp >= 80) {
    color = 'red';
    garden = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'orange';
    garden = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    // garden = '🦜🦜__😎_ 🌞__⛱⛱_ ';
  } else if (temp >= 60) {
    color = 'yellow';
    garden = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    color = 'green';
    garden = '❄️🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲️';
  } else {
    color = 'teal';
    garden = '❄️❄️❄️❄️❄️⛄️⛄️⛄️⛄️⛄️⛄️❄️❄️❄️❄️❄️';
  }

  const newgarden = document.getElementById('garden');
  newgarden.textContent = garden;
  const temperature = document.getElementById('temp');
  // temperature.className = color;
  temperature.style.color = color;
  // temperature.textContent = String(state.temp);
  temperature.textContent = state.temp;
};

const modifySky = (event) => {
  console.log('in Modify Sky name:', event);
  let sky = document.getElementById('selectSky');
  let color = 'lightblue';

  let sky_visual = '😎😎😎😎😎🌞🌞🌞🌞🌞';
  if (sky.value === 'Sunny') {
    sky_visual = '😎😎😎😎😎🌞🌞🌞🌞🌞';
    color = 'lightyellow';
  } else if (sky.value === 'Cloudy') {
    sky_visual = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    color = 'lightgray';
  } else if (sky.value === 'Rainy') {
    sky_visual = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    color = 'darkblue';
  } else if (sky.value === 'Snowy') {
    sky_visual = '❄️❄️❄️❄️🌨🌨🌨🌨❄️❄️❄️❄️';
    color = 'white';
  }

  const skyInWeatherBox = document.getElementById('sky');
  skyInWeatherBox.textContent = sky_visual;
  const weatherBox = document.getElementById('weatherBox');
  weatherBox.style.backgroundColor = color;
};

const modifyCityName = (event) => {
  console.log('in Modify City name:', event);
  const cityInput = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');
  state.city = cityInput;
  headerCityName.textContent = state.city;
};

const resetCityName = (event) => {
  console.log('in Reset City name:', event);
  const cityInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Seattle';
  modifyCityName();
};

const getLatAndLon = () => {
  // const axios = require('axios');

  axios
    .get('http://localhost:5000/location', {
      params: { q: state.city },
    })

    .then((response) => {
      // state.lat = response
      // console.log(response);
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      console.log(state);
    })

    .catch((error) => {
      console.log('Error in get Lat & Lon');
    });
};
// add in lat and lon in the parameters below?

const getWeather = () => {

  axios
    .get('http://localhost:5000/weather', {
      params: {
      lat: state.lat,
      lon: state.lon,
      },
    })

    .then((response) => {
      const temperature = Math.round((9 / 5)) + 32);
      // currentLocation.temp = temp.textContent;
    })

    .catch((error) => {
      console.log('Error in Weather');
    });
};

const registerEventHandlers = (event) => {
  console.log('in registerEventHandlers:', event);

  changeColorAndGarden();
  getLatAndLon();
  getWeather();

  const increaseTemp = document.getElementById('increaseTemp');
  increaseTemp.addEventListener('click', increaseTemperature);

  const decreaseTemp = document.getElementById('decreaseTemp');
  decreaseTemp.addEventListener('click', decreaseTemperature);

  // modifyCityName();
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', modifyCityName);

  const cityResetButton = document.getElementById('resetCity');
  cityResetButton.addEventListener('click', resetCityName);

  modifySky();
  const selectNewSky = document.getElementById('selectSky');
  selectNewSky.addEventListener('change', modifySky);

  getWeather();
  const getTemp = document.getElementById('getTemp');
  getTemp.addEventListener('click', getWeather);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
