"use strict";
import {axios} from 'axios'

const state = {
  tempValue: 80,
  city: 'Seattle',
  lat: 0,
  lon: 0
};

const temperature = document.getElementById('tempValue');

const updateBackground = () => {
  const background = document.getElementById('bg');

  if (state.tempValue >= 100){
    background.style.backgroundImage = 'url(../../assets/sun-surface.jpg)'
  }
  else if (state.tempValue >= 90){
    background.style.backgroundImage = 'url(../../assets/desert.jpg)'
  }
  else if (state.tempValue >= 80){
    background.style.backgroundImage = 'url(../../assets/summer2.jpg)'
  }
  else if (state.tempValue >= 70){
    background.style.backgroundImage = 'url(../../assets/summer.jpg)'
  }
  else if (state.tempValue >= 60){
    background.style.backgroundImage = 'url(../../assets/spring2.webp)'
  }
  else if (state.tempValue >= 50){
    background.style.backgroundImage = 'url(../../assets/spring.jpg)'
  }
  else if (state.tempValue >= 40){
    background.style.backgroundImage = 'url(../../assets/autumn.jpg)'
  }
  else if (state.tempValue >= 20){
    background.style.backgroundImage = 'url(../../assets/winter-lanscape.webp)'
  }
  else {
    background.style.backgroundImage = 'url(../../assets/deepfreeze.jpg)'
  }
};

const updateTempColor = () => {
  if (state.tempValue >= 80){
    temperature.classList = 'red';
  }
  else if (state.tempValue >= 70){
    temperature.classList = 'orange';
  }
  else if (state.tempValue >= 60){
    temperature.classList = 'yellow';
  }
  else if (state.tempValue >= 50){
    temperature.classList = 'green';
  } else {
    temperature.classList = 'teal';
  }
};

const increaseTemp = () => {
  state.tempValue += 1;
  temperature.textContent = String(state.tempValue) + '°F';
  updateBackground();
  updateTempColor();
};

const decreaseTemp = () => {
  state.tempValue -= 1;
  temperature.textContent = String(state.tempValue +'°F');
  updateBackground();
  updateTempColor();
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

const updateCityName = () => {
  let cityNameInput = document.getElementById('cityNameInput').value;
  let headerCityName = document.getElementById('headerCityName');
  state.city = inputName;
  headerCityName.textContent = state.city
  };
  
  const resetCityName = () => {
    let cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.value = 'Seattle';
    updateCityName();
  };

const getLatLon = () => {
  axios.get('https://localhost:5000/location', parameters = {'q': state.city})
      .then((response) => {
        state.lat = response.data[0].lat;
        state.lon = response.data[0].lon;
      })
      .catch((error) => {
        console.log('error getting lat and lon');
      });
};

getLatLon();

const registerEventHandlers = () => {

  const increaseTempBtn = document.getElementById('increaseTempBtn');
  increaseTempBtn.addEventListener('click', increaseTemp);

  const decreaseTempBtn = document.getElementById('decreaseTempBtn');
  decreaseTempBtn.addEventListener('click', decreaseTemp);

  const skySelection = document.getElementById('skySelection');
  skySelection.addEventListener('change', updateSky);

  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);

  const resetCityBtn = document.getElementById('cityResetBtn');
  resetCityBtn.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);