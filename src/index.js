'use strict';
// Leave this commented out:
// const { default: axios } = require("axios");

const state = {
  temperature: '',
  cityName: 'New York City',
  incButton: null,
  decButton: null,
  skyDropdown: null,
  resetButton: null,
  realtimeButton: null
};

const handleRealtimeTemp = () => {
  // calls proxy API and updates temp and webpage
  findLatitudeAndLongitude(state.cityName);
}

const findLatitudeAndLongitude = (city) => {
  axios.get('http://127.0.0.1:5000/location',
  {
    params: { q: city }
  })
  .then( (response) => {
    const latitude = response.data[0].lat;
    const longitude = response.data[0].lon;
    // finds weather for the lat and lon response
    getWeather(latitude, longitude);
  })
  .catch( (error) => {
    console.log('error in finding Latitude and Longitude!');
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
    const tempK = response.data.main.temp;
    // updates the temp state and webpage
    updateTempAndWebpage(tempK);
  })
  .catch( (error) => {
    console.log('error in getWeather!');
  });
}
const updateTempAndWebpage = (tempInKelvin) => {
  // converts temp to Farenheit and saves it to the state
  state.temperature = Math.floor((tempInKelvin - 273.15) * 9/5 + 32);
  // changes the temp on the website display
  updateTempOnWebpage();
  // changes the font color and landscape to match the temp
  changeColorAndLandscape();
}

const increaseTemp = () => {
  state.temperature += 1;
  updateTempOnWebpage();
  changeColorAndLandscape();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  updateTempOnWebpage();
  changeColorAndLandscape();
};

const updateTempOnWebpage = () => {
  const websiteTemp = document.getElementById('temp');
  websiteTemp.textContent = `${state.temperature}°F`;
}

const changeColorAndLandscape = () => {
  const websiteTemp = document.getElementById('temp');
  const websiteLandscape = document.getElementById('landscape');
  if (state.temperature >= 80) {
    websiteTemp.className = 'temp_red';
    websiteLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (70 <= state.temperature && state.temperature < 80) {
    websiteTemp.className = 'temp_orange';
    websiteLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (60 <= state.temperature && state.temperature < 70) {
    websiteTemp.className = 'temp_yellow';
    websiteLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (50 <= state.temperature && state.temperature < 60) {
    websiteTemp.className = 'temp_green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (40 <= state.temperature && state.temperature < 50) {
    websiteTemp.className = 'temp_teal';
    websiteLandscape.textContent = '🌲☃️⛄️🌲⛄️❄️🌲❄️🌲☃️⛄️❄️🌲';
  } else if (state.temperature < 40) {
    websiteTemp.className = 'temp_aqua';
    websiteLandscape.textContent = '🧊🧊⛄️🌬️⛄️❄️☃️❄️🌬️🧊⛄️❄️☃️';
  }
};

const changeSkyType = () => {
  // Grabs the value that the user selected
  const selectedSky = state.skyDropdown.value;
  // selects HTML element with id="aboveEarth"
  const websiteSky = document.getElementById('aboveEarth');
  if (selectedSky === 'cloudy') {
    websiteSky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (selectedSky === 'sunny') {
    websiteSky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (selectedSky === 'rainy') {
    websiteSky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (selectedSky === 'snowy') {
    websiteSky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const changeCityName = () => {
  // Grabs the value of text that the user types in the input box
  const boxText = document.getElementById('search-box').value;
  // selects HTML header element with id="current_city"
  const city = document.getElementById('current_city');
  // assigns the HTML header element with id="current_city" to
  // the text that the user types
  city.textContent = boxText;
  state.cityName = boxText;
};

const resetCity = () => {
  const boxText = document.getElementById('search-box');
  boxText.value = '';
  // resets header to NYC
  const cityHeader = document.getElementById('current_city');
  state.cityName = 'New York City'
  cityHeader.textContent = state.cityName;
  // current weather in NYC
  handleRealtimeTemp();
};

const loadControls = () => {
  // buttons
  state.incButton = document.querySelector('#increaseButton');
  state.decButton = document.querySelector('#decreaseButton');
  state.resetButton = document.getElementById('cityResetButton');
  state.realtimeButton = document.getElementById('realtimeButton');
  // dropdown
  state.skyDropdown = document.querySelector('#sky_selector');
  // current weather in NYC
  handleRealtimeTemp();
}

const registerEventHandlers = () => {
  // button click functions
  state.incButton.addEventListener('click', increaseTemp);
  state.decButton.addEventListener('click', decreaseTemp);
  state.resetButton.addEventListener('click', resetCity);
  state.realtimeButton.addEventListener('click', handleRealtimeTemp);
  //dropdown box change function
  state.skyDropdown.addEventListener('change', changeSkyType);
  // text box input function
  const newCity = document.querySelector('#search-box');
  newCity.addEventListener('input', changeCityName);
};

document.addEventListener('DOMContentLoaded', loadControls);
document.addEventListener('DOMContentLoaded', registerEventHandlers);