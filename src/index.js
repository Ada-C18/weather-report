'use strict';

/* Temperature Buttons */
const state = {
  increaseTemp: null,
  decreaseTemp: null,
  currentTempCount: 60,
  currentTemp: null,
  landscape: null,
  cityDisplay: 'City Name Here',
  cityInput: null,
};

const loadsControls = () => {
  state.increaseTemp = document.getElementById('increaseTemp');
  state.decreaseTemp = document.getElementById('decreaseTemp');
  state.currentTemp = document.getElementById('currentTemp');
  state.landscape = document.getElementById('landscape');
  state.cityDisplay = document.getElementById('city-display');
  state.cityInput = document.getElementById('city-input');
};

const refreshUI = () => {
  state.currentTemp.textContent = state.currentTempCount;
  state.cityDisplay.textContent = state.cityInput.textContent.value();
};

const handleIncreaseTempButtonClicked = (event) => {
  ++state.currentTempCount;
  refreshUI();
  tempTextColorChange();
  landscapeChange();
};

const handleDecreaseTempButtonClicked = (event) => {
  --state.currentTempCount;
  refreshUI();
  tempTextColorChange();
  landscapeChange();
};

const handleCityInputChanged = (event) => {
  state.cityDisplay.textContent = state.cityInput.value();
  refreshUI();
};

const registerEvents = () => {
  state.increaseTemp.addEventListener('click', handleIncreaseTempButtonClicked);
  state.decreaseTemp.addEventListener('click', handleDecreaseTempButtonClicked);
  state.cityInput.addEventListener('input', handleCityInputChanged);
};

const tempTextColorChange = () => {
  let temp = state.currentTempCount;
  if (temp <= 49) {
    document.getElementById('currentTemp').style.color = 'teal';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('currentTemp').style.color = 'green';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('currentTemp').style.color = 'yellow';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('currentTemp').style.color = 'orange';
  } else {
    document.getElementById('currentTemp').style.color = 'red';
  }
};

const landscapeChange = () => {
  let temp = state.currentTempCount;
  if (temp <= 59) {
    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp >= 60 && temp <= 69) {
    state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 70 && temp <= 79) {
    state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

const onLoaded = () => {
  loadsControls();
  registerEvents();
  tempTextColorChange();
  landscapeChange();
};

onLoaded();
