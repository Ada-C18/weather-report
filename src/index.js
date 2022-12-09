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

const makeRealtimeTempUpdates = () => {
  // calls proxy API to get lat and lon
  getLatLon(state.cityName)
    .then(({latitude, longitude}) => {
      // calls proxy API to get temp
      getWeather(latitude, longitude)
        .then(({tempK}) => {
          // update temp state
          updateTempState(tempK);
          updateTempOnWebpage();
          changeColorAndLandscape();
        })
        .catch( (error) => {
          console.log('error in getWeather!');
        });
    })
    .catch( (error) => {
      console.log('error in getLatLon!');
  });
}

const getLatLon = async (city) => {
  const latLonresponse = await axios.get('http://127.0.0.1:5000/location', {
    params: { 
      q: city 
    }
  });
    const latitude = latLonresponse.data[0].lat;
    const longitude = latLonresponse.data[0].lon;
    return {latitude, longitude};
}

const getWeather = async (apiLatitude, apiLongitude) => {
  const weatherResponse = await axios.get('http://127.0.0.1:5000/weather',
  {
    params: {
      lat: apiLatitude,
      lon: apiLongitude
    }
  });
    const tempK = weatherResponse.data.main.temp;
    return {tempK};
}

const updateTempState = (tempInKelvin) => {
  // converts temp to Farenheit and saves it to the state
  state.temperature = Math.floor((tempInKelvin - 273.15) * 9/5 + 32);
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
  const userInput = document.getElementById('search-box').value;
  const cityTitle = document.getElementById('cityHeader');
  // assign header to user input
  cityTitle.textContent = userInput;
  state.cityName = userInput;
};

const resetCity = () => {
  const boxText = document.getElementById('search-box');
  boxText.value = '';
  // resets header to NYC
  const cityHeader = document.getElementById('cityHeader');
  state.cityName = 'New York City'
  cityHeader.textContent = state.cityName;
  // set current weather of NYC
  makeRealtimeTempUpdates();
};

const loadControls = () => {
  // button state
  state.incButton = document.querySelector('#increaseButton');
  state.decButton = document.querySelector('#decreaseButton');
  state.resetButton = document.querySelector('#cityResetButton');
  state.realtimeButton = document.querySelector('#realtimeButton');
  // dropdown state
  state.skyDropdown = document.querySelector('#sky_selector');
  // set current weather of NYC
  makeRealtimeTempUpdates();
}

const registerEventHandlers = () => {
  // button click functions
  state.incButton.addEventListener('click', increaseTemp);
  state.decButton.addEventListener('click', decreaseTemp);
  state.resetButton.addEventListener('click', resetCity);
  state.realtimeButton.addEventListener('click', makeRealtimeTempUpdates);
  //dropdown box change function
  state.skyDropdown.addEventListener('change', changeSkyType);
  // text box input function
  const newCity = document.querySelector('#search-box');
  newCity.addEventListener('input', changeCityName);
};

document.addEventListener('DOMContentLoaded', loadControls);
document.addEventListener('DOMContentLoaded', registerEventHandlers);