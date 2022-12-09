// import axios from 'axios';
// const axios = require('axios');

('use strict');

const state = {
  city: 'Toms River',
  lat: 39.9537359,
  lon: -74.1979576,
  temp: 58,
};

const updateCity = () => {
  const inputName = document.getElementById('inputCity');
  const cityName = document.getElementById('city');
  state.city = inputName.value;
  cityName.textContent = state.city;
};

const getWeather = () => {
  const totalCount = document.getElementById('temperatureValue');
  axios
    .get(`http://localhost:5000/location?q=${state.city}`)
    .then((response) => {
      console.log(response.data);
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      axios
        .get(`http://localhost:5000/weather?lat=${state.lat}&lon=${state.lon}`)
        .then((response) => {
          const tempKelvin = response.data.main.temp;
          const tempFarenheit = ((tempKelvin - 273.15) * 9) / 5 + 32;
          totalCount.textContent = `${Math.round(tempFarenheit)}°f`;
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error, could not get weather for that city 😞', error);
        });
    });
};

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
  // submitButton.addEventListener('click', getLatAndLong);
  submitButton.addEventListener('click', getWeather);
  const incrementCount = document.getElementById('increaseTemp');
  incrementCount.addEventListener('click', handleIncrement);
  const decrementCount = document.getElementById('decreaseTemp');
  decrementCount.addEventListener('click', handleDecrement);
  changeColor();
  changeLandscape();
  updateCity();
  const cityInput = document.getElementById('inputCity');
  cityInput.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
