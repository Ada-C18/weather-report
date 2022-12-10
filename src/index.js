('use strict');

const state = {
  city: 'Toms River',
  lat: 39.9537359,
  lon: -74.1979576,
  temp: 58,
};

const updateCity = () => {
  const inputName = document.getElementById('inputCity');
  const cityName = document.getElementById('city');
  if (inputName.value) {
    state.city = inputName.value;
  }
  cityName.textContent = state.city;
};

const resetCity = () => {
  const inputCity = document.getElementById('inputCity');
  inputCity.value = 'Toms River';
  updateCity();
};

const getTemp = () => {
  const totalCount = document.getElementById('temperatureValue');
  axios
    .get(`http://localhost:5000/location?q=${state.city}`)
    .then((response) => {
      console.log(response.data);
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      axios
        .get(`http://localhost:5000/weather?lat=${state.lat}&lon=${state.lon}`)
        .then((response) => {
          const tempKelvin = response.data.main.temp;
          const tempFarenheit = ((tempKelvin - 273.15) * 9) / 5 + 32;
          totalCount.textContent = `${Math.round(tempFarenheit)}°f`;
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error, could not get weather for that city 😞', error);
        });
    });
};

const totalCount = document.getElementById('temperatureValue');

temperatureValue.textContent = `${state.temp}°f`;

const handleIncrement = () => {
  state.temp++;
  temperatureValue.textContent = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

const handleDecrement = () => {
  state.temp--;
  temperatureValue.textContent = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

const changeColor = () => {
  let temp = state.temp;
  let color = '';
  if (temp > 80) {
    color = 'red';
  } else if (temp > 70) {
    color = 'orange';
  } else if (temp > 60) {
    color = 'yellow';
  } else if (temp > 50) {
    color = 'green';
  } else {
    color = 'blue';
  }
  totalCount.className = color;
};

const ground = document.getElementById('ground');

const changeLandscape = () => {
  let temp = state.temp;
  let groundChange = '';
  if (temp > 80) {
    groundChange = '🌵_🏜__🌵🐍';
  } else if (temp > 70) {
    groundChange = '🏝_⛱__🏝_🌊';
  } else if (temp > 60) {
    groundChange = '🌳_🌈__🌳_🌸';
  } else {
    groundChange = '🌲_🌲__⛄️_🌲🌲';
  }
  ground.textContent = groundChange;
};

const changeSkies = () => {
  const skyColor = document.getElementById('skies').value;
  const sky = document.getElementById('sky');
  let skyChange = '';
  if (skyColor === 'cloudy') {
    skyChange = '☁️☁️☁️☁️☁️☁️☁️☁️';
  } else if (skyColor === 'rainy') {
    skyChange = '🌧🌧🌧🌧🌧🌧';
  } else if (skyColor === 'sunny') {
    skyChange = '☀️☀️☀️☀️☀️☀️☀️☀️☀️';
  } else {
    skyChange = '🌨❄️🌨❄️🌨❄️🌨❄️🌨';
  }
  sky.textContent = skyChange;
};

const registerEventHandlers = () => {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', getTemp);
  const incrementCount = document.getElementById('increaseTemp');
  incrementCount.addEventListener('click', handleIncrement);
  const decrementCount = document.getElementById('decreaseTemp');
  decrementCount.addEventListener('click', handleDecrement);
  changeColor();
  changeLandscape();
  updateCity();
  changeSkies();
  // resetCity();
  const cityInput = document.getElementById('inputCity');
  cityInput.addEventListener('change', updateCity);
  const updateSky = document.getElementById('skies');
  updateSky.addEventListener('change', changeSkies);
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

updateCityName();
const cityNameInput = document.getElementById('cityNameInput');
cityNameInput.addEventListener('input', updateCityName);

const cityNameResetBtn = document.getElementById('cityNameReset');
cityNameResetBtn.addEventListener('click', resetCityName);
