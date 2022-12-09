'use strict';

const state = {
  cityName: null,
  currentTemp: 1,
};

const loadControls = () => {
  state.cityName = document.getElementById('city-name').textContent;
  state.currentTemp = document.getElementById('current-temp');
};

const setTempColor = (temp) => {
  // const temp = parseInt(state.currentTemp.textContent);
  if (temp >= 80) {
    state.currentTemp.className = 'eightyandabove';
  } else if (temp >= 70 && temp < 80) {
    state.currentTemp.className = 'seventies';
  } else if (temp >= 60 && temp < 70) {
    state.currentTemp.className = 'sixties';
  } else if (temp >= 50 && temp < 60) {
    state.currentTemp.className = 'fifties';
  } else {
    state.currentTemp.className = 'fourtiesandbelow';
  }
};

const setLandscape = (temp) => {
  // const temp = parseInt(state.currentTemp.textContent);
  const weatherGardenDisplay = document.querySelector(
    '#display-weather-garden'
  );
  if (temp >= 80) {
    weatherGardenDisplay.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp < 80) {
    weatherGardenDisplay.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp < 70) {
    weatherGardenDisplay.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59) {
    weatherGardenDisplay.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  const temp = document.querySelector('#current-temp');
  temp.textContent = parseInt(temp.textContent) + 1;
  setTempColor(parseInt(temp.textContent));
  setLandscape(parseInt(temp.textContent));
};

const decreaseTemp = () => {
  const temp = document.querySelector('#current-temp');
  temp.textContent = parseInt(temp.textContent) - 1;
  setTempColor(parseInt(temp.textContent));
  setLandscape(parseInt(temp.textContent));
};

const renameCity = () => {
  const cityInput = document.getElementById('city-input');
  let newCity = cityInput.value;
  const cityName = document.querySelector('#city-name');
  cityName.textContent = newCity;
  state.cityName = newCity;
  getLatLon(state.cityName).then((temperature) => {
    setTempColor(parseInt(temperature));
    setLandscape(parseInt(temperature));
  });
};

const getLatLon = (placeName) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: placeName,
      },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return getWeather(lat, lon);
    })
    .catch((error) => {
      console.log("Error! Can't find longitute and latitude");
    });
};

const getWeather = (lat, lon) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.main.temp;
      const tempFahr = Math.floor(1.8 * (tempKelvin - 273) + 32);
      state.currentTemp.textContent = tempFahr;
      return tempFahr;
    })
    .catch((error) => {
      console.log("Error! Can't find temperature");
    });
};

const currentTemp = () => {
  state.currentTemp = getLatLon(state.cityName);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increase-temp');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const citySubmit = document.querySelector('#rename-city');
  citySubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    renameCity();
  });

  const currentTempButton = document.querySelector('#current-temp-button');
  currentTempButton.addEventListener('click', currentTemp);
};

const onLoaded = () => {
  loadControls();
  getLatLon(state.cityName).then((temperature) => {
    setTempColor(parseInt(temperature));
    setLandscape(parseInt(temperature));
  });
};

onLoaded();

document.addEventListener('DOMContentLoaded', registerEventHandlers);
