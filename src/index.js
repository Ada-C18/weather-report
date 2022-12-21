import '.styles/index.css';

// API CALLS
const axios_location = require('axios');
const axios_weather = require('axios');
let locationData, weatherData;
let modifiedLocData, modifiedWeathData;

axios_location
  .get('http://127.0.0.1:5000/location', {
    params: {
      q: inputCity,
      format: 'json',
    },
  })
  .then((response) => {
    locationData = response;

    const modifyLocation = (locationData) => {
      let latlon = [];
      let focusLocation = locationData[0];

      let focusLat = Number(focusLocation['lat']);
      let adjustLat = focusLat.toFixed(2);
      latlon.push(adjustLat);

      let focusLon = Number(focusLocation['lon']);
      let adjustLon = focusLon.toFixed(2);
      latlon.push(adjustLon);

      return latlon;
    };

    modifiedLocData = modifyLocation(locationData);

    axios_weather
      .get('http://127.0.0.1:5000/weather', {
        params: {
          lat: modifiedLocData[0],
          lon: modifiedLocData[1],
          format: 'json',
        },
      })
      .then((response) => {
        weatherData = response;

        const modifyWeather = (weatherData) => {
          let relevantData = [weatherData['main'], weatherData['weather']];
          let defTempCond = [];

          let unmodifiedTemp = relevantData[0]['temp'];
          let tempF = ((unmodifiedTemp - 273.15) * 9) / 5 + 32;
          let modifiedTemp = tempF.toFixed(0);
          defTempCond.push(modifiedTemp);

          let condID = Number(relevantData[1][0]['id']);
          let idToCond = null;

          if (condID > 800) {
            idToCond = 'cloudy';
          } else if (condID === 800) {
            idToCond = 'sunny';
          } else if (condID > 700) {
            idToCond = 'cloudy';
          } else if (condID > 599) {
            idToCond = 'snowy';
          } else {
            idToCond = 'rainy';
          }

          defTempCond.push(idToCond);
          return defTempCond;
        };

        modifiedWeathData = modifyWeather(weatherData);
      })
      .catch((error) => {
        weatherData = 'An error has occured while fetching weather data.';
      });
  })
  .catch((error) => {
    locationData = 'An error has occured while fetching location data.';
  });

// LOCATION

const updateCity = () => {
  let inputCity = document.getElementById('cityName').value;
  let showCity = document.getElementById('setCity');
  showCity.innerHTML = inputCity;
};

const resetCity = () => {
  let cityInput = document.getElementById('cityName');
  cityInput.value = 'Atlanta';
  updateCity();
};

updateCity();
const setCityInput = document.getElementById('cityName');
setCityInput.addEventListener('input', updateCity);

const resetBtn = document.getElementById('city_reset');
resetBtn.addEventListener('click', resetCity);

// CONDITIONS

let selectConditions = document.querySelectorAll("input[name='Conditions']");

let condResult = document.getElementById('cond_result');
condResult.textContent = '✨';

const updateCondition = () => {
  let selected = document.querySelector(
    "input[name='Conditions']:checked"
  ).value;
  condResult.innerHTML = selected;
};

selectConditions.forEach((condition) => {
  condition.addEventListener('change', updateCondition);
});

// TEMP DEPENDANTS

let defaultTemp = 65;
let currentTemp = defaultTemp;

const HOW_YA_FEELIN = ['🥶', '😮‍💨', '😄', '😎', '😅', '🥵'];
const HILLS_ARE_ALIVE = ['🧊', '🌲', '🌷', '🌻', '🌴', '🔥'];
const REPO_RAINBOW = [
  '#993BDB',
  '#2B52FF',
  '#0BD769',
  '#FFE146',
  '#FF7912',
  '#FF0000',
];

let showField = document.getElementById('temp_field');
let showYou = document.getElementById('you_are_here');

const updateTempies = (adjustedTemp) => {
  let tempSetting = 0;

  if (adjustedTemp > 99) {
    tempSetting = 5;
  } else if (adjustedTemp > 79) {
    tempSetting = 4;
  } else if (adjustedTemp > 65) {
    tempSetting = 3;
  } else if (adjustedTemp > 39) {
    tempSetting = 2;
  } else if (adjustedTemp > 14) {
    tempSetting = 1;
  }

  showField.innerHTML = HILLS_ARE_ALIVE[tempSetting];
  showYou.innerHTML = HOW_YA_FEELIN[tempSetting];
  document.getElementById('temp_result').style.color =
    REPO_RAINBOW[tempSetting];
};

// TEMPERATURE

const addTemp = document.getElementById('uppie');
const subTemp = document.getElementById('downie');

const shownTemp = document.getElementById('temp_result');

shownTemp.innerHTML = currentTemp;

const handleAdd = () => {
  currentTemp++;
  shownTemp.innerHTML = currentTemp;

  updateTempies(currentTemp);
};

const handleSub = () => {
  currentTemp--;
  shownTemp.innerHTML = currentTemp;

  updateTempies(currentTemp);
};

addTemp.addEventListener('click', handleAdd);
subTemp.addEventListener('click', handleSub);
