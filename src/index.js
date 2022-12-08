import axios from 'axios';

('use strict');

const state = {
  city: 'Toms River',
  temp: 58,
};

const updateCity = () => {
  const inputName = document.getElementById('cityInput').value;
  const headerCityName = document.getElementById('city');
  state.city = inputName;
  headerCityName.textContent = state.city;
};

const axios = require('axios');
const getLatAndLong = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log('error, could not find location 😞', error.response);
    });
};

const getWeather = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = weather.current.temp;
    })
    .catch((error) => {
      console.log('error, could not get weather for that city 😞', error);
    });
};

const incrementCount = document.getElementById('increaseTemp');
const decrementCount = document.getElementById('decreaseTemp');

const totalCount = document.getElementById('temperatureValue');

temperatureValue.textContent = `${state.temp}°f`;

const handleIncrement = () => {
  state.temp++;
  temperatureValue.textContent = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

const handleDecrement = () => {
  state.temp--;
  temperatureValue.textContent = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

// incrementCount.addEventListener('click', handleIncrement);
// decrementCount.addEventListener('click', handleDecrement);

// const state = {
//   temp: 58,
// };

const changeColor = () => {
  let temp = state.temp;
  let color = '';
  if (temp > 80) {
    color = 'red';
  } else if (temp > 70) {
    color = 'orange';
  } else if (temp > 60) {
    color = 'yellow';
  } else if (temp > 50) {
    color = 'green';
  } else {
    color = 'blue';
  }
  totalCount.className = color;
};

const ground = document.getElementById('ground');

const changeLandscape = () => {
  let temp = state.temp;
  let groundChange = '';
  if (temp > 80) {
    groundChange = '🌵_🏜__🌵🐍';
  } else if (temp > 70) {
    groundChange = '🏝_⛱__🏝_🌊';
  } else if (temp > 60) {
    groundChange = '🌳_🌈__🌳_🌸';
  } else {
    groundChange = '🌲_🌲__⛄️_🌲🌲';
  }
  ground.textContent = groundChange;
};

const registerEventHandlers = () => {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', getLatAndLong);
  const incrementCount = document.getElementById('increaseTemp');
  incrementCount.addEventListener('click', handleIncrement);
  const decrementCount = document.getElementById('decreaseTemp');
  decrementCount.addEventListener('click', handleDecrement);
  changeColor();
  changeLandscape();
  updateCity();
  const cityInput = document.getElementById('cityInput');
  cityInput.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
