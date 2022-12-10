// import axios from 'axios';

// const { default: axios } = require('axios');

const state = {
  temp: 0,
};

const tempChangeUpdateUI = () => {
  const currentTemp = Number(document.querySelector('#temp-num').innerText);
  const tempConsole = document.querySelector('#temp-console');
  const landscape = document.querySelector('#landscape-img');

  if (currentTemp <= 49) {
    tempConsole.className = 'teal';
    landscape.src = 'assets/winter-landscape.png';
  } else if (currentTemp <= 59) {
    tempConsole.className = 'green';
    landscape.src = 'assets/fall-landscape.png';
  } else if (currentTemp <= 69) {
    tempConsole.className = 'yellow';
    landscape.src = 'assets/spring-landscape.png';
  } else if (currentTemp <= 79) {
    tempConsole.className = 'orange';
    landscape.src = 'assets/spring-landscape.png';
  } else if (currentTemp >= 80) {
    tempConsole.className = 'red';
    landscape.src = 'assets/summer-landscape.png';
  }
};

const decreaseTemp = () => {
  state.temp -= 1;
  currentTemp.innerText = state.temp;
  tempChangeUpdateUI();
};

const increaseTemp = () => {
  state.temp += 1;
  currentTemp.innerText = state.temp;
  tempChangeUpdateUI();
};

const convertTemp = () => {
  const currentTempType = document.querySelector('#temp-type');
  let currentTempNum = document.querySelector('#temp-num');
  if (currentTempType.innerText === 'F') {
    currentTempNum = (Number(currentTempNum) - 32) * (5 / 9);
    currentTempType.innerText = 'C';
    // console.log(currentTemp.innerText);
  } else if (currentTempType.innerText === 'C') {
    currentTempNum = Number(currentTempNum) * (9 / 5) + 32;
    currentTempType.innerText = 'F';
  }
};

const updateCity = () => {
  const locationInput = document.querySelector('.location').value;
  const city = document.querySelector('#city-name');
  city.innerText = locationInput;
};

// const getLatLon = () => {
//   const city = document.querySelector('#city-name');
//   axios
//     .get('http://127.0.0.1:5000/location', {
//       params: {
//         q: city,
//       },
//     })
//     .then((response) => {
//       const latitude = response.data[0]['lat'];
//       const longitude = response.data[0]['lon'];
//       return [latitude, longitude];
//     })
//     .catch((error) => {
//       console.log(`Error: ${error.response.status}`);
//     });
// }

// const getWeather = () => {
//   const [latitude, longitude] = getLatLon();
//   axios
//     .get('http://127.0.0.1:5000/weather', {
//       params: {
//         lat: latitude,
//         lon: longitude
//       }
//     })
//     .then((response) => {

//     })
// }

const getLatLon = async () => {
  const cityInput = document.querySelector('.location');
  const city = cityInput.value;
  let response = await axios
    .get('http://127.0.0.1:5000/location', { params: { q: city } })
    .catch((error) => {
      cityInput.placeholder = 'Please enter a valid city';
      cityInput.placeholder.style.color = 'red';
      console.log(`Error: ${error.response.status}`);
    });
  const latitude = response.data[0]['lat'];
  const longitude = response.data[0]['lon'];
  return [latitude, longitude];
};

const getWeather = async (latitude, longitude) => {
  // const [latitude, longitude] = await getLatLon();
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .catch((error) => {
      console.log(`Error: ${error.response.status}`);
    });
};

const updateWeather = async () => {
  const [latitude, longitude] = await getLatLon();
  const response = await getWeather(latitude, longitude);
  // const weather = response.data.weather[0].description;
  const weatherAPIType = response.data['weather'][0]['main'];
  const weatherType = document.querySelector('#weather-type');
  weatherType.innerText = weatherAPIType;

  // const weatherAPITemp = response.data.main.temp;
  const apiTemp = response.data['main']['temp'];
  state.temp = Math.round(apiTemp);
  const temp = document.querySelector('#temp-num');
  temp.innerText = state.temp;

  const apiCity = response.data['name'];
  const cityInput = document.querySelector('.location');
  cityInput.value = apiCity;

  tempChangeUpdateUI();
  updateCity();
};

const selectSky = () => {
  const skyOptions = document.querySelector('#sky-select');
  const skyBg = document.querySelector('#app');
  if (skyOptions.value === 'rainy') {
    skyBg.style.backgroundImage = 'url("/assets/rain-op-2.png")';
  } else if (skyOptions.value === 'sunny') {
    skyBg.style.backgroundImage = 'url("/assets/sunny.png")';
  } else if (skyOptions.value === 'snowy') {
    skyBg.style.backgroundImage = 'url("/assets/snow-op-2.png")';
  } else if (skyOptions.value === 'cloudy') {
    skyBg.style.backgroundImage = 'url("/assets/cloudy.png")';
  }
};

const resetLocTemp = () => {
  const city = document.querySelector('.location');
  city.value = '';
  const weatherType = document.querySelector('#weather-type');
  weatherType.innerText = 'Search to get weather';
  const tempNum = document.querySelector('#temp-num');
  tempNum.innerText = '--';
  updateCity();
};

const currentTemp = document.querySelector('#temp-num');
currentTemp.innerText = state.temp;

const registerEventHandlers = () => {
  const decrTempBtn = document.querySelector('#decrement');
  decrTempBtn.addEventListener('click', decreaseTemp);

  const incrTempBtn = document.querySelector('#increment');
  incrTempBtn.addEventListener('click', increaseTemp);

  const tempButton = document.querySelector('#temp-info');
  tempButton.addEventListener('click', convertTemp);

  const cityInput = document.querySelector('.location');
  cityInput.addEventListener('input', updateCity);

  const submitBtn = document.querySelector('#submit');
  submitBtn.addEventListener('click', updateWeather);

  const skyOptions = document.querySelector('#sky-select');
  skyOptions.addEventListener('change', selectSky);

  const resetBtn = document.querySelector('#reset-btn');
  resetBtn.addEventListener('click', resetLocTemp);
};

window.addEventListener('load', tempChangeUpdateUI);
document.addEventListener('DOMContentLoaded', registerEventHandlers);
