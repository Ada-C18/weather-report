'use strict';

const state = {
  temp: 65
};

const changeTempColorAndGardenLandscape = () => {
  let temp = state.temp;
  let color = "yellow";
  let landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  if (temp > 80) {
    color = "red";
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = "orange";
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = "yellow";
    landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp > 50) {
    color = "green";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    color = "teal";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }

  const currentTemp = document.querySelector("#temp_value");
  currentTemp.textContent = state.temp
  currentTemp.className = color;
  const currentLandscape = document.querySelector("#landscape");
  currentLandscape.textContent = landscape;
};


const increaseTemp = () => {
  state.temp++;
  changeTempColorAndGardenLandscape();
};

const decreaseTemp = () => {
  state.temp--;
  changeTempColorAndGardenLandscape();
}

const registerEventHandlers = (event) => {
  changeTempColorAndGardenLandscape();

  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);