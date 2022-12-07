'use strict';

const increaseTemp = () => {
  const currentTemp = document.querySelector("#temp_value");
  currentTemp++;
}

const decreaseTemp = () => {
  const currentTemp = document.querySelector('#temp_value');
  currentTemp--;
}

const registerEventHandlers = (event) => {
  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);
  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);
}

const setup = () => {
  increaseTemp();
  decreaseTemp();
}

if (document.readyState !== "loading") {
  setup();
} else {
  document.addEventListener("DOMContentLoaded", setup);
}