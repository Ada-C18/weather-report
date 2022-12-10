// JS TOOLS
// Handle events
// Axios
// - requests to weather API
// - then, catch

// ------------- Wave 2 ----------------------
// 1. increase
const state = {
  temp: 60,
  city: 'Seattle',
  sky: '☁️',
};

const addDegree = (event) => {
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

// ------------- Wave 3 ----------------------
const updateCity = () => {
  let myTextInput = document.getElementById('search-bar');

  let cityName = myTextInput.value;

  let cityHeader = document.getElementById('city-name');

  cityHeader.textContent = `City of: ${cityName}`;
  state.city = cityName;
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
const findLatitudeAndLongitude = () => {
  // let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        // key: LOCATION_KEY,
        q: state.city,
        format: 'json',
      },
    })
    .then((response) => {
      console.log(response.data);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: { lat: latitude, lon: longitude },
          // appid: WEATHER_KEY, // open weather API key
        })
        .then((response) => {
          console.log('success in getWeather!', response.data);
          return response.data;
        })
        .catch((error) => {
          console.log('error in getWeather!');
        });
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!', error);
    });

  return {
    cityLat: latitude,
    cityLon: longitude,
  };
};

// -------------- Wave 5 --------------------
const getSkyChoice = () => {
  const skyDropdown = document.querySelector('select');

  const skyChoice = skyDropdown.value;
  console.log('sky choice:', skyChoice);

  state.sky = skyChoice;
  // };

  if (state.sky === 'sunny') {
    document.getElementById('sky-emojis').innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'cloudy') {
    document.getElementById('sky-emojis').innerText =
      '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'rainy') {
    document.getElementById('sky-emojis').innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'snowy') {
    document.getElementById('sky-emojis').innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
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
  updateCityName.addEventListener('input', updateCity); // 'change'

  changeTempColor.addEventListener('click', updateColorsAndEmojis); // is 'click' the rigth event?

  // Wave 4
  // register Get Realtime Temperature button
  const tempButton = document.querySelector('#get-temp');
  // call getWeather when get-temp button is clicked
  tempButton.addEventListener('click', findLatitudeAndLongitude);

  // Wave 5
  const updateSky = document.querySelector('select');
  updateSky.addEventListener('change', getSkyChoice);
};

document.addEventListener('DOMContentLoaded', registerHandlers);

// findLatitudeAndLongitude('Seattle');
// 2. GET WEATHER WITH LAT AND LONG
// WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"

// const getWeather = (latitude, longitude) => {
//   axios
//     .get('http://127.0.0.1:5000/weather', {
//       params: { lat: latitude, lon: longitude },
//       // appid: WEATHER_KEY, // open weather API key
//     })
//     .then((response) => {
//       console.log('success in getWeather!', response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log('error in getWeather!');
//     });
// };

// **********To-Do**********

// - [ ]  Wave 2
//     - [ ]  Show default temp
//     - [x]  Add emojis up and down arrows-ms
// - [ ]  Finish wave 4
//     - [x]  button - Milena
//     - [ ]  get API functions working - together office hours
// - [ ]  Wave 5 - Milena
//    - [x] set up dropdown select element in HTML file
//    - [x] connect dropdown values to update sky emojis
// - [ ]  Wave 6 - Puja

// - [x]  Commit changes made during office hours
// - [ ]  Continue working through the to-do list on the README
//     - MS - will check off items in wave 5, add detailed commits, and notify Puja via slack about commits and when I’m done with wave 5
//     - Puja - Complete wave 6 and anything else working which isnt working and put little style using css and also add grid if possible.
//     - Git commit and ping Milena in slack about all commits.

// - [ ]  Submit project
//     - Create pull request - assigned to: Puja, when: Sunday
//     - Submit on learn - separately
