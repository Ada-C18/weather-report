const BASE_URL = 'http://localhost:5000';

const state = {};

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

const updateCityTemp = async () => {
  const cityLocation = await axios.get(
    `${BASE_URL}/location?q=${state.cityName}`
  );
  const lat = cityLocation.data[0]['lat'];
  const lon = cityLocation.data[0]['lon'];

  const cityWeather = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}`
  );

  tempKelvin = cityWeather.data['main']['temp'];
  state.temp = Math.floor(kelvinToFahrenheit(tempKelvin));
  refreshUI();
};

const updateSky = () => {
  refreshUI();
};

const kelvinToFahrenheit = (temp) => {
  return 1.8 * (temp - 273) + 32;
};

const resetCity = () => {
  state.cityName = 'Seattle';
  updateCityTemp();
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
  state.getTempButton.addEventListener('click', updateCityTemp);
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  resetCity();
};

onLoaded();
