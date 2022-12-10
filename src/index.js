
('use strict');

const API_CITY = 'http://127.0.0.1:5000/location';
const API_WEATHER = 'http://127.0.0.1:5000/weather';

let temperature = 72;
let city = 'Seattle';
// const cityDefault = 'Seattle';

const getAndDisplayTemp = () => {
  const spanTempNumber = document.getElementById('temperature-value');
  changeLandscape();
  changeTempNumberColor();
  spanTempNumber.textContent = `${temperature}`;
};
// Increase temperature
const increaseTemp = () => {
  temperature += 1;
  getAndDisplayTemp();
};

const increaseTempOnClick = () => {
  let arrowUp = document.querySelector('#arrow-up');
  arrowUp.addEventListener('click', increaseTemp);
};

// Decrease temperature
const decreaseTemp = () => {
  temperature -= 1;
  getAndDisplayTemp();
};

const decreaseTempOnClick = () => {
  let arrowDown = document.querySelector('#arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

const changeTempNumberColor = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );
  const spanTempNumber = document.getElementById('temperature-value');
  if (tempNumber <= 49) spanTempNumber.className = 'number-color-teal';
  else if (tempNumber < 59) spanTempNumber.className = 'number-color-green';
  else if (tempNumber < 69) spanTempNumber.className = 'number-color-yellow';
  else if (tempNumber < 79) spanTempNumber.className = 'number-color-orange';
  else spanTempNumber.className = 'number-color-red';
};

const changeLandscape = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );
  let iconGround = document.getElementById('ground-icons');
  if (tempNumber <= 59)
    iconGround.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  else if (tempNumber < 69) iconGround.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  else if (tempNumber < 79) iconGround.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  else iconGround.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
};

const updateCityName = (event) => {
  const cityName = document.querySelector('#city');
  cityName.textContent = event.target.value;
  city = cityName.textContent;
  // cityName.textContent = city;
};

const updateCityNameInput = () => {
  const inputCity = document.querySelector('#city-name-input');
  inputCity.addEventListener('input', updateCityName);
};

const getTempF = () => {
  // console.log('city inside', city);
  axios
    .get(API_CITY, { params: { q: city, format: 'json' } })
    .then((result) => {
      console.log(result);
      const latitude = result.data[0].lat;

      const lontitude = result.data[0].lon;
      console.log(city);
      console.log(latitude, lontitude);

      axios
        .get(API_WEATHER, {
          params: { lat: latitude, lon: lontitude },
        })
        .then((result) => {
          const temp = result.data.main.temp;
          const tempF = convertTempKtoF(temp);

          temperature = tempF;
          getAndDisplayTemp();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
const getRealTemp = () => {
  const tempButton = document.querySelector('#temperature-button');
  tempButton.addEventListener('click', getTempF);
};

const convertTempKtoF = (temp) => {
  const tempF = Math.round(1.8 * (Number(temp) - 273) + 32);
  return tempF;
};

const updateSky = () => {
  const spanSkyIcon = document.querySelector('#sky-icons');
  const skyOption = document.querySelector('#sky-button').value;

  if (skyOption === 'sunny') {
    skyIcon = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyOption === 'cloudy') {
    skyIcon = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOption === 'rainy') {
    skyIcon = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else {
    skyIcon = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  spanSkyIcon.textContent = skyIcon;
};

const resetCityName = () => {
  const cityName = document.querySelector('#city');
  const defaultCityName = 'Seattle';
  cityName.textContent = defaultCityName;
  const inputCity = document.querySelector('#city-name-input');
  inputCity.value = defaultCityName;
};
// resetCityName();
const resetCityNameOnClick = () => {
  resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', resetCityName);
};

const updateWeaterGardenOnInput = () => {
  let skySelect = document.querySelector('#sky-button');

  skySelect.addEventListener('change', updateSky);
};

const EventHandlers = () => {
  increaseTempOnClick();
  decreaseTempOnClick();
  updateCityNameInput();
  getRealTemp();
  updateWeaterGardenOnInput();
  resetCityNameOnClick();
};
if (document.readyState !== 'loading') {
  EventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', EventHandlers);
}
