'use strict';
//import axios from 'axios';
const axios = require('axios');

// Wave 2
const state = {
  temperature: 79,
  cityNameValue: 'seattle',
};

document.getElementById('temperatureNumber').style.color = 'black';

const addTemperatureButton = document.getElementById('upButton');
const decreaseTemperatureButton = document.getElementById('downButton');
const temperatureDisplay = document.getElementById('temperatureNumber');
const resetButton = document.getElementById('reset');
//let cityNameValue = "";

// Wave 3
const cityName = document.getElementById('cityName');
const city = document.getElementById('city');
cityName.addEventListener('input', display);

// function that display cityName immediately
function display(e) {
  //console.log(e);
  city.textContent = e.target.value;
  state.cityNameValue = e.target.value;
}
// function that reset the input
function resetInput() {
  cityName.value = ''; //input
  city.textContent = ''; //span
}

resetButton.addEventListener('click', resetInput);

const textColorAndLandscape = () => {
  const landscapeDisplay = document.getElementById('landscape'); //? is this the right position?
  if (state.temperature >= 80) {
    temperatureDisplay.style.color = 'red';
    landscapeDisplay.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    temperatureDisplay.style.color = 'orange';
    landscapeDisplay.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    temperatureDisplay.style.color = 'yellow';
    landscapeDisplay.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    temperatureDisplay.style.color = 'green';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    temperatureDisplay.style.color = 'teal';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const addTemperature = () => {
  state.temperature += 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

const decreaseTemperature = () => {
  state.temperature -= 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

const allEventHandlers = () => {
  addTemperatureButton.addEventListener('click', addTemperature);
  decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
};

//Wave 4

//const cityNameValue = cityName.value;
const findTemperature = () => {
  let latitude, longitude;
  //console.log(state.cityNameValue);
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        //q: `${state.city}`,
        //q: state.cityNameValue
        q: `${state.cityNameValue}`,
      },
    })
    .then((response) => {
      //console.log("hello");
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      //console.log(latitude, longitude);
    })
    .catch((error) => {
      //console.log("hello2");
      console.log('error in finding location!');
    });
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const kelvinTemperature = response.data.main.temp;
      const fahrenheitTemperature = Math.round(
        (kelvinTemperature - 273.15) * 1.8 + 32
      );
      state.temperature = fahrenheitTemperature;
      temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
    })
    .catch((error) => {
      console.log('error in finding temperature!');
    });
};

const getTempButton = document.getElementById('getTemperature');
getTempButton.addEventListener('click', findTemperature); //??

document.addEventListener('DOMContentLoaded', allEventHandlers);
