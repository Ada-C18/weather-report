'use strict';

const DEFAULT_CITY = 'Seattle';
// Select the HTML Element the event will occur on
const increaseTempElement = document.getElementById('increaseTempBtn');
const decreaseTempElement = document.getElementById('decreaseTempBtn');
const currentTempTag = document.getElementById('currentTemp');
const landscape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const cityNameReset = document.getElementById('cityNameReset');
const SkyDropDown = document.getElementById('SkyChoice');
const realtimeTemp = document.getElementById('realTempBtn');

const changingTempColorAndLandscape = () => {
  let currentTemp = parseInt(currentTempTag.textContent);
  if (currentTemp >= 80) {
    currentTempTag.className = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (currentTemp >= 70) {
    currentTempTag.className = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    currentTempTag.className = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50) {
    currentTempTag.className = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    currentTempTag.className = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changingSky = () => {
  if (SkyDropDown.value === 'sunny') {
    sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (SkyDropDown.value === 'cloudy') {
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (SkyDropDown.value === 'rainy') {
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else {
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

//Wave 4 API

// const findLatLon = (query) => {
//   let latitude, longitude;
//   return axios
//     .get('http://127.0.0.1:5000/location', {
//       q: query,
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log('success!', latitude, longitude);
//       return getWeather({ lat: latitude, lon: longitude });
//     })
//     .catch((error) => {
//       console.log('error!');
//     });
// };

// const getWeather = (query) => {
//   return axios
//     .get('http://127.0.0.1:5000/weather', {
//       params: {
//         lat: query.lat,
//         lon: query.lon,
//       },
//     })
//     .then((response) => {
//       return Math.floor((response.data.main.temp - 273.15) * 1.8 + 32);
//     })
//     .catch((error) => {
//       console.log('error!');
//     });
// };

const findLatLon = () => {
  const query_city = cityNameInput.value;
  console.log(query_city);
  return axios
    .get('http://127.0.0.1:5000/location', {
      q: query_city,
    })
    .then((response) => {
      console.log(response);
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      console.log('success!', latitude, longitude);
      return { lat: latitude, lon: longitude };
    })
    .catch((error) => {
      console.log('findLatLon error!');
    });
};

const getWeather = (query) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: query.lat,
        lon: query.lon,
      },
    })
    .then((response) => {
      temp = Math.floor((response.data.main.temp - 273.15) * 1.8 + 32);
      return temp;
    })
    .catch((error) => {
      console.log('getWeather error!');
    });
};

realtimeTemp.addEventListener('click', () => {
  findLatLon();
  currentTemp.textContent = temp;
});

// Register that function as an 'event listener'
// increaseTempElement.addEventListener('click', increaseTemperature);
increaseTempElement.addEventListener('click', () => {
  currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
  changingTempColorAndLandscape();
});
// decreaseTempElement.addEventListener('click', decreaseTemperature);
decreaseTempElement.addEventListener('click', () => {
  currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
  changingTempColorAndLandscape();
});

cityNameInput.addEventListener('input', (inputEvent) => {
  headerCityName.textContent = inputEvent.target.value;
});

cityNameReset.addEventListener('click', () => {
  cityNameInput.value = DEFAULT_CITY;
  headerCityName.textContent = DEFAULT_CITY;
});

SkyDropDown.addEventListener('change', () => {
  changingSky();
});

const init = () => {
  headerCityName.textContent = DEFAULT_CITY;
  cityNameInput.value = DEFAULT_CITY;
};
init();
// Make a function to run when it occurs
// const increaseTemperature = () => {
//   currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
// };
// const decreaseTemperature = () => {
//   currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
// };
