let globalTemp;
const cityInput = document.getElementById('name');
const cityName = document.getElementById('city-name');
const skyOptions = document.getElementById('skyOptions');
const sky = document.getElementById('skyEmojis');

//Wave 1
const updateTemp = (temp) => {
  const tempValueContainer = document.getElementById('tempValue');
  tempValueContainer.textContent = temp;
  globalTemp = temp;
  updateTempColor(temp);
  changeLandscape(temp);
};

const increaseTemp = () => {
  globalTemp += 1;
  updateTemp(globalTemp);
};

const decreaseTemp = () => {
  globalTemp -= 1;
  updateTemp(globalTemp);
};

const changeLandscape = (temp) => {
  const landscape = document.getElementById('landscape');
  let ground = '🥶__🧤_🏂_🧊__🧊_';
  if (temp >= 80) {
  } else if (temp >= 70) {
    ground = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (temp >= 60) {
    ground = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else if (temp >= 50) {
    ground = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
  landscape.textContent = ground;
};

const updateTempColor = (temp) => {
  const tempValueColor = document.getElementById('tempValue');
  let color = 'cold';
  if (temp >= 80) {
    color = 'hot';
  } else if (temp >= 70) {
    color = 'warm';
  } else if (temp >= 60) {
    color = 'cozy';
  } else if (temp >= 50) {
    color = 'cool';
  }
  tempValueColor.className = color;
};

//Wave 3
const updateCity = () => {
  cityName.textContent = cityInput.value;
};

//Wave 4
const getLatLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityInput.value,
        format: JSON,
      },
    })
    .then((locationData) => {
      const lat = locationData.data[0].lat;
      const lon = locationData.data[0].lon;
      getWeather(lat, lon);
    });
};

const getWeather = (lat, lon) => {
  axios
    .get(`http://127.0.0.1:5000/weather`, {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((locationData) => {
      let kelvinTemp = locationData.data.main.temp;
      let newTemp = Math.round((kelvinTemp - 273.15) * 1.8 + 32);
      updateTemp(newTemp);
    });
};

//Wave 5
const updateSky = () => {
  if (skyOptions.value === 'Sunny') {
    skySet = '☀️☀️☀️☀️☀️☀️';
  } else if (skyOptions.value === 'Cloudy') {
    skySet = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOptions.value === 'Rainy') {
    skySet = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyOptions.value === 'Snowy') {
    skySet = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  sky.textContent = skySet;
};

//Wave 6
const resetCity = () => {
  cityInput.value = 'Seattle';
  updateCity();
  getLatLong();
};

const defaultValue = () => {
  cityInput.value = 'Seattle';
  updateCity();
  default_temp = getLatLong();
  return default_temp;
};

const renderAndUpdate = () => {
  window.onload = defaultValue();
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  const updateTempWithCity = document.getElementById('updateTemp');
  const resetButton = document.getElementById('resetCity');
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  cityInput.addEventListener('input', updateCity);
  skyOptions.addEventListener('change', updateSky);
  updateTempWithCity.addEventListener('click', getLatLong);
  updateTempWithCity.addEventListener('click', getLatLong);
  resetButton.addEventListener('click', resetCity);
};

if (document.readyState !== 'loading') {
  renderAndUpdate();
} else {
  document.addEventListener('DOMContentLoaded', renderAndUpdate);
}
