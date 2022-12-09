'use strict'; // To get a little more error reporting help from the browser

// const axios = require('axios'); // imports axios library

const instance = axios.create({
  // create new instance of axios
  baseURL: 'http://127.0.0.1:5000/', // this is the server URL that will be used for the request
});
// set baseURL for an instance of axios to pass relative URLs to methods of that instance

const defaultCity = document.getElementById('cityNameInput').value;
const tempValue = document.getElementById('tempValue');

const state = {
  temperature: tempValue,
};

// Get temp based on city
const getTemp = async (city) => {
  const geoLocation = await instance
    .get('/location', {
      params: {
        key: 'LOCATION_KEY',
        q: city,
        format: 'json',
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('Error in finding geoLocation!');
    });
  const lat = geoLocation[0].lat;
  const lon = geoLocation[0].lon;
  const weather = await instance
    .get('/weather', {
      params: {
        appid: 'WEATHER_KEY',
        lat: lat,
        lon: lon,
        units: 'imperial', 
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('Error in getTemp!');
    });
  const currentTemp = weather.main.temp;
  console.log(currentTemp);
  state.temperature = currentTemp;
  tempValue.textContent = state.temperature;
};

getTemp(defaultCity);

// Event handler for increase temp button
const increaseTemp = () => {
  state.temperature += 1;
  tempValue.textContent = state.temperature;
};

const decreaseTemp = () => {
  state.temperature -= 1;
  tempValue.textContent = state.temperature;
};

const updateCityName = () => {
  const newCityName = document.getElementById('cityNameInput').value;
  document.getElementById('headerCityName').textContent = newCityName;
};

const registerEventHandlers = () => {
  const increaseTempBtn = document.querySelector('#increaseTempControl');
  increaseTempBtn.addEventListener('click', increaseTemp);

  const decreaseTempBtn = document.querySelector('#decreaseTempControl');
  decreaseTempBtn.addEventListener('click', decreaseTemp);

  const cityNameInput = document.querySelector('#cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);
};

// Registers all events. Once webpage is loaded, it ensures all events 
// are registered & occurs when triggered (clicked, inputted)
document.addEventListener('DOMContentLoaded', registerEventHandlers);

