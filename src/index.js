const state = {
  city: 'New York',
  temp: 45,
  unit: 'F',
};

const tempDisplay = document.getElementById('temperature');
const cityInput = document.getElementById('cityNameInput');
const cityName = document.getElementById('headerCityName');

// Wave 2 -- Updating Temperature
const displayTemp = () => {
  tempDisplay.textContent = `${state.temp}°${state.unit}`;
};

const raiseTemp = () => {
  state.temp += 1;
  displayTemp();
  updateTempColor(state.temp);
  updateGarden(state.temp);
};

const lowerTemp = () => {
  state.temp -= 1;
  displayTemp();
  updateTempColor(state.temp);
  updateGarden(state.temp);
};

const updateTempColor = (currentTemp) => {
  const tempValueContainer = document.getElementById('temperature');
  let color = '';
  if (currentTemp >= 80) {
    color = 'red';
  } else if (currentTemp >= 70) {
    color = 'orange';
  } else if (currentTemp >= 60) {
    color = 'yellow';
  } else if (currentTemp >= 50) {
    color = 'green';
  }
  tempValueContainer.classList = color;
};

// Wave 3 -- Updating City
const updateCity = () => {
  state.city = cityInput.value;
  cityName.textContent = state.city;
};

// Wave 4 -- Calling APIs
const getLatLon = async () => {
  const locationData = await axios.get(
    `http://127.0.0.1:5000/location?q=${state.city}`
  );

  const lat = locationData.data[0].lat;
  const lon = locationData.data[0].lon;

  getWeatherFromLocation(lat, lon);
};

const getWeatherFromLocation = async (lat, lon) => {
  const weatherData = await axios.get(
    `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
  );

  const tempKelvin = weatherData.data.main.temp;
  state.temp = Math.floor((tempKelvin - 273.15) * 1.8 + 32); // Temperature retrieved from API comes in Kelvin, we need to convert it to F

  displayTemp();
};

// Wave 5 -- Selecting the Sky
const updateSky = () => {
  const inputSky = document.getElementById('skySelector').value;
  const skyContainer = document.getElementById('gardenSky');

  let sky = '';
  let skyColor = '';

  if (inputSky === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = 'cloudy';
  } else if (inputSky === 'Sunny') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyColor = 'sunny';
  } else if (inputSky === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = 'rainy';
  } else if (inputSky === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = 'snowy';
  }

  skyContainer.textContent = sky;
};

const updateGarden = (currentTemp) => {
  const landscapeContainer = document.getElementById('gardenLandscape');
  let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  if (currentTemp >= 80) {
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (currentTemp >= 70) {
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  }
  landscapeContainer.textContent = landscape;
};

// Wave 6 -- Resetting city name
const resetCity = () => {
  cityInput.value = '';
  state.city = 'New York';
  cityName.textContent = state.city;
  getCurrentTemp();
};

// Event Listeners
const registerEventHandlers = () => {
  const increaseTempControl = document.getElementById('plus');
  increaseTempControl.addEventListener('click', raiseTemp);

  const decreaseTempControl = document.getElementById('minus');
  decreaseTempControl.addEventListener('click', lowerTemp);

  cityInput.addEventListener('input', updateCity);

  const getTempBttn = document.getElementById('getCurrentTempBttn');
  getTempBttn.addEventListener('click', getLatLon);

  const cityNameResetBttn = document.getElementById('cityNameResetBttn');
  cityNameResetBttn.addEventListener('click', resetCity);

  const skySelect = document.getElementById('skySelector');
  skySelect.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
