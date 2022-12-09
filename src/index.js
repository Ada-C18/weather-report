// debugger;
let temp = 75;
const cityInput = document.getElementById('name');
const cityName = document.getElementById('city-name');
const skyOptions = document.getElementById('skyOptions');
const sky = document.getElementById('skyEmojis');

const updateTemp = (temp) => {
  console.log('update called');
  const tempValueContainer = document.getElementById('tempValue');
  tempValueContainer.textContent = temp;
  updateTempColor(temp);
  changeLandscape(temp);
};

const increaseTemp = () => {
  console.log('increase');
  temp += 1;
  updateTemp(temp);
};

const decreaseTemp = () => {
  temp -= 1;
  updateTemp(temp);
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

const updateCity = () => {
  cityName.textContent = cityInput.value;
};

const updateSky = () => {
  console.log('sky change');
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

const getLatLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityName,
        format: JSON,
      },
    })
    .then((locationData) => {
      console.log(locationData);
      const lat = locationData.data[0].lat;
      const lon = locationData.data[0].lon;
      console.log(lat, lon);
      getWeather(lat, lon);
    });
};

const getWeather = (lat, lon) => {
  console.log('in get Weather');
  axios
    .get(`http://127.0.0.1:5000/weather`, {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((locationData) => {
      console.log(locationData);
      let kelvinTemp = locationData.data.main.temp;
      let newTemp = Math.round((kelvinTemp - 273.15) * 1.8 + 32);
      updateTemp(newTemp);
      console.log(newTemp);
    });
};

const renderAndUpdate = () => {
  console.log('render called');
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  const updateTempWithCity = document.getElementById('updateTemp');
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  cityInput.addEventListener('input', updateCity);
  skyOptions.addEventListener('change', updateSky);
  updateTempWithCity.addEventListener('click', getLatLong);
};

if (document.readyState !== 'loading') {
  renderAndUpdate();
} else {
  document.addEventListener('DOMContentLoaded', renderAndUpdate);
}
