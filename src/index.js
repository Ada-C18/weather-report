const state = {
  temperature: 70,
};

const tempUp = () => {
  const currentTempContainer = document.getElementById('temp-value');
  state.temperature += 1;
  currentTempContainer.textContent = state.temperature;
};

const tempDown = () => {
  const currentTempContainer = document.getElementById('temp-value');
  state.temperature -= 1;
  currentTempContainer.textContent = state.temperature;
};

const changeColorAndLandscape = () => {
  const tempColor = document.getElementById('temp-value');
  const landscapeContainer = document.getElementById('landscape');
  const temp = state.temperature;

  if (temp >= 80) {
    tempColor.style.color = 'red';
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    tempColor.style.color = 'orange';
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    tempColor.style.color = 'yellow';
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    tempColor.style.color = 'green';
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempColor.style.color = 'lightblue';
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSky = () => {
  const skyValue = document.getElementById('sky-emojis').value;
  const skyContainer = document.getElementById('sky');

  if (skyValue === 'Cloudy') {
    skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyValue === 'Sunny') {
    skyContainer.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyValue === 'Rainy') {
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyValue === 'Snowy') {
    skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('temp-up');
  increaseTemp.addEventListener('click', tempUp);
  increaseTemp.addEventListener('click', changeColorAndLandscape);

  const decreaseTemp = document.getElementById('temp-down');
  decreaseTemp.addEventListener('click', tempDown);
  decreaseTemp.addEventListener('click', changeColorAndLandscape);

  const selectSky = document.getElementById('sky-emojis');
  selectSky.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
