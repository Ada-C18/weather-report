"use strict";
//import axios from 'axios';

const state = {
  tempValue: 0,
};

const temperature = document.getElementById('tempValue');

const getTemperature = () => {
  
};

const increaseTemp = () => {
  state.tempValue += 1;
  temperature.textContent = String(state.tempValue) + '°F';
};

const decreaseTemp = () => {
  state.tempValue -= 1;
  temperature.textContent = String(state.tempValue +'°F');
};

const updateSky = () => {
  const sky = document.getElementById('sky');
  const skySelection = document.getElementById('skySelection').value;

  if (skySelection === 'Sunny'){
    sky.textContent = '☁️   🕊️☁️        ☀️ ☁️';
  }
  else if (skySelection === 'Cloudy'){
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  }
  else if (skySelection === 'Rainy'){
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
  }
  else if (skySelection === 'Snowy'){
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const registerEventHandlers = () => {
  const increaseTempBtn = document.getElementById('increaseTempBtn');
  increaseTempBtn.addEventListener('click', increaseTemp);

  const decreaseTempBtn = document.getElementById('decreaseTempBtn');
  decreaseTempBtn.addEventListener('click', decreaseTemp);

  const skySelection = document.getElementById('skySelection');
  skySelection.addEventListener('change', updateSky);

};

document.addEventListener('DOMContentLoaded', registerEventHandlers);