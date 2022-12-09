'use strict';
import axios from 'axios';

const state = {
  temp: 65,
  city: 'Seattle',
  lat: 0,
  lon: 0,
};

const getLatAndLong = () => {
  axios.get('https://us1.locationiq.com/v1/search.php');
};

const tempColor = () => {
  const currentTemp = document.getElementById('temp-display');
  if (state.temp >= 80) {
    currentTemp.style.backgroundColor = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.backgroundColor = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.backgroundColor = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.backgroundColor = 'green';
  } else {
    currentTemp.style.backgroundColor = 'teal';
  }
};

const landscapeImage = () => {
  const landscape = document.getElementById('landscape');
  let pic;
  if (state.temp >= 80) {
    pic = '__😍🐍_🦂_🌵🌵🌵__🐍_🏜_🦂'; //**** add picture ***
  } else if (state.temp >= 70) {
    pic = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'; //**** add picture ***
  } else if (state.temp >= 60) {
    pic = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'; //**** add picture ***
  } else {
    pic = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'; //**** add picture ***
  }
  landscape.innerText = pic;
};

const updateTheme = () => {
  const currentTemp = document.getElementById('temp-display');
  currentTemp.textContent = `${state.temp}`;
  tempColor();
  landscapeImage();
};

const increaseTemp = () => {
  state.temp += 1;
  updateTheme();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTheme();
};

const toFahrenheit = (temp) => {
  return Math.floor(1.8 * (temp - 273) + 32);
};

const updateCity = () => {
  const inputCity = document.getElementById('cityNameInput').value;
  const headerCity = document.getElementById('headerCityname');
  headerCity.textContent = inputCity;
};

const resetCity = () => {
  const cityReset = document.getElementById('cityNameInput');
  cityReset.value = 'Name of City Here';
  const headerCity = document.getElementById('headerCityname');
  headerCity.textContent = 'Seattle';
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', increaseTemp);

  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', decreaseTemp);

  const inputCity = document.getElementById('submitButton');
  inputCity.addEventListener('click', updateCity);

  const resetCityButton = document.getElementById('resetButton');
  resetCityButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
