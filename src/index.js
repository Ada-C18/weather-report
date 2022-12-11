const state = {
  currentTemp: 79,
};

// temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
  skyChanger();
};
const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
  skyChanger();
};
const changeTempColor = () => {
  const landscapeContainer = document.querySelector('#landscapeSection');
  const oldLandscape = document.getElementById('view');
  const newLandscape = document.createElement('span');
  newLandscape.setAttribute('id', 'view');
  const box = document.getElementById('currentTemp');
  if (state.currentTemp >= 80) {
    box.style.color = 'red';
    newLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    box.style.color = 'orange';
    newLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    box.style.color = 'yellow';
    newLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    box.style.color = 'green';
    newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    box.style.color = 'teal';
    newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  landscapeContainer.replaceChild(newLandscape, oldLandscape);
};

const skyChanger = () => {
  const skyContainer = document.getElementById('skyLandscape');

  if (document.getElementById('skyOption').value === 'sun') {
    document.querySelector('.mainSky');
    skyContainer.textContent = '🌤🌤🌤🌤🌤🌤🌤🌤🌤🌤🌤🌤🌤';
  }
  if (document.getElementById('skyOption').value === 'overcast') {
    document.querySelector('.mainSky');
    skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  }
  if (document.getElementById('skyOption').value === 'rain') {
    document.querySelector('.mainSky');
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  }
  if (document.getElementById('skyOption').value === 'snow') {
    document.querySelector('.mainSky');
    skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const getRealTimeTemp = () => {
  //   // input: cityName -> locationQ -> lat, lon
  //   // -> open weatherApp -> realTemp for the city (in lat, lon)
  //   // change the element of html page: currentTemp
  // const axios = require('axios');
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: 'Seattle',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in getRealTimeTemp!', latitude, longitude);
      const temperature = getTempByCity(latitude, longitude);
      return temperature;
    })
    .catch((error) => {
      console.log('error in getRealTimeTemp!');
    });
};

const getTempByCity = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      console.log('success in findWeather!', response.data.main.temp);
      return response.data.main.temp;
    })
    .catch((error) => {
      console.log('error in findWeather!');
    });
};

const registerEventHandlers = () => {
  const realTimeTemp = document.querySelector('#realTimeTemp');
  realTimeTemp.addEventListener('click', getRealTimeTemp);
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');
  up.addEventListener('click', increaseTemp);
  down.addEventListener('click', decreaseTemp);
  up.addEventListener('click', changeTempColor);
  down.addEventListener('click', changeTempColor);
  const input = document.querySelector('#cityName');
  input.addEventListener('keyup', updateValue);
  const cityContainer = document.querySelector('#resetbutton');
  cityContainer.addEventListener('click', resetCity);
  cityContainer.addEventListener('click', updateValue); // resetting input
  const skyHelper = document.getElementById('skyOption');
  skyHelper.addEventListener('change', skyChanger);
};

function updateValue(e) {
  const log = document.getElementById('cityNameShown');
  log.textContent = e.target.value;
}

const resetCity = () => {
  const cityContainer = document.getElementById('cityName');
  cityContainer.value = '';
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
