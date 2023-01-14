// LOCATION

currentCity = document.getElementById('cityName').value;

const updateCity = () => {
  let inputCity = document.getElementById('cityName').value;
  let showCity = document.getElementById('setCity');
  showCity.innerHTML = inputCity;
  currentCity = inputCity;
};

const resetCity = () => {
  let cityInput = document.getElementById('cityName');
  cityInput.value = 'Atlanta';
  updateCity();
};

// CONDITIONS

let selectConditions = document.querySelectorAll('input[type="radio"]');

let condResult = document.getElementById('cond_result');
condResult.innerHTML = '✨';

const updateCondition = () => {
  try {
    let selected = document.querySelector(
      "input[name='Conditions']:checked"
    ).value;
    condResult.innerHTML = selected;
  } catch {}
};

// TEMP DEPENDANTS

let defaultTemp = 'LOADING...';
let currentTemp = defaultTemp;

const HOW_YA_FEELIN = ['🥶', '😮‍💨', '😄', '😎', '😅', '🥵', '🤔'];
const HILLS_ARE_ALIVE = ['🧊', '🌲', '🌷', '🌻', '🌴', '🔥', '🌎'];
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
  let tempSetting = 6;

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
  } else if (adjustedTemp <= 14) {
    tempSetting = 0;
  }

  currentTemp = adjustedTemp;

  showField.innerHTML = HILLS_ARE_ALIVE[tempSetting];
  showYou.innerHTML = HOW_YA_FEELIN[tempSetting];
  shownTemp.innerHTML = adjustedTemp;
  document.getElementById('temp_result').style.color =
    REPO_RAINBOW[tempSetting];
};

// TEMPERATURE

let shownTemp = document.getElementById('temp_result');

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

// API CALLS

const findWeather = (query) => {
  let locationData, weatherData;
  let modifiedLocData, modifiedWeathData;

  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: currentCity,
        format: 'json',
      },
    })
    .then((response) => {
      locationData = response.data;

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

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: modifiedLocData[0],
            lon: modifiedLocData[1],
            format: 'json',
          },
        })
        .then((response) => {
          weatherData = response.data;

          const modifyWeather = (weatherData) => {
            let relevantData = [weatherData['main'], weatherData['weather']];
            let defTempCond = [];

            let unmodifiedTemp = relevantData[0]['temp'];
            let tempF = ((unmodifiedTemp - 273.15) * 9) / 5 + 32;
            let modifiedTemp = tempF.toFixed(0);
            defTempCond.push(modifiedTemp);

            let condID = Number(relevantData[1][0]['id']);
            let idToCond = 'sunny';

            if (condID > 800) {
              idToCond = '⛅';
            } else if (condID === 800) {
              idToCond = '✨';
            } else if (condID > 700) {
              idToCond = '⛅';
            } else if (condID > 599) {
              idToCond = '☃️';
            } else {
              idToCond = '🌈';
            }

            defTempCond.push(idToCond);
            return defTempCond;
          };

          modifiedWeathData = modifyWeather(weatherData);

          updateTempies(modifiedWeathData[0]);
          currentTemp = modifiedWeathData[0];
          condResult.innerHTML = modifiedWeathData[1];
        })
        .catch((error) => {
          weatherData = 'An error has occured while fetching weather data.';
        });
    })
    .catch((error) => {
      locationData = 'An error has occured while fetching location data.';
    });
};

// UPDATE WITH DATA
const updateWeather = () => {
  window.location.reload();
};

// REGISTERING EVENTS

const registerEventHandlers = () => {
  updateTempies(currentTemp);

  const addTemp = document.getElementById('uppie');
  addTemp.addEventListener('click', handleAdd);

  const subTemp = document.getElementById('downie');
  subTemp.addEventListener('click', handleSub);

  updateCity();
  const setCityInput = document.getElementById('cityName');
  setCityInput.addEventListener('input', updateCity);

  updateCondition();
  selectConditions.forEach((condition) => {
    condition.addEventListener('change', updateCondition);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
findWeather(currentCity);
