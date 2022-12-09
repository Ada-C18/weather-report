'use strict';

function delay(fn, ms) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  };
}

const state = {
  increaseTemp: null,
  decreaseTemp: null,
  currentTempCount: 60,
  currentTemp: null,
  landscape: null,
  cityDisplay: null,
  cityInput: null,
  getTempButton: null,
  skyDropDown: null,
  skyDisplay: null,
  weatherGardenSection: null,
  resetButton: null,
};

const loadsControls = () => {
  state.increaseTemp = document.getElementById('increaseTemp');
  state.decreaseTemp = document.getElementById('decreaseTemp');
  state.currentTemp = document.getElementById('currentTemp');
  state.landscape = document.getElementById('landscape');
  state.cityDisplay = document.getElementById('city-display');
  state.cityInput = document.getElementById('city-input');
  state.getTempButton = document.getElementById('getTempButton');
  state.skyDropDown = document.getElementById('sky-dropdown');
  state.skyDisplay = document.getElementById('skyDisplay');
  state.weatherGardenSection = document.getElementById(
    'weather-garden-section'
  );
  state.resetButton = document.getElementById('reset-button');
};

const refreshTemp = () => {
  state.currentTemp.textContent = state.currentTempCount;
};

const handleIncreaseTempButtonClicked = (event) => {
  ++state.currentTempCount;
  refreshTemp();
  tempTextColorChange();
  landscapeChange();
};

const handleDecreaseTempButtonClicked = (event) => {
  --state.currentTempCount;
  refreshTemp();
  tempTextColorChange();
  landscapeChange();
};

const handleCityInputChanged = (event) => {
  state.cityDisplay.textContent = state.cityInput.value;
};

const getLatLon = (cityName) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityName,
      },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;

      return { lat, lon };
    });
};

const getWeather = (lat, lon) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.main.temp;
      const tempFahrenheit = 1.8 * (tempKelvin - 273) + 32;

      return tempFahrenheit;
    });
};

const getLocationAndWeather = () => {
  let promise = Promise.resolve();
  promise = promise
    .then(() => {
      return getLatLon(state.cityDisplay.textContent);
    })
    .then((response) => {
      return getWeather(response.lat, response.lon);
    })
    .then((response) => {
        state.currentTempCount = Math.floor(response);
        refreshTemp();
        tempTextColorChange();
        landscapeChange()
    })
};

const handleGetTempButtonClicked = (event) => {
  getLocationAndWeather();
};

const handleSkyDropDownChanged = (event) => {
  skyDisplayChange();
};

const handleResetButtonClicked = (event) => {
  state.cityDisplay.textContent = 'Honolulu';
  state.cityInput.value = '';
};

const registerEvents = () => {
  state.increaseTemp.addEventListener('click', handleIncreaseTempButtonClicked);
  state.decreaseTemp.addEventListener('click', handleDecreaseTempButtonClicked);
  state.cityInput.addEventListener(
    'input',
    delay(handleCityInputChanged, 1000)
  );
  state.getTempButton.addEventListener('click', handleGetTempButtonClicked);
  state.skyDropDown.addEventListener('change', handleSkyDropDownChanged);
  state.resetButton.addEventListener('click', handleResetButtonClicked);
};

const tempTextColorChange = () => {
  let temp = state.currentTempCount;
  if (temp <= 49) {
    state.currentTemp.style.color = 'teal';
  } else if (temp >= 50 && temp <= 59) {
    state.currentTemp.style.color = 'green';
  } else if (temp >= 60 && temp <= 69) {
    state.currentTemp.style.color = 'yellow';
  } else if (temp >= 70 && temp <= 79) {
    state.currentTemp.style.color = 'orange';
  } else {
    state.currentTemp.style.color = 'red';
  }
};

const landscapeChange = () => {
  let temp = state.currentTempCount;
  if (temp <= 59) {
    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp >= 60 && temp <= 69) {
    state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 70 && temp <= 79) {
    state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

const skyDisplayChange = () => {
  let sky = state.skyDropDown.value;
  if (sky === 'snowy') {
    state.skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    state.weatherGardenSection.style.backgroundColor =
      'grey';
  } else if (sky === 'rainy') {
    state.skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    state.weatherGardenSection.style.backgroundColor =
      'darkgrey';
  } else if (sky === 'cloudy') {
    state.skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    state.weatherGardenSection.style.backgroundColor =
      'lightgrey';
  } else if (sky === 'sunny') {
    state.skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    state.weatherGardenSection.style.backgroundColor =
      'lightblue';
  }
};

const onLoaded = () => {
  loadsControls();
  registerEvents();
  tempTextColorChange();
  landscapeChange();
  skyDisplayChange();
  getLocationAndWeather();
};

onLoaded();
