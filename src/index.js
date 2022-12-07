'use strict';

const state = {
  temperature: 79,
  //tempColor: 'red',
};

document.getElementById('temperatureNumber').style.color = 'red';

const addTemperatureButton = document.getElementById('upButton');
const decreaseTemperatureButton = document.getElementById('downButton');



const textColorAndLandscape = (temperatureDisplay) => {
    const landscapeDisplay = document.getElementById("landscape"); //? is this the right position?

  if (state.temperature >= 80) {
    temperatureDisplay.style.color = 'red';
    landscapeDisplay.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    temperatureDisplay.style.color = 'orange';
    landscapeDisplay.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    temperatureDisplay.style.color = 'yellow';
    landscapeDisplay.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    temperatureDisplay.style.color = 'green';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    temperatureDisplay.style.color = 'teal';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};



const addTemperature = () => {
  const temperatureDisplay = document.getElementById('temperatureNumber');
  state.temperature += 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape(temperatureDisplay);
};

const decreaseTemperature = () => {
  const temperatureDisplay = document.getElementById('temperatureNumber');
  state.temperature -= 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape(temperatureDisplay);
};

// group
const allEventHandlers = () => {
  addTemperatureButton.addEventListener('click', addTemperature);
  decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', allEventHandlers);
