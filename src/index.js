'use strict';

const state = {
  tempValue: 80,
  city: 'Seattle',
  lat: 0,
  lon: 0
};

const temperature = document.getElementById('tempValue');

const increaseTemp = () => {
  state.tempValue += 1;
  temperature.textContent = String(state.tempValue) + '°F';
  updateBackground();
  updateTempColor();
};

const decreaseTemp = () => {
  state.tempValue -= 1;
  temperature.textContent = String(state.tempValue + '°F');
  updateBackground();
  updateTempColor();
};

const updateBackground = () => {
  const backgroundImage = document.getElementById('bg').style.backgroundImage;

  if (state.tempValue > 100){
    backgroundImage = 'url(assets/sun-surface.jpg)';
  }
  else if (state.tempValue > 90){
    backgroundImage = 'url(assets/desert.jpg)';
  }
  else if (state.tempValue > 80){
    backgroundImage = 'url(assets/desert1.jpg)';
  }
  else if (state.tempValue > 70){
    backgroundImage = 'url(assets/summer.jpg)';
  }
  else if (state.tempValue > 60){
    backgroundImage = 'url(assets/spring.jpg)';
  }
  else if (state.tempValue > 50){
    backgroundImage = 'url(assets/spring2.webp)';
  }
  else if (state.tempValue > 40){
    backgroundImage = 'url(assets/autumn.jpg)';
  }
  else if (state.tempValue > 30){
    backgroundImage = 'url(assets/winter-lanscape.webp)';
  }
  else if (state.tempValue > 20){
    backgroundImage = 'url(assets/deepfreeze.jpg)';
  }
};

const updateTempColor = () => {
  if (state.tempValue >= 80) {
    temperature.classList = 'red';
  } else if (state.tempValue >= 70) {
    temperature.classList = 'orange';
  } else if (state.tempValue >= 60) {
    temperature.classList = 'yellow';
  } else if (state.tempValue >= 50) {
    temperature.classList = 'green';
  } else {
    temperature.classList = 'teal';
  }
};

const updateSky = () => {
  const sky = document.getElementById('sky').textContent;
  const skySelection = document.getElementById('skySelection').value;

  if (skySelection === 'Sunny') {
    sky = '☁️   🕊️☁️        ☀️ ☁️';
  } else if (skySelection === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelection === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
  } else if (skySelection === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const getLatLon = () => {
  return axios
    .get('http://localhost:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
    })

    .catch((error) => {
      console.log('error getting lat and lon');
    });
};

const updateCityName = () => {
  let cityNameInput = document.getElementById('cityNameInput').value;
  let headerCityName = document.getElementById('headerCityName');
  state.city = cityNameInput;
  headerCityName.textContent = state.city;
};

const resetCityName = () => {
  let cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Seattle';
  updateCityName();
};

const updateWeather = () => {
  return axios
    .get('http://localhost:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data.main.temp;
      return weather;
    })
    .catch((error) => {
      console.log('error: unable to get weather');
      console.log(error);
    });
};

const updateTempValue = () => {
  getLatLon().then(() => {
    updateWeather().then((weather) => {
      const tempF = Math.floor((weather - 273.15) * 1.8 + 32);
      state.tempValue = tempF;
      temperature.textContent = state.tempValue;
      updateBackground();
      updateTempColor();
      return state.tempValue;
    });
  });
};

const registerEventHandlers = () => {
  const increaseTempBtn = document.getElementById('increaseTempBtn');
  increaseTempBtn.addEventListener('click', increaseTemp);

  const decreaseTempBtn = document.getElementById('decreaseTempBtn');
  decreaseTempBtn.addEventListener('click', decreaseTemp);

  const skySelection = document.getElementById('skySelection');
  skySelection.addEventListener('change', updateSky);

  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);

  const resetCityBtn = document.getElementById('cityResetBtn');
  resetCityBtn.addEventListener('click', resetCityName);

  const currentTemp = document.getElementById('currentTemp');
  currentTemp.addEventListener('click', updateTempValue);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
