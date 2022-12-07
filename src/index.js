'use strict';
// const { default: axios } = require("axios")
axios;

{
  /* <script src="./node_modules/axios/dist/axios.min.js"></script> */
}

// create state
const state = {
  temperature: 72,
};

// create functions
const increaseTemp = () => {
  state.temperature++;
  temperature.textContent = `${state.temperature}°`;
  colorChange();
};

const decreaseTemp = () => {
  state.temperature--;
  temperature.textContent = `${state.temperature}°`;
};

// register event handlers
const registerEventHandlers = () => {
  // Increase Decrease Arrows
  const arrowUp = document.getElementById('arrow-up');
  arrowUp.addEventListener('click', increaseTemp);

  const arrowDown = document.getElementById('arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// temperature color changes based on temp
const colorChange = () => {
  if (temperature.textContent >= 80) {
    temperature.textContent.style.color = 'red';
  }
};
