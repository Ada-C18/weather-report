//application states
const state = {
  sky: 'sunny',
  temperature: 0,
  city: '',
};
const temperatureChangeStep = 1;

//references to all elements on the page
const elTemperature = document.querySelector('#temperature');
const elIncreaseTemp = document.querySelector('#increaseTemp');
const elDecreaseTemp = document.querySelector('#decreaseTemp');
const elLandscape = document.querySelector('#landscape');
const elCity = document.querySelector('#city');
const elCityInput = document.querySelector('#cityInput');
const elCityReset = document.querySelector('#cityReset');
const elCitySearch = document.querySelector('#citySearch');
const elSky = document.querySelector('#sky');
const elSkyInput = document.querySelector('#skyInput');

//event handlers to intercept user interactions
elSkyInput.addEventListener('change', (event) => {
  setSky(event.target.value);
});

elCityInput.addEventListener('input', (event) => {
  setCity(event.target.value);
});

elCityReset.addEventListener('click', (event) => {
  setCity('');
  elCityInput.focus();
});

elCitySearch.addEventListener('click', (event) => {
  searchCityWeather(state.city);
});

elIncreaseTemp.addEventListener('click', (event) => {
  increaseTemp(event.target.value);
});

elDecreaseTemp.addEventListener('click', (event) => {
  decreaseTemp(event.target.value);
});

//functions to render state to the screen
const renderSky = () => {
  const sky = state.sky;
  let skyScape = 'unknown';

  if (sky === 'sunny') skyScape = '☀️';
  else if (sky === 'cloudy') skyScape = '☁️';
  else if (sky === 'rainy') skyScape = '🌧';
  else if (sky === 'snowy') skyScape = '🌨';

  elSky.innerText = skyScape;
};

const renderTemperature = () => {
  elTemperature.innerText = state.temperature;

  const temp = state.temperature;
  let color = 'teal';
  let landscape = '❄️❄️❄️❄️❄️';

  if (temp >= 80) {
    color = 'red';
    landscape = '🔥🔥🔥🔥🔥';
  } else if (temp >= 70) {
    color = 'orange';
    landscape = '😊😊😊😊😊';
  } else if (temp >= 60) {
    color = 'yellow';
    landscape = '🌷🌷🌷🌷🌷';
  } else if (temp >= 50) {
    color = 'green';
    landscape = '🐿🐿🐿🐿🐿';
  }

  elTemperature.style.color = color;
  elLandscape.innerText = landscape;
};

const renderCity = () => {
  elCity.innerText = state.city;
  elCityInput.value = state.city;
};

//setters for changing state and calling respective render functions
const setSky = (value) => {
  state.sky = value;
  renderSky();
};

const setTemperature = (value) => {
  state.temperature = value;
  renderTemperature();
};

const setCity = (value) => {
  state.city = value;
  renderCity();
};

//functions to run user actions
const increaseTemp = () => {
  setTemperature(state.temperature + temperatureChangeStep);
};

const decreaseTemp = () => {
  setTemperature(state.temperature - temperatureChangeStep);
};

const kelvinToFarenheit = (k) => 1.8 * (k - 273) + 32;

const searchCityWeather = (city) => {
  console.log('searchCityWeather()', city);

  //disable buttons to prevent multiple requests
  elCitySearch.disabled = true;
  elCityReset.disabled = true;

  return fetchCityLatLong(city)
    .then(fetchLatLongTemperature)
    .then((temperature) => setTemperature(temperature))
    .catch(console.error)
    .finally(() => {
      elCitySearch.disabled = false;
      elCityReset.disabled = false;
    });
};

//use the city to get lat/long
const fetchCityLatLong = (city) => {
  console.log('fetchCityLatLong()', city);
  const url = `http://127.0.0.1:5000/location?q=${city}`;

  return axios.get(url).then((response) => {
    const { data } = response;
    const firstResult = data[0];
    return {
      lat: firstResult.lat,
      lon: firstResult.lon,
    };
  });
};

// use lat/lon coordinates to get temperature
const fetchLatLongTemperature = (latLong) => {
  const { lat, lon } = latLong;
  console.log('fetchLatLongTemperature()', lat, lon);

  const url = `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`;
  return axios.get(url).then((response) => {
    const { data } = response;
    const tempK = data.main.temp;
    const tempF = kelvinToFarenheit(tempK);
    const tempRounded = Math.round(tempF);
    console.log({ tempRounded, tempK, tempF });

    return tempRounded;
  });
};

//initialization - render all state first
renderCity();
renderTemperature();
renderSky();

//run initial search and show a temperature
setCity('Denver');
searchCityWeather('Denver');

// setTemperature(60)
