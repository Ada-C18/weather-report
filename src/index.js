'use strict';

const axios = require('axios');

const state = {
  temp: 70,
};

const tempNum = document.getElementById('tempnum');
const cityInput = document.getElementById('city-input');
const cityOutput = document.getElementById('city-output');

const tempColor = {
  80: 'red',
  70: 'orange',
  60: 'purple',
  50: 'teal',
  else: 'blue',
};

const landscapes = {
  80: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  70: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  60: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  else: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
};

const skies = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const incrementTemp = () => {
  state.temp += 1;
  tempNum.textContent = state.temp;
  changeTempColor();
  changeLandscape();
};

const decrementTemp = () => {
  state.temp -= 1;
  tempNum.textContent = state.temp;
  changeTempColor();
  changeLandscape();
};

const changeTempColor = () => {
  const tempDegree = document.getElementById('temp-degree');
  if (state.temp >= 80) {
    tempDegree.className = tempColor['80'];
  } else if (state.temp >= 70) {
    tempDegree.className = tempColor['70'];
  } else if (state.temp >= 60) {
    tempDegree.className = tempColor['60'];
  } else if (state.temp >= 50) {
    tempDegree.className = tempColor['50'];
  } else {
    tempDegree.className = tempColor['else'];
  }
};

const changeLandscape = () => {
  const landscape = document.getElementById('landscape');
  if (state.temp >= 80) {
    landscape.textContent = landscapes['80'];
  } else if (state.temp >= 70) {
    landscape.textContent = landscapes['70'];
  } else if (state.temp >= 60) {
    landscape.textContent = landscapes['60'];
  } else {
    landscape.textContent = landscapes['else'];
  }
};

// HOW DO WE LIMIT TO THE ASCII KEYS :'(
const getCity = (event) => {
  const re = /^[A-z-\s]{1}$/;
  if (event.key.match(re)) {
    cityOutput.textContent = `${cityInput.value}${event.key}`;
  }
};

const getWeather = () => {
  console.log('button press!');
};

const clearInput = () => {
  cityInput.value = null;
  cityOutput.textContent = 'Seattle';
};

// const parrot = document.querySelector("#parrot");
//   if (state.clickCount >= 10) {
//     parrot.classList.add("large");
//   }
// };

const registerEventHandlers = () => {
  const upArrow = document.getElementById('up');
  upArrow.addEventListener('click', incrementTemp);

  const downArrow = document.getElementById('down');
  downArrow.addEventListener('click', decrementTemp);

  cityInput.addEventListener('keydown', getCity);

  const goButton = document.getElementById('go');
  goButton.addEventListener('click', getWeather);

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', clearInput);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
