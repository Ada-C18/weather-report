const state = {
  temperature: 0,
  city: 'Seattle',
};

// Initial page load
const pageInitialLoad = () => {
  getCityLoc('Seattle');
  cityNameField.value = 'Seattle';
};

// helper variables to create event listeners
const cityNameField = document.getElementById('cityNameField');
const cityNameDisplay = document.getElementById('cityNameDisplay');
const temperatureContainer = document.getElementById('temperature');
const addTempButton = document.getElementById('increaseTemp');
const minusTempButton = document.getElementById('decreaseTemp');
const resetButton = document.getElementById('reset');
const currentTemperatureButton = document.getElementById('currentTemp');
const skyDropdown = document.getElementById('skyDropdown');
const emojiContainer = document.getElementById('emojiContainer');

// functions to enable behavior in events
const updateTemperature = (value) => {
  state.temperature = value;
  temperatureContainer.textContent = `${state.temperature}℉`;
  updateTempColor(state.temperature);
};

const addTemp = () => {
  updateTemperature(state.temperature + 1);
};

const minusTemp = () => {
  updateTemperature(state.temperature - 1);
};

const updateConditions = (value) => {
  if (skyDropdown.value === 'snowy') {
    emojiContainer.textContent = `🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨`;
  } else if (skyDropdown.value === 'rainy') {
    emojiContainer.textContent = `🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧`;
  } else if (skyDropdown.value === 'cloudy') {
    emojiContainer.textContent = `☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️`;
  } else if (skyDropdown.value === 'sunny') {
    emojiContainer.textContent = `☁️ ☁️ ☁️ ☀️ ☁️ ☁️`;
  }
};

const updateTempColor = (temperature) => {
  if (temperature > 80) {
    document.getElementById('temperature').style.color = 'red';
    document.getElementById('tempEmoticon').textContent =
      '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70 && temperature <= 79) {
    document.getElementById('temperature').style.color = 'orange';
    document.getElementById('tempEmoticon').textContent =
      '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60 && temperature <= 69) {
    document.getElementById('temperature').style.color = 'yellow';
    document.getElementById('tempEmoticon').textContent =
      '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50 && temperature <= 59) {
    document.getElementById('temperature').style.color = 'green';
    document.getElementById('tempEmoticon').textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature <= 49) {
    document.getElementById('temperature').style.color = 'teal';
    document.getElementById('tempEmoticon').textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const resetCity = () => {
  cityNameDisplay.textContent = 'Seattle';
  getCityLoc('Seattle');
  cityNameField.value = 'Seattle';
};

const updateCity = () => {
  state.city = cityNameField.value;
  cityNameDisplay.textContent = cityNameField.value;
  getCityLoc(cityNameField.value);
};

// event listeners
addTempButton.addEventListener('click', addTemp);
minusTempButton.addEventListener('click', minusTemp);
resetButton.addEventListener('click', resetCity);
cityNameField.addEventListener('change', updateCity);
currentTemperatureButton.addEventListener('click', updateCity);
skyDropdown.addEventListener('change', updateConditions);

document.addEventListener('DOMContentLoaded', pageInitialLoad);

// API calls
const getCityLoc = (cityName) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityName,
      },
    })
    .then((result) => {
      let lat = result.data[0].lat;
      let lon = result.data[0].lon;
      getCityTemp(lat, lon);
    })

    .catch((error) => {
      console.log(error);
    });
};

const getCityTemp = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((result) => {
      let temp = result.data.main.temp;
      let temperatureFahrenheit = convertKelvinToFahrenheit(temp);
      updateTemperature(temperatureFahrenheit);
    })
    .catch((error) => {
      console.log(error);
    });
};

// helper function to convert temperature
const convertKelvinToFahrenheit = (tempKelvin) => {
  return Math.round(((tempKelvin - 273.15) * 9) / 5 + 32);
};
