const state = {
  temperature: 70,
  cityName: 'Seattle',
  skyValue: 'Sunny',
};

const increaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');
  const landScape = document.querySelector('#landscape');

  state.temperature++;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
  changeLandScape(state.temperature, landScape);
};

const decreaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');
  const landScape = document.querySelector('#landscape');

  state.temperature--;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
  changeLandScape(state.temperature, landScape);
};

const changeTemperatureColor = (temp, tempDisplay) => {
  if (temp > 80) {
    tempDisplay.style.color = 'red';
  } else if (temp > 70) {
    tempDisplay.style.color = 'orange';
  } else if (temp > 60) {
    tempDisplay.style.color = 'yellow';
  } else if (temp > 50) {
    tempDisplay.style.color = 'lightgreen';
  } else if (temp <= 49) {
    tempDisplay.style.color = 'white';
  }
};

const changeLandScape = (temp, landscape) => {
  if (temp >= 80) {
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    landscape.textContent = `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`;
  } else if (temp > 50) {
    landscape.textContent = `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`;
  } else if (temp <= 49) {
    landscape.textContent = `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`;
  }
};

const changeCityName = (event) => {
  const cityName = document.querySelector('#city-name');
  const input = document.querySelector('#city-search').value;

  state.cityName = input;
  cityName.textContent = `${state.cityName}`;
};

const locationAPI = 'http://127.0.0.1:5000/location';
const weatherAPI = 'http://127.0.0.1:5000/weather';

const findLatAndLong = (query) => {
  axios
    .get(locationAPI, {
      params: {
        q: query,
        format: 'json',
      },
    })
    .then((response) => {
      // console.log(response.data);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log(`successfully found lat and lonL ${latitude}, ${longitude}`);
      console.log({ lat: latitude, lon: longitude });
      const latAndLon = { lat: latitude, lon: longitude };
      findTemp(latAndLon);
    })
    .catch((error) => {
      if (error.response) {
        console.log('error!', error.response.data);
      }
    });
};

const findTemp = (query) => {
  axios
    .get(weatherAPI, {
      params: {
        lat: query.lat,
        lon: query.lon,
      },
    })
    .then((response) => {
      console.log('findTemp successfully called');
      const tempKelvin = response.data.main.temp;
      console.log(tempKelvin);

      const tempFahrenheit = Math.round(1.8 * (tempKelvin - 273) + 32);
      console.log(tempFahrenheit);
      state.temperature = tempFahrenheit;
      const tempDisplay = document.querySelector('#temperature');
      tempDisplay.textContent = `${state.temperature}`;
    })
    .catch((error) => {
      if (error.response) {
        console.log('error getting temp', error.response.data);
      }
    });
};

const getTemp = (event) => {
  const input = document.querySelector('#city-search').value;
  findLatAndLong(input);
};

const changeSky = (event) => {
  const skyVal = document.querySelector('#sky-type').value;
  const sky = document.querySelector('#skyline');

  state.skyValue = skyVal;

  if (skyVal === 'Sunny') {
    sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyVal === 'Cloudy') {
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyVal === 'Rainy') {
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyVal === 'Snowy') {
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const resetCity = (event) => {
  const cityName = document.querySelector('#city-name');
  cityName.textContent = 'Seattle';
  state.cityName = 'Seattle';
  const searchBox = document.querySelector('#city-search');
  searchBox.value = state.cityName;
};

const registerEventHandlers = (event) => {
  console.log('registerEventHandlers called');
  const increaseButton = document.querySelector('#increase-temp');
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease-temp');
  decreaseButton.addEventListener('click', decreaseTemp);

  const citySearchButton = document.querySelector('#city-search');
  citySearchButton.addEventListener('change', changeCityName);

  const getCurrentTempButton = document.querySelector('#current-temp');
  getCurrentTempButton.addEventListener('click', getTemp);

  const skyMenu = document.querySelector('#sky-type');
  skyMenu.addEventListener('change', changeSky);

  const resetCityButton = document.querySelector('#reset-city');
  resetCityButton.addEventListener('click', resetCity);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
