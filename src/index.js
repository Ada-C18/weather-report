'use strict';

const state = {
  temp: 65,
  city: 'Seattle',
  lat: 0,
  lon: 0,
};

const getCoordinates = (city) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getRealtimeTemp();
    })
    .catch((error) => {
      console.log('Error getting coordinates.');
      console.log(error);
    });
};

const getRealtimeTemp = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      console.log(response.data);
      const tempKelvin = response.data.main.temp;
      state.temp = toFahrenheit(tempKelvin);
      updateTheme();
    })
    .catch((error) => {
      console.log('Error getting weather data');
      console.log(error);
    });
};

const updateSky = () => {
  const skyOption = document.getElementById('sky-options').value;
  const skyContainer = document.getElementById('sky');
  const gardenSectionColor = document.getElementById('garden-section');
  let sky = '';
  let skyColor = '';
  if (skyOption === 'Sunny') {
    sky = '☀️ ☁️ ☀️ ☁️ ☀️ ☁️ ☀️';
    skyColor = '#FAE8B8';
  } else if (skyOption === 'Cloudy') {
    sky = '☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️';
    skyColor = '#b5c0d1';
  } else if (skyOption === 'Rainy') {
    sky = '🌧🌧🌦🌧🌧🌧🌧🌧🌧🌧🌧';
    skyColor = '#9dd9d2';
  } else if (skyOption === 'Snowy') {
    sky = '🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨';
    skyColor = '#fff8f0';
  }
  skyContainer.textContent = sky;
  gardenSectionColor.style.backgroundColor = skyColor;
};

const tempColor = () => {
  const currentTemp = document.getElementById('temp-display');
  if (state.temp >= 80) {
    currentTemp.style.backgroundColor = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.backgroundColor = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.backgroundColor = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.backgroundColor = 'green';
  } else {
    currentTemp.style.backgroundColor = 'teal';
  }
};

const landscapeImage = () => {
  const landscape = document.getElementById('landscape-img');
  let pic;
  if (state.temp >= 80) {
    landscape.src = './assets/desert_landscape.jpg';
  } else if (state.temp >= 70) {
    landscape.src = './assets/sunflower_landscape.jpg';
  } else if (state.temp >= 60) {
    landscape.src = './assets/forest_landscape.jpg';
  } else {
    landscape.src = './assets/winter_landscape.jpg';
  }
};

const updateTheme = () => {
  const currentTemp = document.getElementById('temp-display');
  currentTemp.textContent = `${state.temp}`;
  tempColor();
  landscapeImage();
};

const increaseTemp = () => {
  state.temp += 1;
  updateTheme();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTheme();
};

const toFahrenheit = (temp) => {
  return Math.floor(1.8 * (temp - 273) + 32);
};

const updateCity = () => {
  const inputCity = document.getElementById('cityNameInput').value;
  const headerCity = document.getElementById('headerCityname');
  state.city = inputCity;
  headerCity.textContent = inputCity;
};

const resetCity = () => {
  const cityReset = document.getElementById('cityNameInput');
  cityReset.value = 'Name of City Here';
  const headerCity = document.getElementById('headerCityname');
  headerCity.textContent = 'Seattle';
  state.city = 'Seattle';
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', increaseTemp);

  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', decreaseTemp);

  const inputCity = document.getElementById('submitButton');
  inputCity.addEventListener('click', updateCity);

  const resetCityButton = document.getElementById('resetButton');
  resetCityButton.addEventListener('click', resetCity);

  const realtimeTemp = document.getElementById('realtime-temp');
  realtimeTemp.addEventListener('click', getCoordinates);

  const skyOption = document.getElementById('sky-options');
  skyOption.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
