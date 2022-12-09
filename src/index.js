'use strict';

const DEFAULT_CITY = 'Seattle';
// Select the HTML Element the event will occur on
const increaseTempElement = document.getElementById('increaseTempBtn');
const decreaseTempElement = document.getElementById('decreaseTempBtn');
const currentTempTag = document.getElementById('currentTemp');
const landscape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const cityNameReset = document.getElementById('cityNameReset');

const changingTempColorAndLandscape = () => {
  let currentTemp = parseInt(currentTempTag.textContent);
  if (currentTemp >= 80) {
    currentTempTag.className = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (currentTemp >= 70) {
    currentTempTag.className = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    currentTempTag.className = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50) {
    currentTempTag.className = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    currentTempTag.className = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

// Register that function as an 'event listener'
// increaseTempElement.addEventListener('click', increaseTemperature);
increaseTempElement.addEventListener('click', () => {
  currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
  changingTempColorAndLandscape();
});
// decreaseTempElement.addEventListener('click', decreaseTemperature);
decreaseTempElement.addEventListener('click', () => {
  currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
  changingTempColorAndLandscape();
});

cityNameInput.addEventListener('input', (inputEvent) => {
  headerCityName.textContent = inputEvent.target.value;
});

cityNameReset.addEventListener('click', () => {
  cityNameInput.value = DEFAULT_CITY;
  headerCityName.textContent = DEFAULT_CITY;
});

const init = () => {
  headerCityName.textContent = DEFAULT_CITY;
  cityNameInput.value = DEFAULT_CITY;
};
init();
// Make a function to run when it occurs
// const increaseTemperature = () => {
//   currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
// };
// const decreaseTemperature = () => {
//   currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
// };
