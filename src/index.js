const axios = require('axios');

const state = {
  Temperature: 0,
};

const increaseTemp = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  console.log('increaseTemp clicked');
  state.Temperature += 1;
  tempContainer.textContent = `${state.Temperature}`;
};

const decreaseTemp = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  state.Temperature -= 1;
  tempContainer.textContent = `${state.Temperature}`;
};

const tempRange = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  const landscapeContainer = document.querySelector('#landscape');
  if (state.Temperature >= 80) {
    tempContainer.style.color = 'red';
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.Temperature <= 79 && state.Temperature >= 70) {
    tempContainer.style.color = 'orange';
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.Temperature <= 69 && state.Temperature >= 60) {
    tempContainer.style.color = 'yellow';
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.Temperature <= 59 && state.Temperature >= 50) {
    tempContainer.style.color = 'green';
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.Temperature <= 49) {
    tempContainer.style.color = 'teal';
  }
};

const chooseCityName = (event) => {
  const cityName = document.querySelector('#cityName');
  const inputContainer = document.querySelector('#inputCityName');
  cityName.textContent = inputContainer.value;
};

const updateTemperature = (event) => {
  const cityName = document.querySelector('#cityName');
  const tempContainer = document.querySelector('#tempContainer');
  //using cityname, make GET request to LocationIQ to get coordinates
  axios
    .get(`localhost:5000/location?q=${cityName.textContent}`)
    .then((response) => {
      const latitude = response[0]["lat"];
      const longitude = response[0]["lon"];
  })
    .catch((error) => {
      console.log("Error")
    })
  //make GET request to OpenWeatherAPI to get current temperature
  axios
    .get(`localhost:5000/weather?lat=${latitude}&lon=${longitude}`)
    .then((response) => {
      const temperatureKelvin = response["main"]["temp"];
      const temperatureFahrenheit = (((temperatureKelvin - 273.15) * 9) / 5) + 32;
      tempContainer.textContent = temperatureFahrenheit;
  })
    .catch((error) => {
      console.log("Error")
    })
}

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
  increaseTempButton.addEventListener('click', tempRange);
  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);
  decreaseTempButton.addEventListener('click', tempRange);
  const inputCityName = document.querySelector('#inputCityName');
  inputCityName.addEventListener('input', chooseCityName);
  const updateTempButton = document.querySelector('#updateTempButton');
  updateTempButton.addEventListener('click', updateTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
