// const axios = require('axios');

const state = {
  currentTemp: 80,
  city: 'Seattle',
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

  if (temp >= 80) {
    tempValue.className = 'red';
    landscapePicture.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    tempValue.className = 'orange';
    landscapePicture.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    tempValue.className = 'yellow';
    landscapePicture.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    tempValue.className = 'green';
    landscapePicture.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempValue.className = 'teal';
  }
};
const updateCity = () => {
  const inputCity = document.getElementById('input-city').value;
  const cityName = document.getElementById('city-name');
  state.city = inputCity;
  cityName.textContent = state.city;
};
const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.getElementById('decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const inputCityBox = document.getElementById('input-city');
  inputCityBox.addEventListener('input', updateCity);
};

// const getLatAndLon = (city) => {
//   return axios
//     .get('http://127.0.0.1:5000/location', {
//       params: {
//         q: city,
//       },
//     })
//     .then((response) => {
//       const latitude = response[0].lat;
//       const longitude = response[0].lon;
//       return { latitude, longitude };
//     })
//     .catch((error) => {
//       console.log('Error!');
//     });
// };

document.addEventListener('DOMContentLoaded', registerEventHandlers);
