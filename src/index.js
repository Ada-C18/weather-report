// JS TOOLS
// Handle events
// Axios
// - requests to weather API
// - then, catch

// ------------- Wave 2 ----------------------
// 1. increase
let state = {
  temp: 60,
};

const addDegree = (event) => {
  // Crab Count Behavior
  state.temp += 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
  updateColorsAndEmojis();
};

// 2. decrease
const subtractDegree = (event) => {
  // Crab Count Behavior
  state.temp -= 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null

  tempContainer.textContent = state.temp;
  updateColorsAndEmojis();
};

// 2. temp ranges
// -- number color changes
const updateColorsAndEmojis = () => {
  if (state.temp > 80) {
    document.getElementById('degrees').style.color = 'red';
    document.getElementById('emojis').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    document.getElementById('degrees').style.color = 'orange';
    document.getElementById('emojis').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    document.getElementById('degrees').style.color = 'yellow';
    document.getElementById('emojis').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp > 50 && state.temp <= 59) {
    document.getElementById('degrees').style.color = 'green';
    document.getElementById('emojis').innerText = '🌲🌲';
  } else if (state.temp < 59) {
    document.getElementById('degrees').style.color = 'teal';
    document.getElementById('emojis').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

// registers all handles once DOM loaded
const registerHandlers = (event) => {
  //  TODO: set state temp default value
  // setup #degree when page is first loaded

  const downArrow = document.querySelector('#down-arrow');
  downArrow.addEventListener('click', subtractDegree);

  const upArrow = document.querySelector('#up-arrow');
  upArrow.addEventListener('click', addDegree);

  const changeTempColor = document.querySelector('#degrees');

  const updateCityName = document.querySelector('#search-bar');
  updateCityName.addEventListener('input', updateCity); // 'input'

  changeTempColor.addEventListener('click', updateColorsAndEmojis); // is 'click' the rigth event?
};

document.addEventListener('DOMContentLoaded', registerHandlers);

// ------------- Wave 3 ----------------------
const updateCity = () => {
  let myTextInput = document.getElementById('search-bar');

  let cityName = myTextInput.value;

  let cityHeader = document.getElementById('city-name');

  cityHeader.textContent = `City of: ${cityName}`;
};

// ------------- Wave 4 --------------------
// LocationIQ and OpenWeather

// In order to get the weather of the city, we will need to get the latitude and longitude of the city using the LocationIQ API.
// We can then use the latitude and longitude with the OpenWeather API to get current weather data.

// TODO: need to connect weather proxy server

// 1. FIND LATITUDE AND LONGITUDE
// LOCATION_API_URL = "https://us1.locationiq.com/v1/search.php"

// const axios = require('axios');

// const LOCATIONIQ_KEY = process.env['LOCATION_KEY'];
// const axios = require('axios/dist/browser/axios.cjs');
let axios;
const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        // key: LOCATION_KEY,
        q: query,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });

  return {
    cityLat: latitude,
    cityLon: longitude,
  };
};
// findLatitudeAndLongitude('Seattle');
// 2. GET WEATHER WITH LAT AND LONG
// WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        // find info in doc
        lat,
        lon: (latitude, longitude),
        // appid: WEATHER_KEY, // open weather API key
      },
    })
    .then((response) => {
      console.log('success in getWeather!', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('error in getWeather!');
    });
};

// call getWeather when get-temp button is clicked

// **********To-Do**********

// - [ ]  Wave 2
//     - [ ]  Show default temp
//     - [ ]  Add emojis up and down arrows-
// - [ ]  Finish wave 4
//     - [ ]  button - Milena
//     - [ ]  get API functions working - together office hours
// - [ ]  Wave 5 - Milena
// - [ ]  Wave 6 - Puja
