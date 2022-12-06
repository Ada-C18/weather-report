'use strict';
const state = {
  temperature: 70,
  landScape: '----',
};

const updateTemperature = () => {
  const tempDisplay = document.getElementById('temp-display');
  tempDisplay.textContent = `${state.temperature} degrees`;
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

const registerEventHandlers = () => {
  updateTemperature();
  const tempUpButton = document.getElementById('temp-up-btn');
  tempUpButton.addEventListener('click', function () {
    incrementTemperature('add');
  });

  const tempDownButton = document.getElementById('temp-down-btn');
  tempDownButton.addEventListener('click', function () {
    incrementTemperature('subtract');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
