const state = {
  currentTemp: 80,
  city: 'Seattle',
  lat: 47.6038321,
  lon: -122.330062,
};

const skyDictionary = {
  Sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  Snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const landscapeDictionary = {
  Summer: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  Spring: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  Fall: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  Winter: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
};

const increaseTemp = () => {
  state.currentTemp += 1;

  const tempValue = document.getElementById('tempValue');

  tempValue.textContent = state.currentTemp;
  temperatureColorCheck(state.currentTemp);
};

const decreaseTemp = () => {
  state.currentTemp -= 1;

  const tempValue = document.getElementById('tempValue');

  tempValue.textContent = state.currentTemp;
  temperatureColorCheck(state.currentTemp);
};

const temperatureColorCheck = (temp) => {
  const tempValue = document.getElementById('tempValue');
  const landscapePicture = document.getElementById('landscapePicture');
  const theme = document.getElementById('theme');

  if (temp >= 80) {
    tempValue.className = 'red';
    theme.href = 'styles/red.css';
    landscapePicture.textContent = landscapeDictionary['Summer'];
  } else if (temp >= 70) {
    tempValue.className = 'orange';
    theme.href = 'styles/orange.css';
    landscapePicture.textContent = landscapeDictionary['Spring'];
  } else if (temp >= 60) {
    tempValue.className = 'yellow';
    theme.href = 'styles/yellow.css';
    landscapePicture.textContent = landscapeDictionary['Fall'];
  } else if (temp >= 50) {
    tempValue.className = 'green';
    theme.href = 'styles/green.css';
    landscapePicture.textContent = landscapeDictionary['Winter'];
  } else {
    tempValue.className = 'teal';
    theme.href = 'styles/teal.css';
    landscapePicture.textContent = landscapeDictionary['Winter'];
    // we have the snowy weather pic twice because other getLiveTemp won't update the pic
  }
};

const updateSky = () => {
  const skyPicture = document.getElementById('skyPicture');
  const selectedSky = document.getElementById('sky').value;
  skyPicture.textContent = skyDictionary[selectedSky];
};

const updateCity = () => {
  const inputCity = document.getElementById('input-city').value;
  const cityName = document.getElementById('city-name');
  state.city = inputCity;
  cityName.textContent = state.city;
};

const resetCityName = () => {
  document.getElementById('input-city').value = 'Seattle';
  updateCity();
};

const getLiveTemp = async () => {
  const tempValue = document.getElementById('tempValue');

  await updateLatAndLon(state.city);

  state.currentTemp = await getWeather(state.lat, state.lon);
  tempValue.textContent = state.currentTemp;
  temperatureColorCheck(state.currentTemp);
};

const updateLatAndLon = async (city) => {
  const response = await axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: city,
    },
  });

  state.lat = response.data[0].lat;
  state.lon = response.data[0].lon;
};

const getWeather = async (lat, lon) => {
  const response = await axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: lat,
      lon: lon,
    },
  });
  temp = response.data.main.temp;
  convertedTemp = ((temp - 273.15) * 9) / 5 + 32;
  return Math.round(convertedTemp);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.getElementById('decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const inputCityBox = document.getElementById('input-city');
  inputCityBox.addEventListener('input', updateCity);

  const liveTemperatureButton = document.getElementById(
    'liveTemperatureButton'
  );
  liveTemperatureButton.addEventListener('click', getLiveTemp);

  const skySelected = document.getElementById('sky');
  skySelected.addEventListener('change', updateSky);

  const resetCityNameButton = document.getElementById('reset-city-name');
  resetCityNameButton.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
