'use strict';
// Leave this commented out:
// const { default: axios } = require("axios");

const state = {
  temperature: 75,
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  aboveEarth: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  skyDropdown: null,
  cityBox: null,
  cityReset: null,
};

const callProxyAPIs = () => {
  findLatitudeAndLongitude(state.cityBox);
}

const findLatitudeAndLongitude = (city) => {
  let latitude, longitude;
  axios.get('http://127.0.0.1:5000/location',
  {
    params: {
      q: city,
    }
  })
  .then( (response) => {
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log('success in findLatitudeAndLongitude!', latitude, longitude);
    
    getWeather(latitude, longitude);
  })
  .catch( (error) => {
    console.log('error in finding Latitude and Longitude!', error);
  });
}

const getWeather = (latitudeW, longitudeW) => {
  axios.get('http://127.0.0.1:5000/weather',
  {
    params: {
      lat: latitudeW,
      lon: longitudeW
    }
  })
  .then( (response) => {
    console.log('success in getWeather!', response.data);
    const data = response.data;
    updateTempAndWebpage(data);
  })
  .catch( (error) => {
    console.log('error in getWeather!');
  });
}
const updateTempAndWebpage = (APIdata) => {
  const tempKelvin = APIdata.main.temp;
  // converts temp to Farenheits and saves it to the state
  state.temperature = Math.floor((tempKelvin - 273.15) * 9/5 + 32);
  // changes the temp on the website display
  temp.textContent = `${state.temperature}°F`;
  // changes the font color and landscape to match the temp
  changeColorAndLandscape();
  console.log("temp should be updated to the current city now!")

}

const increaseTemp = () => {
  state.temperature += 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°F`;
  changeColorAndLandscape();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°F`;
  changeColorAndLandscape();
};

const changeColorAndLandscape = () => {
  // selects HTML element with id="temp"
  const tempColor = document.getElementById('temp');
  // selects HTML element with id="landscape"
  const landscapeUpdate = document.getElementById('landscape');
  if (state.temperature >= 80) {
    tempColor.className = 'temp_red';
    landscapeUpdate.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (70 <= state.temperature && state.temperature < 80) {
    tempColor.className = 'temp_orange';
    landscapeUpdate.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (60 <= state.temperature && state.temperature < 70) {
    tempColor.className = 'temp_yellow';
    landscapeUpdate.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (50 <= state.temperature && state.temperature < 60) {
    tempColor.className = 'temp_green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (40 <= state.temperature && state.temperature < 50) {
    tempColor.className = 'temp_teal';
    landscapeUpdate.textContent = '🌲☃️⛄️🌲⛄️❄️🌲❄️🌲☃️⛄️❄️🌲';
  } else if (state.temperature < 40) {
    tempColor.className = 'temp_aqua';
    landscapeUpdate.textContent = '🧊🧊⛄️🌬️⛄️❄️☃️❄️🌬️🧊⛄️❄️☃️';
  }
};

const changeSkyType = () => {
  // Grabs the value that the user selected
  const selectorVal = document.getElementById('sky_selector').value;
  // selects HTML element with id="aboveEarth"
  const sky = document.getElementById('aboveEarth');
  if (selectorVal === 'cloudy') {
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (selectorVal === 'sunny') {
    sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (selectorVal === 'rainy') {
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (selectorVal === 'snowy') {
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const changeCityName = () => {
  // Grabs the value of text that the user types in the input box
  const cityBoxVal = document.getElementById('search-box').value;
  // selects HTML header element with id="current_city"
  const city = document.getElementById('current_city');
  // assigns the HTML header element with id="current_city" to
  // the text that the user types
  city.textContent = cityBoxVal;
  state.cityBox = cityBoxVal;
};

const resetCity = () => {
  const searchedCityName = document.getElementById('search-box');
  searchedCityName.value = 'New York';
  changeCityName();
};

const registerEventHandlers = () => {
  const incButton = document.querySelector('#increaseButton');
  incButton.addEventListener('click', increaseTemp);

  const decButton = document.querySelector('#decreaseButton');
  decButton.addEventListener('click', decreaseTemp);

  const skyDropdown = document.querySelector('#sky_selector');
  skyDropdown.addEventListener('change', changeSkyType);

  const cityBox = document.querySelector('#search-box');
  cityBox.addEventListener('input', changeCityName);

  const cityReset = document.getElementById('cityReset');
  cityReset.addEventListener('click', resetCity);

  const realtimeButton = document.getElementById('realtimeButton');
  realtimeButton.addEventListener('click', callProxyAPIs);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
