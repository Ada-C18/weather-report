'use strict';
const state = {
  temperature: 70,
  cityName: '',
};

const updateTemperature = () => {
  const tempDisplay = document.getElementById('temp-display');
  tempDisplay.textContent = `${state.temperature} degrees`;
  changeColor();
};

const incrementTemperature = (type) => {
  if (type === 'add') {
    state.temperature += 1;
  }
  if (type === 'subtract') {
    state.temperature -= 1;
  }
  updateTemperature();
};

const changeColor = () => {
  let tempDisplay = document.getElementById('temp-display');
  let landScape = document.getElementById('landscape-display');
  if (state.temperature >= 80) {
    tempDisplay.style.color = 'red';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    tempDisplay.style.color = 'orange';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    tempDisplay.style.color = 'yellow';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    tempDisplay.style.color = 'Green';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    tempDisplay.style.color = 'Teal';
    landScape.textContent = '🌨❄️⛄️☃️❄️🌨⛄️☃️❄️🌨';
  }
};

const changeCityName = (input) => {
  state.cityName = input;
  const cityName = document.getElementById('city-name');
  cityName.textContent = state.cityName;
};

const initializeContent = () => {
  updateTemperature();
  changeCityName('Seattle');
};

const registerEventHandlers = () => {
  const tempUpButton = document.getElementById('temp-up-btn');
  tempUpButton.addEventListener('click', function () {
    incrementTemperature('add');
  });

  const tempDownButton = document.getElementById('temp-down-btn');
  tempDownButton.addEventListener('click', function () {
    incrementTemperature('subtract');
  });

  const cityInput = document.getElementById('input-city');
  cityInput.addEventListener('input', function () {
    changeCityName(cityInput.value);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', initializeContent);
