('use strict');

const state = {
  temperature: 70,
  cityName: '',
};

const updateTemperature = () => {
  const tempDisplay = document.getElementById('temp-display');
  tempDisplay.textContent = `${state.temperature} degrees`;
  changeColor();
};

const incrementTemperature = (type) => {
  if (type === 'add') {
    state.temperature += 1;
  }
  if (type === 'subtract') {
    state.temperature -= 1;
  }
  updateTemperature();
};

const changeColor = () => {
  let tempDisplay = document.getElementById('temp-display');
  let landScape = document.getElementById('landscape-display');
  if (state.temperature >= 80) {
    tempDisplay.style.color = 'red';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    tempDisplay.style.color = 'orange';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    tempDisplay.style.color = 'yellow';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    tempDisplay.style.color = 'Green';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    tempDisplay.style.color = 'Teal';
    landScape.textContent = '🌨❄️⛄️☃️❄️🌨⛄️☃️❄️🌨';
  }
};

const changeCityName = (input) => {
  state.cityName = input;
  const cityName = document.getElementById('city-name');
  cityName.textContent = state.cityName;
};

const getWeather = () => {
  // const axios = require('axios');
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: `${state.cityName}` },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: { lat: lat, lon: lon },
        })
        .then((response) => {
          const tempKelvin = response.data.main.temp;
          state.temperature = Math.round(1.8 * (tempKelvin - 273) + 32);
          updateTemperature();
        })
        .catch((error) => {
          console.log('error getting temperature');
          console.log(error);
        });
    })
    .catch((error) => {
      console.log('error getting coordinates');
      console.log(error);
    });
};

const initializeContent = () => {
  updateTemperature();
  changeCityName('Seattle');
};

const registerEventHandlers = () => {
  const tempUpButton = document.getElementById('temp-up-btn');
  tempUpButton.addEventListener('click', () => {
    incrementTemperature('add');
  });

  const tempDownButton = document.getElementById('temp-down-btn');
  tempDownButton.addEventListener('click', () => {
    incrementTemperature('subtract');
  });

  const cityInput = document.getElementById('input-city');
  cityInput.addEventListener('input', () => {
    changeCityName(cityInput.value);
  });

  const getTempButton = document.getElementById('get-temp-btn');
  getTempButton.addEventListener('click', () => {
    getWeather();
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', initializeContent);
