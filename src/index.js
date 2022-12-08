'use strict';

const state = {
  temp: 0
};

const currentTemp = document.querySelector("#temp_value");

const increaseTemp = () => {
  state.temp++;
  currentTemp.textContent = String(state.temp);
};

const decreaseTemp = () => {
  state.temp--;
  currentTemp.textContent = String(state.temp);
};

const registerEventHandlers = () => {
  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);