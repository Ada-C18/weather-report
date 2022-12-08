'use strict';

const state = {
  temp: 70,
};

const LOCATION_ENDPOINT = 'http://localhost:5000/location';
const WEATHER_ENDPOINT = 'http://localhost:5000/weather';

/* Used to convert temperature results to a scale useful
for people on Earth, rather than Pluto.*/
const kelvinToFahrenheit = (degreeKelvin) => {
  return ((degreeKelvin - 273.15) * 9) / 5 + 32;
};

const handlerLatLon = (response) => {
  const lat = response.data[0].lat;
  const lon = response.data[0].lon;
  console.log('lat: ' + lat);
  console.log('lon: ' + lon);
  return { lat: lat, lon: lon };
};

const handlerTemp = (response) => {
  const fahrenheit = kelvinToFahrenheit(response.data.main.temp);
  console.log('Temp: ' + fahrenheit);
  return fahrenheit;
};

/* Queries the location api for the latitude and longitude 
matching search string. Returns an object with the lat and lon.
*/
const getLatLon = (searchString) => {
  return axios
    .get(LOCATION_ENDPOINT, { params: { q: searchString } })
    .then(handlerLatLon)
    .catch((response) => console.log(response));
};

/* Queries the weather api for the temperature for lat/lon (passed as an
  object.) Returns temperature. 
*/
const getTemp = (latLonObj) => {
  // latLonObj['units'] = 'imperial'; // specify fahrenheit
  // units field isn't passed to the weather api.
  console.log(latLonObj);
  return axios
    .get(WEATHER_ENDPOINT, {
      params: latLonObj,
    })
    .then(handlerTemp)
    .catch((response) => console.log(response));
};

/* Get the temperature for searchString using locationIQ for 
lat+lon and OpenWeather for temperature.
*/
const getTempFromSearch = (searchString) => {
  const latLonPromise = getLatLon(searchString);
  const tempPromise = latLonPromise.then(getTemp);
  return tempPromise;
};

const increaseTemperature = (event) => {
  state.temp += 1;
  const tempCount = document.querySelector('#temperatureDisplay');
  tempCount.textContent = ` ${state.temp} ℉`;
};

const decreaseTemperature = (event) => {
  state.temp -= 1;

  const tempCount = document.querySelector('#temperatureDisplay');
  tempCount.textContent = ` ${state.temp} ℉`;
};
const changeTempColor = () => {
  if (state.temp <= 49) {
    document.querySelector('#temperatureDisplay').style.color = 'blue';
  } else if (state.temp > 49 && state.temp <= 59) {
    document.querySelector('#temperatureDisplay').style.color = 'green';
  } else if (state.temp > 59 && state.temp <= 69) {
    document.querySelector('#temperatureDisplay').style.color = 'yellow';
  } else if (state.temp > 69 && state.temp <= 79) {
    document.querySelector('#temperatureDisplay').style.color = 'orange';
  } else if (state.temp > 79) {
    document.querySelector('#temperatureDisplay').style.color = 'red';
  }
};

const resetCity = (event) => {
  const resetTheCity = document.querySelector('#cityNameDisplay');
  resetTheCity.textContent = 'Seattle';
  const city = document.querySelector('#cityName');
  city.value = '';
};

const changeLandscape = (event) => {
  if (state.temp <= 59) {
    document.querySelector('#weatherGarden').textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temp > 59 && state.temp <= 69) {
    document.querySelector('#weatherGarden').textContent =
      '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp > 69 && state.temp <= 79) {
    document.querySelector('#weatherGarden').textContent =
      '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp > 79) {
    document.querySelector('#weatherGarden').textContent =
      '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};
const inputCity = (event) => {
  const city = document.querySelector('#cityName');
  const displayName = document.querySelector('#cityNameDisplay');
  displayName.textContent = city.value;
};

const changeSky = (event) => {
  const skySelector = document.querySelector('#skySelector');
  const sky = document.querySelector('#weatherGarden');
  if (skySelector.value === 'cloudy') {
    document.querySelector('#weatherGarden').textContent +=
      '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  }
};

const registerEventHandlers = (event) => {
  const increaseTemp = document.querySelector('#increaseTemperature');
  increaseTemp.addEventListener('click', increaseTemperature);

  const decreaseTemp = document.querySelector('#reduceTemperature');
  decreaseTemp.addEventListener('click', decreaseTemperature);

  const changeColorOnHotter = document.querySelector('#increaseTemperature');
  changeColorOnHotter.addEventListener('click', changeTempColor);

  const changeColorOnColder = document.querySelector('#reduceTemperature');
  changeColorOnColder.addEventListener('click', changeTempColor);

  const defaultCity = document.querySelector('#cityReset');
  defaultCity.addEventListener('click', resetCity);

  // const defaultTempColor = document.querySelector("#loadTemperature");
  // defaultTempColor.addEventListener("click", changeTempColor);

  const newLandscapeOnincrease = document.querySelector('#increaseTemperature');
  newLandscapeOnincrease.addEventListener('click', changeLandscape);

  const newLandscapeOnDecreacse = document.querySelector('#reduceTemperature');
  newLandscapeOnDecreacse.addEventListener('click', changeLandscape);

  const newCity = document.querySelector('#cityName');
  newCity.addEventListener('input', inputCity);

  const newSky = document.querySelector('#skySelector');
  newSky.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// "use strict";

// const state = {
//   temp: 0,
// };

// const increaseTemperature = (event) => {
//   state.temp += 1;
//   const tempCount = document.querySelector("#tempCount")
//   tempCount.textContent = ` ${state.temp} Degrees`;

// };

// const decreaseTemperature = (event) => {
//   state.temp -= 1

//   const tempCount = document.querySelector("#tempCount")
//   tempCount.textContent = ` ${state.temp} Degrees`;

// };
// const changeTempColor = () => {

//   if (state.temp <= 49) {
//     document.querySelector("#tempCount").style.color = "purple";
//   } else if ( state.temp > 49 && state.temp <= 59){
//     document.querySelector("#tempCount").style.color = "green"
//   }else if ( state.temp > 59 && state.temp <= 69){
//     document.querySelector("#tempCount").style.color = "yellow"
//   }else if ( state.temp > 69 && state.temp <= 79){
//     document.querySelector("#tempCount").style.color = "orange"
//   } else if ( state.temp > 79){
//     document.querySelector("#tempCount").style.color = "red"
//   }
// }
// const registerEventHandlers = (event) => {
//   const increaseTemp = document.querySelector("#hotter");
//   increaseTemp.addEventListener("click", increaseTemperature);

//   const decreaseTemp = document.querySelector("#colder");
//   decreaseTemp.addEventListener("click", decreaseTemperature);

//   const changeColorOnHotter = document.querySelector("#hotter");
//   changeColorOnHotter.addEventListener("click", changeTempColor);

//   const changeColorOnColder = document.querySelector("#colder");
//   changeColorOnColder.addEventListener("click", changeTempColor);
// };

// document.addEventListener("DOMContentLoaded", registerEventHandlers);
