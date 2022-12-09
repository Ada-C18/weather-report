'use strict';

// const axios = require('axios')
// import axios from 'axios'

const state = {
  temp: 65,
  city: "Seattle",
  lat: 47.6038321,
  long: -122.330062
};

const tempUnitConvert = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32; 
}

const findLocLatAndLon = () => {
  axios.get("http://127.0.0.1:5000/location", {
    params: {
      q: state.city
    }
  })
  .then((response) => {
    state.lat = response.data[0].lat;
    state.long = response.data[0].lon;
    retrieveWeather();
  })
  .catch((error) => {
    console.log("Error: Cannot retrieve latitude and longitude");
    console.log(error);
  });
};

const retrieveWeather = () => {
  axios.get("http://127.0.0.1:5000/weather", {
    params: {
      lat: state.lat,
      lon: state.long
    }
  })
  .then((response) => {
    const currentWeather = response.data;
    console.log(currentWeather);
    state.temp = Math.floor(tempUnitConvert(currentWeather.main.temp));
    changeTempColorAndGardenLandscape();
  })
  .catch((error) => {
    console.log("Error: Cannot retrieve weather");
    console.log(error);
  })
};


const changeTempColorAndGardenLandscape = () => {
  let temp = state.temp;
  let color = "yellow";
  let landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  if (temp > 80) {
    color = "red";
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = "orange";
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = "yellow";
    landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp > 50) {
    color = "green";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    color = "teal";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }

  const currentTemp = document.querySelector("#temp_value");
  currentTemp.textContent = state.temp
  currentTemp.className = color;
  const currentLandscape = document.querySelector("#landscape");
  currentLandscape.textContent = landscape;
};


const increaseTemp = () => {
  state.temp++;
  changeTempColorAndGardenLandscape();
};

const decreaseTemp = () => {
  state.temp--;
  changeTempColorAndGardenLandscape();
}

const changeTopCityName = () => {
  const inputCityName = document.getElementById("name").value;
  const topCityName = document.getElementById("cityname");
  state.city = inputCityName;
  topCityName.textContent = state.city;
};

const resetCityInput = () => {
  const cityNameInput = document.getElementById("name");
  cityNameInput.value = "Seattle";
  changeTopCityName();
};


const registerEventHandlers = (event) => {
  changeTempColorAndGardenLandscape();

  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);

  changeTopCityName();
  const changeCityNameInHeader = document.querySelector('#name');
  changeCityNameInHeader.addEventListener('input', changeTopCityName);

  const resetCityNameBackToSeattle = document.getElementById('reset_button');
  resetCityNameBackToSeattle.addEventListener('click', resetCityInput);

  const getRealTimeTemp = document.getElementById('realtime_temp');
  getRealTimeTemp.addEventListener('click', findLocLatAndLon);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);