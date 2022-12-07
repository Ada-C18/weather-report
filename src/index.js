// 'use strict';
// import axios from 'axios';
// const axios = require('axios');

// WAVE 2
const currentTemp = {
  currTemp: 72, //This will be a function call in later wave
};

const upTemp = () => {
  console.log('up');
  currentTemp.currTemp++;
  const tempContainer = document.querySelector('#temp-current');
  tempContainer.textContent = `${currentTemp.currTemp}`;
  tempColor(currentTemp.currTemp);
  landTitle();
};

const downTemp = () => {
  console.log('down');
  currentTemp.currTemp--;
  const tempContainer = document.querySelector('#temp-current');
  tempContainer.textContent = `${currentTemp.currTemp}`;
  tempColor(currentTemp.currTemp);
  landTitle();
};

/*
  | 80+             | Red    |
  | 70-79           | Orange |
  | 60-69           | Yellow |
  | 50-59           | Green  |
  | 49 or below     | Teal   |
*/

const tempColor = () => {
  const tempCurrent = document.getElementById('temp-current');
  const numericTemp = parseInt(tempCurrent.innerHTML);
  let color;
  switch (true) {
    case numericTemp >= 80:
      color = 'red';
      break;
    case numericTemp >= 70:
      color = 'orange';
      break;
    case numericTemp >= 60:
      color = 'yellow';
      break;
    case numericTemp >= 50:
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
  const tempCurrent = document.getElementById('temp-current');
  const numericTemp = parseInt(tempCurrent.innerHTML);
  let text;
  switch (true) {
    case numericTemp >= 80:
      text = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
      break;
    case numericTemp >= 70:
      text = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
      break;
    case numericTemp >= 60:
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
  // const newCityName = document.getElementById('city-input').value;
  const currentCityName = document.getElementById('current-city');
  currentCityName.innerHTML = `This is the weather for ${e.target.value}`;
  console.log(e.target.value);
  // getWeather(e.target.value);
};

// WAVE 4
/*const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      q: query,
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      return { lat: latitude, lon: longitude };
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

const getWeather = (query) => {
  axios
    .get('http://127.0.0.1:5000/weather', findLatitudeAndLongitude(query))
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('there was an error with weather API');
    });
};*/

//WAVE 5
/*
| Sunny  | `"☁️ ☁️ ☁️ ☀️ ☁️ ☁️"`         |
| Cloudy | `"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"` |
| Rainy  | `"🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"`          |
| Snowy  | `"🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"`       |
*/
const changeSky = () => {
  const currentSky = document.getElementById('sky-selector');
  const skyValue = currentSky.value;
  console.log(skyValue,currentSky)
  let skyPicl
  switch (skyValue) {
    case 'Sunny':
      skyPic = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
    case 'Cloudy':
      skyPic = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
    case 'Rainy':
      skyPic = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
    case 'Snowy':
      skyPic = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
  }
  const skyBox = document.getElementById('sky')
  skyBox.innerHTML = skyPic
}

// EVENT HANDLERS

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('temp-up');
  increaseTemp.addEventListener('click', upTemp);

  const decreaseTemp = document.getElementById('temp-down');
  decreaseTemp.addEventListener('click', downTemp);

  const changeCity = document.getElementById('city-input');
  changeCity.addEventListener('change', changeCityText);

  const changeSkybox = document.getElementById('sky-selector');
  changeSkybox.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
