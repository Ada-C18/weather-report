'use strict';

// ******* wave 2 *******
const defaultCity = 'Seattle';
let number = parseInt(document.querySelector('.number').innerHTML);

const state = { number: number };
const stateChange = (number) => {
  if (number >= 80) {
    document.querySelector('.number').style.color = 'red';
    document.querySelector('.landscape').innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (number >= 70) {
    document.querySelector('.number').style.color = 'orange';
    document.querySelector('.landscape').innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (number >= 60) {
    document.querySelector('.number').style.color = 'yellow';
    document.querySelector('.landscape').innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (number >= 50) {
    document.querySelector('.number').style.color = 'green';
    document.querySelector('.landscape').innerHTML =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    document.querySelector('.number').style.color = 'teal';
    document.querySelector('.landscape').innerHTML =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const plus = document.querySelector('.plus_minus'),
  minus = document.querySelector('.minus_plus');

plus.addEventListener('click', () => {
  number++;
  document.querySelector('.number').innerHTML = number;
  stateChange(number);
});

minus.addEventListener('click', () => {
  number--;
  document.querySelector('.number').innerHTML = number;
  stateChange(number);
});

// ******* wave 3 *******

let cityNameInsert = document.getElementById('cityNameInput');
cityNameInsert.addEventListener('input', (event) => {
  event.preventDefault();
  let cityName = event.target.value;
  document.getElementById('intro').innerHTML = cityName;
});

function getCityName(event) {
  let cityName = document.getElementById('cityNameInput');
  document.getElementById('intro').innerHTML = cityName.value;
  return cityName;
}

// ******* wave 4 *******

const API = 'http://127.0.0.1:5000/';

async function getTemperature(query) {
  let response = await axios.get(API + 'location' + '?q=' + query);
  const lat = response.data[0].lat;
  const lon = response.data[0].lon;


  response = await axios.get(API + 'weather' + '?lat=' + lat + '&lon=' + lon);
  const temp = response.data.main.temp;
  const FarenheitTemp = 1.8 * (temp - 273) + 32;
  document.getElementById('number').innerHTML = Math.round(FarenheitTemp);
  number = Math.round(FarenheitTemp);
  state.number = number;
  stateChange(number);
}

getTemperature(defaultCity);

let RealTime = document.getElementById('realTime');
RealTime.addEventListener('click', getRealTime);

function getRealTime() {
  let getCity = document.getElementById('cityNameInput').value;
  getTemperature(getCity);
  stateChange(state.number);
}

// ******* wave 5 *******

function displaySky() {
  let skyImageDisplay = document.getElementById('skySelect').value;
  document.getElementById('skyImage').innerHTML = skyImageDisplay;
  if (skyImageDisplay === '☁️ ☁️ ☁️ ☀️ ☁️ ☁️') {
    document.getElementById('weatherGardenBox').style.background = '#CDFCF6';
  } else if (skyImageDisplay === '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️') {
    document.getElementById('weatherGardenBox').style.background = '#EFF5F5';
  } else if (skyImageDisplay === '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧') {
    document.getElementById('weatherGardenBox').style.background = '#D8D9CF';
  } else if (skyImageDisplay === '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨') {
    document.getElementById('weatherGardenBox').style.background = '#DFF6FF';
  } else {
    document.getElementById('weatherGardenBox').style.background = '#CFF5E7';
  }
}

// ******* wave 6 *******

document.getElementById('reset').onclick = function () {
  document.getElementById('intro').innerHTML = defaultCity;
  getTemperature(defaultCity);
  document.getElementById('cityNameInput').value = '';
};
