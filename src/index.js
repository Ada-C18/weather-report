//This should be deleted if added: const { Axios } = require("axios");

'use strict';

const setTempColor = () => {
  const temp = document.querySelector('#temp');
  const Fahrenheit = parseInt(temp.textContent);
  if (Fahrenheit >= 80) {
    temp.className = 'eightyandabove';
  } else if (Fahrenheit >= 70 && Fahrenheit < 80) {
    temp.className = 'seventies';
  } else if (Fahrenheit >= 60 && Fahrenheit < 70) {
    temp.className = 'sixties';
  } else if (Fahrenheit >= 50 && Fahrenheit < 60) {
    temp.className = 'fifties';
  } else {
    temp.className = 'fourtiesandbelow';
  }
};

const setLandscape = () => {
  const weatherGarden = document.querySelector('#weather-garden');
  const Fahrenheit = document.querySelector('#temp');
  const temp = parseInt(Fahrenheit.textContent);
  const weatherGardenDisplay = document.querySelector(
    '#display-weather-garden'
  );
  if (temp >= 80) {
    weatherGardenDisplay.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp < 80) {
    weatherGardenDisplay.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp < 70) {
    weatherGardenDisplay.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59) {
    weatherGardenDisplay.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

setTempColor();
setLandscape();

const increaseTemp = () => {
  const temp = document.querySelector('#temp');
  temp.textContent = parseInt(temp.textContent) + 1;
  setTempColor();
  setLandscape();
};

const decreaseTemp = () => {
  const temp = document.querySelector('#temp');
  temp.textContent = parseInt(temp.textContent) - 1;
  setTempColor();
  setLandscape();
};

const renameCity = () => {
  const cityInput = document.getElementById('city-input');
  let newCity = cityInput.value;
  console.log(newCity);
  const cityName = document.querySelector('#city-name');
  cityName.textContent = newCity;
};

const getLatLon = (placeName) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: placeName,
      },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      console.log(getWeather(lat, lon));
      return getWeather(lat, lon);
    })
    .catch((error) => {
      console.log("Error! Can't find longitute and latitude");
    });
};

const getWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.main.temp;
      tempFahr = 1.8 * (tempKelvin - 273) + 32;
      return tempFahr;
    })
    .catch((error) => {
      console.log("Error! Can't find temperature");
    });
};

getLatLon('San Francisco');

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increase-temp');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const citySubmit = document.querySelector('#rename-city');
  citySubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    renameCity();
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
