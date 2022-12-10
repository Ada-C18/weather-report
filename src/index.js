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
  // const theme = document.getElementById('theme');

  if (temp >= 80) {
    tempValue.className = 'red';
    // theme.href = '<red theme link>';
    landscapePicture.textContent = landscapeDictionary['Summer'];
  } else if (temp >= 70) {
    tempValue.className = 'orange';
    // body.className = 'orange-theme';
    landscapePicture.textContent = landscapeDictionary['Spring'];
  } else if (temp >= 60) {
    tempValue.className = 'yellow';
    // body.className = 'yellow-theme';
    landscapePicture.textContent = landscapeDictionary['Fall'];
  } else if (temp >= 50) {
    tempValue.className = 'green';
    // body.className = 'green-theme';
    landscapePicture.textContent = landscapeDictionary['Winter'];
  } else {
    tempValue.className = 'teal';
    // body.className = 'teal-theme';
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
  const cityName = document.getElementById('city-name');
  const inputCity = document.getElementById('input-city');
  state.city = 'Seattle';
  cityName.textContent = state.city;
  inputCity.value = state.city;
};

const getLiveTemp = () => {
  const tempValue = document.getElementById('tempValue');

  getLatAndLon(state.city)
    .then((result) => {})
    .then((result) => {
      getWeather(state.lat, state.lon).then((result) => {
        state.currentTemp = result;
        tempValue.textContent = state.currentTemp;
        temperatureColorCheck(state.currentTemp);
      });
    });
};

const getLatAndLon = (city) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      // return { lat, lon };
    })
    .catch((error) => {
      console.log(error);
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
      temp = response.data.main.temp;
      convertedTemp = ((temp - 273.15) * 9) / 5 + 32;
      return Math.round(convertedTemp);
    });
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
