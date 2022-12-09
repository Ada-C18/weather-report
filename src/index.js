// 'use strict';
// import axios from 'axios';
// const axios = require('axios');

// WAVE 2
const currentTemp = {
  currTemp: 72, //This will be a function call in later wave
};

const upTemp = () => {
  currentTemp.currTemp++;
  setTempNColor();
};

const downTemp = () => {
  currentTemp.currTemp--;
  setTempNColor();
};

const setTempNColor = () => {
  const tempContainer = document.querySelector('#temp-current');
  tempContainer.textContent = `${currentTemp.currTemp}`;
  tempColor();
  landTitle();
};

// | 80+             | Red    |
// | 70-79           | Orange |
// | 60-69           | Yellow |
// | 50-59           | Green  |
// | 49 or below     | Teal   |

const tempColor = () => {
  const tempCurrent = document.getElementById('temp-current');
  let color;
  switch (true) {
    case currentTemp.currTemp >= 80:
      color = 'red';
      break;
    case currentTemp.currTemp >= 70:
      color = 'orange';
      break;
    case currentTemp.currTemp >= 60:
      color = 'yellow';
      break;
    case currentTemp.currTemp >= 50:
      color = 'green';
      break;
    default:
      color = 'teal';
      break;
  }
  tempCurrent.className = color;
};

// | 80+             | `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`       |
// | 70-79           | `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`      |
// | 60-69           | `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`        |
// | 59 or below     | `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"` |

const landTitle = () => {
  const landStr = document.getElementById('landscape');
  let text;
  switch (true) {
    case currentTemp.currTemp >= 80:
      text = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
      break;
    case currentTemp.currTemp >= 70:
      text = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
      break;
    case currentTemp.currTemp >= 60:
      text = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
      break;
    default:
      text = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
      break;
  }
  landStr.textContent = text;
};

// WAVE 3
const originalCity = 'Seattle';

const changeCityText = (e) => {
  const currentCityName = document.getElementById('current-city');
  currentCityName.innerHTML = `This is the weather for ${e.target.value}!`;
  currentCity = e.target.value;
};

const changeTemptoCurrCity = () => {
  findLatitudeAndLongitude(currentCity)
    .then((response) => (currentTemp.currTemp = response))
    .then((response) => setTempNColor())
    .catch((error) =>
      console.log(`Error finding the latitude and longitude:" ${error}`)
    );

  const inputField = document.getElementById('city-input');
  inputField.value = '';
};

// WAVE 4
const findLatitudeAndLongitude = (city_name_str) => {
  let latitude, longitude;
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city_name_str,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      return getWeather({ lat: latitude, lon: longitude });
    })
    .catch((error) => {
      console.log(`This city does not exist`);
      return currentTemp.currTemp;
    });
};

const getWeather = (query) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: query.lat,
        lon: query.lon,
      },
    })
    .then((response) => {
      // return response.data.main.temp);
      return Math.floor((response.data.main.temp - 273.15) * 1.8 + 32);
    })
    .catch((error) => {
      console.log('there was an error with weather API');
    });
};

/*
| Sunny  | `"☁️ ☁️ ☁️ ☀️ ☁️ ☁️"`         |
| Cloudy | `"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"` |
| Rainy  | `"🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"`          |
| Snowy  | `"🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"`       |
*/

//WAVE 5
const changeSky = () => {
  const currentSky = document.getElementById('sky-selector');
  const skyValue = currentSky.value;
  console.log(skyValue, currentSky);
  let skyPic;
  switch (skyValue) {
    case 'Sunny':
      skyPic = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
      break;
    case 'Cloudy':
      skyPic = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
      break;
    case 'Rainy':
      skyPic = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
      break;
    case 'Snowy':
      skyPic = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
      break;
  }
  const skyBox = document.getElementById('sky');
  skyBox.innerHTML = skyPic;
};

// WAVE 6
const resetCity = () => {
  changeCityText({ target: { value: originalCity } });
};

// EVENT HANDLERS
const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('temp-up');
  increaseTemp.addEventListener('click', upTemp);

  const decreaseTemp = document.getElementById('temp-down');
  decreaseTemp.addEventListener('click', downTemp);

  const changeCity = document.getElementById('city-input');
  changeCity.addEventListener('input', changeCityText);
  changeCity.addEventListener('propertychange', changeCityText);

  const changeTemp = document.getElementById('temp-get-button');
  changeTemp.addEventListener('click', changeTemptoCurrCity);

  const changeSkybox = document.getElementById('sky-selector');
  changeSkybox.addEventListener('change', changeSky);

  const resetCityButton = document.getElementById('city-reset');
  resetCityButton.addEventListener('click', resetCity);

  resetCity();
  changeTemptoCurrCity(originalCity);
  changeSky();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
