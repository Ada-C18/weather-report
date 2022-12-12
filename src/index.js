'use strict';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});

const convertToFahrenheit = (tempInKelvin) => {
  const fahrenheit = Math.round((tempInKelvin - 273.15) * (9 / 5) + 32);
  return fahrenheit;
};

const tempValue = document.getElementById('tempValue');

const state = {
  temperature: convertToFahrenheit(tempValue),
};

const getTemp = async () => {
  let newCity = document.getElementById('cityNameInput').value;
  const geoLocation = await instance
    .get('/location', {
      params: {
        key: 'LOCATION_KEY',
        q: newCity,
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
  state.temperature = Math.round(convertToFahrenheit(currentTemp));
  tempValue.textContent = state.temperature;
  changeTempAndGarden();
};

getTemp();

const increaseTemp = () => {
  state.temperature += 1;
  tempValue.textContent = state.temperature;
  changeTempAndGarden();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  tempValue.textContent = state.temperature;
  changeTempAndGarden();
};

const updateCityName = () => {
  const newCityName = document.getElementById('cityNameInput').value;
  document.getElementById('headerCityName').textContent = newCityName;
};

const resetToDefaultCity = () => {
  document.getElementById('headerCityName').textContent = 'Atlanta';
  cityNameInput.value = 'Atlanta';
};

const changeSky = () => {
  const inputSky = document.getElementById('skySelect').value;
  const skyBox = document.getElementById('sky');
  let sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  if (inputSky === 'sunny') {
    sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (inputSky === 'cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (inputSky === 'rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (inputSky === 'snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  skyBox.textContent = sky;
  const gardenContent = document.getElementById('gardenContent');
};

const changeTempAndGarden = () => {
  let temp = state.temperature;
  let color = 'white';
  let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  if (temp >= 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp <= 79 && temp >= 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp <= 69 && temp >= 60) {
    color = 'yellow-green';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59 && temp >= 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp <= 49) {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  const newLandscape = document.querySelector('#landscape');
  newLandscape.textContent = landscape;
  const newtemp = document.querySelector('#tempValue');
  newtemp.className = color;
};

const registerEventHandlers = () => {
  const increaseTempBtn = document.querySelector('#increaseTempControl');
  increaseTempBtn.addEventListener('click', increaseTemp);

  const decreaseTempBtn = document.querySelector('#decreaseTempControl');
  decreaseTempBtn.addEventListener('click', decreaseTemp);

  const cityNameInput = document.querySelector('#cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);

  const cityNameResetBtn = document.querySelector('#cityNameReset');
  cityNameResetBtn.addEventListener('click', resetToDefaultCity);

  const skySelectDropDown = document.querySelector('#skySelect');
  skySelectDropDown.addEventListener('change', changeSky);

  const realTimeTempBtn = document.querySelector('#realTimeTemp');
  realTimeTempBtn.addEventListener('click', getTemp);

  changeTempAndGarden();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
