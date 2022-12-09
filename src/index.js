const state = {
  currentTemp: 70,
};

const tempUp = () => {
  const currentTemp = document.querySelector('#temp-value');
  state.currentTemp += 1;
  currentTemp.textContent = state.currentTemp;
};

const tempDown = () => {
  const currentTemp = document.querySelector('#temp-value');
  state.currentTemp -= 1;
  currentTemp.textContent = state.currentTemp;
};

const changeColorAndLandscape = () => {
  if (state.currentTemp > 79) {
    document.querySelector('#temp-value').style.color = 'red';
    document.querySelector('#landscape').textContent =
      '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.currentTemp > 69 && state.currentTemp < 80) {
    document.querySelector('#temp-value').style.color = 'orange';
    document.querySelector('#landscape').textContent =
      '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.currentTemp > 59 && state.currentTemp < 70) {
    document.querySelector('#temp-value').style.color = 'yellow';
    document.querySelector('#landscape').textContent =
      '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.currentTemp > 49 && state.currentTemp < 60) {
    document.querySelector('#temp-value').style.color = 'green';
    document.querySelector('#landscape').textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.currentTemp < 50) {
    document.querySelector('#temp-value').style.color = 'lightblue';
    document.querySelector('#landscape').textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSky = () => {
  let skyValue = document.querySelector('#sky-emojis').value;
  if (skyValue === 'Cloudy') {
    document.querySelector('#sky').textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyValue === 'Sunny') {
    document.querySelector('#sky').textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyValue === 'Rainy') {
    document.querySelector('#sky').textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyValue === 'Snowy') {
    document.querySelector('#sky').textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const registerEventHandlers = () => {
  const increaseTemp = document.querySelector('#temp-up');
  increaseTemp.addEventListener('click', tempUp);
  increaseTemp.addEventListener('click', changeColorAndLandscape);

  const decreaseTemp = document.querySelector('#temp-down');
  decreaseTemp.addEventListener('click', tempDown);
  decreaseTemp.addEventListener('click', changeColorAndLandscape);

  const selectSky = document.querySelector('#sky-emojis');
  selectSky.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
