'use strict';

// Build an event handler
// Register the event handler on some HTML element(s)

// An element that increases the temperature by one degree on click
const increaseTemperature = () => {
  const temperature = document.getElementbyId('increaseTemp');
  temperature.textContent = parseInt(temperature.textContent) + 1;
  // add in something later about when we change temp we change text color & layout- may add in elsewhere
};

// An element that decreases the temperature by one degree on click
const decreaseTemperature = () => {
  const temperature = document.getElementbyId('decreaseTemp');
  temperature.textContent = parseInt(temperature.textContent) - 1;
  // add in something later about when we change temp we change text color & layout
};

// register event handlers
const registerEventHandlers = () => {
  const increaseTemperature = document.querySelector('increaseTemp');
  Temp.addEventListener('click', increaseTemperature);
  // separate these two out?
  const decreaseTemperature = document.querySelector('decreaseTemp');
  Temp.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// missing state and maybe that's why it's not working?
