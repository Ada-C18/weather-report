const BASE_URL = 'http://localhost:5000';

const state = {
  temp: 50,
  cityName: 'Seattle',
  lat: '',
  lon: '',
  // increaseButton: null,
  // decreaseButton: null,
  // skySelect: null,
  // cityInput: null,
  // temp: null,
  // cityName: null,
};

const landscapes = {
  '80+': '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  '70-79': '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  '60-69': '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  '59-': '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
};

const skies = {
  sunny: '☀️☁️☀️ ☁️ ☀️☁️ ☀️ ☁️ ☀️☁️☀️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const increaseTemp = (event) => {
  state.temp++;
  refreshUI(state.temp);
};

const decreaseTemp = (event) => {
  state.temp--;
  refreshUI(state.temp);
};

const refreshUI = function () {
  let tempDisplay = document.getElementById('tempDisplay');
  let landscapeDisplay = document.getElementById('landscapeDisplay');
  let skyDisplay = document.getElementById('skyDisplay');
  let cityNameDisplay = document.getElementById('cityNameDisplay');

  tempDisplay.textContent = state.temp;
  cityNameDisplay.textContent = state.cityName;
  skyDisplay.textContent = skies[skySelect.value];

  if (state.temp > 79) {
    tempDisplay.style.color = 'Red';
    landscapeDisplay.textContent = landscapes['80+'];
    landscapeDisplay.images = 'images/sunny.jpg';
  } else if (state.temp > 69) {
    tempDisplay.style.color = 'Orange';
    landscapeDisplay.textContent = landscapes['70-79'];
  } else if (state.temp > 59) {
    tempDisplay.style.color = 'Yellow';
    landscapeDisplay.textContent = landscapes['60-69'];
  } else if (state.temp > 49) {
    tempDisplay.style.color = 'Green';
    landscapeDisplay.textContent = landscapes['59-'];
  } else {
    tempDisplay.style.color = 'Teal';
    landscapeDisplay.textContent = landscapes['59-'];
  }
};

const updateCity = () => {
  state.cityName = state.cityInput.value;
  refreshUI();
};

const updateCityTemp = (cityName) => {
  return axios
    .get(`${BASE_URL}/location?q=${state.cityName}`)
    .then((response) => {
      console.log(response);
      const lat = response.data[0]['lat'];
      const lon = response.data[0]['lon'];
      console.log({ lat, lon});
      refreshUI();
      return { lat, lon };
    })
    .catch((error) => console.log({ error }));
};
const cityWeather = (lat, lon) => {
  return axios
    .get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}`)
    .then((response) => {
      console.log(response)
      const temp = response.data.main.temp;
      state.temp = kelvinToFahrenheit(temp);
      return state.temp;
    })
    .catch((error) => console.log({ error }));
};
const getRealtimeInfo = async () => {
  const { lat, lon } = await updateCityTemp(state.cityName);
  state.temp = await cityWeather(lat, lon);
  refreshUI();
};

const updateSky = () => {
  refreshUI();
};

const kelvinToFahrenheit = (temp) => {
  return Math.floor(1.8 * (temp - 273.15) + 32);
};

const resetCity = () => {
state.cityName = 'Seattle';
  refreshUI();
};

const loadControls = () => {
  state.increaseButton = document.getElementById('increaseButton');
  state.decreaseButton = document.getElementById('decreaseButton');
  state.skySelect = document.getElementById('skySelect');
  state.cityInput = document.getElementById('cityInput');
  state.getTempButton = document.getElementById('getTempButton');
  state.resetButton = document.getElementById('resetButton');
};

const registerEvents = () => {
  state.increaseButton.addEventListener('click', increaseTemp);
  state.decreaseButton.addEventListener('click', decreaseTemp);
  state.skySelect.addEventListener('change', updateSky);
  state.cityInput.addEventListener('input', updateCity);
  state.cityInput.addEventListener('change', updateCityTemp);
  state.resetButton.addEventListener('click', resetCity);
  state.getTempButton.addEventListener('click', getRealtimeInfo);
};
document.addEventListener('DOMContentLoaded', registerEvents);
const onLoaded = () => {
  loadControls();
  registerEvents();
  resetCity();
};

onLoaded();
